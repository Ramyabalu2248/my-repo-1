# FitPulse PRO - MongoDB Atlas Network & Configuration Diagnostic Script
# Usage: powershell -ExecutionPolicy Bypass -File .\check-atlas.ps1

Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host "   FitPulse PRO -- MongoDB Atlas Connection Diagnostic Tool" -ForegroundColor Cyan
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host ""

$envFile = Join-Path $PSScriptRoot "server\.env"

if (-not (Test-Path $envFile)) {
    Write-Host "[ERROR] server\.env file was not found at: $envFile" -ForegroundColor Red
    Write-Host "Action: Copy server\.env.example to server\.env and configure MONGODB_URI." -ForegroundColor Yellow
    exit 1
}

$content = Get-Content $envFile
$uriLine = $content | Where-Object { $_ -match "^MONGODB_URI\s*=" } | Select-Object -First 1

if (-not $uriLine) {
    # Check fallback MONGO_URI
    $uriLine = $content | Where-Object { $_ -match "^MONGO_URI\s*=" } | Select-Object -First 1
}

if (-not $uriLine) {
    Write-Host "[ERROR] MONGODB_URI is not defined in server\.env" -ForegroundColor Red
    Write-Host "Action: Add MONGODB_URI to server\.env" -ForegroundColor Yellow
    exit 1
}

$rawUri = ($uriLine -split "=", 2)[1].Trim()

# Mask the credentials for display
$maskedUri = $rawUri -replace '(mongodb(\+srv)?:\/\/[^:]+:)([^@]+)@', '$1*****@'

Write-Host "[1/3] Checking MONGODB_URI in server\.env..." -ForegroundColor Yellow
Write-Host "      Configured URI: $maskedUri" -ForegroundColor White

if ($rawUri -eq "your_mongodb_atlas_uri_here" -or $rawUri -like "*<username>*" -or $rawUri -like "*<password>*") {
    Write-Host ""
    Write-Host "[WARNING] MONGODB_URI is currently set to the default placeholder!" -ForegroundColor Red
    Write-Host "Action Required: Open server\.env and paste your actual MongoDB Atlas connection string." -ForegroundColor Yellow
    Write-Host "Example format: mongodb+srv://username:password@cluster0.abcde.mongodb.net/fitpulse" -ForegroundColor Green
    Write-Host ""
    exit 1
}

Write-Host "      [OK] Custom MONGODB_URI detected!" -ForegroundColor Green
Write-Host ""

# Extract Cluster Hostname
if ($rawUri -match '@([^/?]+)') {
    $clusterHost = $matches[1]
    Write-Host "[2/3] Resolving cluster DNS: $clusterHost..." -ForegroundColor Yellow
    
    try {
        $dnsResult = Resolve-DnsName -Name $clusterHost -ErrorAction Stop
        Write-Host "      [OK] Cluster DNS resolved successfully!" -ForegroundColor Green
    } catch {
        Write-Host "      [WARNING] DNS resolution note: $_" -ForegroundColor DarkYellow
    }

    Write-Host ""
    Write-Host "[3/3] Testing TCP connectivity on port 27017..." -ForegroundColor Yellow
    try {
        $tcp = Test-NetConnection -ComputerName $clusterHost -Port 27017 -WarningAction SilentlyContinue
        if ($tcp.TcpTestSucceeded) {
            Write-Host "      [SUCCESS] Network connection to MongoDB Atlas cluster succeeded!" -ForegroundColor Green
            Write-Host "      Your IP is whitelisted and port 27017 is reachable." -ForegroundColor Green
        } else {
            Write-Host "      [FAIL] TCP connection to port 27017 failed." -ForegroundColor Red
            Write-Host "      Action Required: In MongoDB Atlas under Security - Network Access, ensure you have clicked 'Add IP Address' and added 0.0.0.0/0 (allow from anywhere) or your current IP." -ForegroundColor Yellow
        }
    } catch {
        Write-Host "      Could not test TCP port: $_" -ForegroundColor DarkGray
    }
} else {
    Write-Host "Could not parse cluster hostname from URI format." -ForegroundColor DarkGray
}

Write-Host ""
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host "Diagnostic complete." -ForegroundColor Cyan
Write-Host "=============================================================" -ForegroundColor Cyan
