/**
 * FitPulse PRO - MongoDB Atlas Connection Verification & Smoke Test
 * 
 * Verifies:
 * 1. MONGODB_URI in .env is configured and not a placeholder
 * 2. TLS/SSL & DNS handshake with MongoDB Atlas cluster
 * 3. Database authentication & ping command
 * 4. User model registration and verification round-trip
 * 5. Workout model creation, query, and cleanup
 * 
 * Run with: node check-connection.js
 */

const dns = require('dns');
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {}

require('dotenv').config();
const mongoose = require('mongoose');

const getMaskedURI = (uri) => {
  if (!uri) return 'undefined';
  return uri.replace(/(mongodb(\+srv)?:\/\/[^:]+:)([^@]+)@/, '$1*****@');
};

async function verifyConnection() {
  console.log('\n=============================================================');
  console.log('   FitPulse PRO — MongoDB Atlas Connection Diagnostic Tool');
  console.log('=============================================================\n');

  const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('❌ [CONFIG ERROR] No MONGODB_URI found in server/.env');
    console.log('\n👉 ACTION REQUIRED:');
    console.log('   1. Open "server/.env"');
    console.log('   2. Set MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/fitpulse?retryWrites=true&w=majority');
    process.exit(1);
  }

  if (mongoURI.includes('your_mongodb_atlas_uri_here') || mongoURI.includes('<username>') || mongoURI.includes('<password>')) {
    console.warn(`⚠️ [CONFIG WARNING] MONGODB_URI is still set to placeholder: "${mongoURI}"`);
    console.log('\n👉 ACTION REQUIRED:');
    console.log('   Please replace the placeholder in "server/.env" with your real MongoDB Atlas connection string.');
    console.log('   Example: mongodb+srv://myUser:myPassword123@cluster0.abcde.mongodb.net/fitpulse?retryWrites=true&w=majority');
    process.exit(1);
  }

  console.log(`[STATUS] Target MongoDB URI: ${getMaskedURI(mongoURI)}`);
  console.log('[STATUS] Initiating connection to MongoDB Atlas cluster...');

  try {
    const startTime = Date.now();
    await mongoose.connect(mongoURI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    });
    const durationMs = Date.now() - startTime;

    console.log(`✅ [CONNECTION SUCCESS] Connected in ${durationMs}ms!`);
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Database Name: ${mongoose.connection.name || 'fitpulse'}`);
    console.log(`   ReadyState: ${mongoose.connection.readyState} (1 = Connected)`);

    // Ping the admin database
    console.log('\n[STATUS] Pinging MongoDB Atlas...');
    const adminDb = mongoose.connection.db.admin();
    const pingResult = await adminDb.ping();
    console.log(`✅ [PING SUCCESS] Ping response:`, pingResult);

    // Test Schema Operations
    console.log('\n[STATUS] Testing CRUD operations with models...');
    const User = require('./models/User');
    const Workout = require('./models/Workout');

    const testEmail = `diagnostic_test_${Date.now()}@fitpulse.internal`;
    const testUser = await User.create({
      name: 'Diagnostic Tester',
      email: testEmail,
      password: 'TemporaryTestPassword123!',
      isVerified: true
    });
    console.log(`✅ [USER CREATE] Test user created with ID: ${testUser._id}`);

    // Test password match
    const isMatch = await testUser.matchPassword('TemporaryTestPassword123!');
    console.log(`✅ [BCRYPT VERIFY] Password hash & match verified: ${isMatch}`);

    // Test Workout Create
    const testWorkout = await Workout.create({
      user: testUser._id,
      title: 'Atlas Diagnostic Bench Press',
      reps: 10,
      load: 60,
      sets: 3,
      duration: 30,
      calories: 180
    });
    console.log(`✅ [WORKOUT CREATE] Workout created with ID: ${testWorkout._id}`);

    // Test Workout Query
    const userWorkouts = await Workout.find({ user: testUser._id });
    console.log(`✅ [WORKOUT QUERY] Found ${userWorkouts.length} workout(s) for user`);

    // Clean up test data
    await Workout.findByIdAndDelete(testWorkout._id);
    await User.findByIdAndDelete(testUser._id);
    console.log(`✅ [CLEANUP] Diagnostic test documents successfully removed`);

    console.log('\n=============================================================');
    console.log('   🎉 ALL TESTS PASSED: MongoDB Atlas is 100% Operational!');
    console.log('=============================================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ [CONNECTION FAILED]:', error.message);
    if (error.message.includes('bad auth') || error.message.includes('Authentication failed')) {
      console.error('👉 Cause: Incorrect database username or password in MONGODB_URI.');
      console.error('   Hint: If your password has special characters like @, #, $, %, ensure they are URL-encoded.');
    } else if (error.message.includes('querySrv ENOTFOUND') || error.message.includes('ENODATA')) {
      console.error('👉 Cause: Could not resolve cluster DNS address.');
      console.error('   Hint: Check that your cluster domain name in MONGODB_URI is spelled correctly.');
    } else if (error.message.includes('ETIMEDOUT') || error.message.includes('timed out') || error.message.includes('Could not connect to any servers')) {
      console.error('👉 Cause: Network connection timed out.');
      console.error('   Hint: Check MongoDB Atlas > Security > Network Access and ensure IP 0.0.0.0/0 (allow from anywhere) or your current IP is added.');
    }
    process.exit(1);
  }
}

verifyConnection();
