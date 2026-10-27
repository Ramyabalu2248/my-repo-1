const dns = require('dns');
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {
  // Ignore in environments where setDefaultResultOrder is not available
}

const mongoose = require('mongoose');

// Global connection caching for serverless environments (Vercel / Lambda) & local server
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Safely masks MongoDB URI for logs to avoid exposing credentials
 */
const getMaskedURI = (uri) => {
  if (!uri) return 'undefined';
  return uri.replace(/(mongodb(\+srv)?:\/\/[^:]+:)([^@]+)@/, '$1*****@');
};

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoURI) {
    const errorMsg =
      'MONGODB_URI is not defined in environment variables.\n' +
      'Please create a "server/.env" file with: MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority';
    console.error(`[DATABASE ERROR] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  // If already connected, reuse existing connection
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (mongoose.connection.readyState === 1) {
    cached.conn = mongoose;
    return cached.conn;
  }

  // If a connection attempt is in-flight, await the existing promise
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10s timeout for Atlas cluster discovery
    };

    console.log(`[DATABASE] Connecting to MongoDB Atlas (${getMaskedURI(mongoURI)})...`);

    cached.promise = mongoose.connect(mongoURI, opts).then((mongooseInstance) => {
      console.log(`[DATABASE] MongoDB Connected: ${mongooseInstance.connection.host} (Database: ${mongooseInstance.connection.name || 'fitpulse'})`);
      return mongooseInstance;
    }).catch((err) => {
      cached.promise = null; // Reset so next request can retry
      console.error(`[DATABASE ERROR] MongoDB Atlas connection failed: ${err.message}`);
      if (err.message.includes('bad auth') || err.message.includes('Authentication failed')) {
        console.error('[DATABASE HELP] Authentication failed. Check your database username & password in server/.env. If your password has special characters, ensure they are URL-encoded.');
      } else if (err.message.includes('querySrv ENOTFOUND') || err.message.includes('ENODATA')) {
        console.error('[DATABASE HELP] DNS SRV lookup failed. Verify your cluster address in MONGODB_URI.');
      } else if (err.message.includes('ETIMEDOUT') || err.message.includes('timed out')) {
        console.error('[DATABASE HELP] Connection timed out. Make sure MongoDB Atlas Network Access permits your IP address or 0.0.0.0/0 (allow from anywhere).');
      }
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
};

module.exports = connectDB;

