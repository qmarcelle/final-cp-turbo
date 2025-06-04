# =============================================================================
# BCBST Corporate Proxy Configuration Script (PowerShell)
# =============================================================================
# This script configures proxy settings for npm, pnpm, and git on Windows
# Run this script if you're behind the BCBST corporate firewall
# =============================================================================

Write-Host "🌐 Configuring BCBST Corporate Proxy Settings..." -ForegroundColor Cyan

# BCBST Proxy Configuration
$HTTP_PROXY_URL = "http://webproxy.bcbst.com:80"
$HTTPS_PROXY_URL = "https://webproxy.bcbst.com:443"
$REGISTRY_URL = "http://registry.npmjs.org/"

# Configure npm proxy
Write-Host "📦 Configuring npm proxy settings..." -ForegroundColor Yellow
try {
    npm config set proxy $HTTP_PROXY_URL
    npm config set https-proxy $HTTPS_PROXY_URL
    npm config set registry $REGISTRY_URL
    npm config set strict-ssl false
    Write-Host "✅ npm proxy configured" -ForegroundColor Green
}
catch {
    Write-Host "❌ Failed to configure npm proxy: $($_.Exception.Message)" -ForegroundColor Red
}

# Configure pnpm proxy (if installed)
$pnpmExists = Get-Command pnpm -ErrorAction SilentlyContinue
if ($pnpmExists) {
    Write-Host "📦 Configuring pnpm proxy settings..." -ForegroundColor Yellow
    try {
        pnpm config set proxy $HTTP_PROXY_URL
        pnpm config set https-proxy $HTTPS_PROXY_URL
        pnpm config set registry $REGISTRY_URL
        pnpm config set strict-ssl false
        Write-Host "✅ pnpm proxy configured" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to configure pnpm proxy: $($_.Exception.Message)" -ForegroundColor Red
    }
}
else {
    Write-Host "⚠️  pnpm not installed, skipping pnpm proxy configuration" -ForegroundColor Yellow
}

# Configure yarn proxy (if installed)
$yarnExists = Get-Command yarn -ErrorAction SilentlyContinue
if ($yarnExists) {
    Write-Host "📦 Configuring yarn proxy settings..." -ForegroundColor Yellow
    try {
        yarn config set proxy $HTTP_PROXY_URL
        yarn config set https-proxy $HTTPS_PROXY_URL
        yarn config set registry $REGISTRY_URL
        yarn config set strict-ssl false
        Write-Host "✅ yarn proxy configured" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to configure yarn proxy: $($_.Exception.Message)" -ForegroundColor Red
    }
}
else {
    Write-Host "⚠️  yarn not installed, skipping yarn proxy configuration" -ForegroundColor Yellow
}

# Configure git proxy
Write-Host "🔧 Configuring git proxy settings..." -ForegroundColor Yellow
try {
    git config --global http.proxy $HTTP_PROXY_URL
    git config --global https.proxy $HTTPS_PROXY_URL
    git config --global http.sslVerify false
    Write-Host "✅ git proxy configured" -ForegroundColor Green
}
catch {
    Write-Host "❌ Failed to configure git proxy: $($_.Exception.Message)" -ForegroundColor Red
}

# Set environment variables for current session
Write-Host "🌍 Setting environment variables for current session..." -ForegroundColor Yellow
$env:HTTP_PROXY = $HTTP_PROXY_URL
$env:HTTPS_PROXY = $HTTPS_PROXY_URL
$env:http_proxy = $HTTP_PROXY_URL
$env:https_proxy = $HTTPS_PROXY_URL
$env:NO_PROXY = "localhost,127.0.0.1,*.bcbst.com"
$env:no_proxy = "localhost,127.0.0.1,*.bcbst.com"

# Set system-wide environment variables (requires admin privileges)
Write-Host "🔧 Attempting to set system-wide environment variables..." -ForegroundColor Yellow
try {
    [System.Environment]::SetEnvironmentVariable("HTTP_PROXY", $HTTP_PROXY_URL, [System.EnvironmentVariableTarget]::User)
    [System.Environment]::SetEnvironmentVariable("HTTPS_PROXY", $HTTPS_PROXY_URL, [System.EnvironmentVariableTarget]::User)
    [System.Environment]::SetEnvironmentVariable("http_proxy", $HTTP_PROXY_URL, [System.EnvironmentVariableTarget]::User)
    [System.Environment]::SetEnvironmentVariable("https_proxy", $HTTPS_PROXY_URL, [System.EnvironmentVariableTarget]::User)
    [System.Environment]::SetEnvironmentVariable("NO_PROXY", "localhost,127.0.0.1,*.bcbst.com", [System.EnvironmentVariableTarget]::User)
    [System.Environment]::SetEnvironmentVariable("no_proxy", "localhost,127.0.0.1,*.bcbst.com", [System.EnvironmentVariableTarget]::User)
    Write-Host "✅ System environment variables configured" -ForegroundColor Green
}
catch {
    Write-Host "⚠️  Could not set system environment variables. You may need to run as administrator." -ForegroundColor Yellow
    Write-Host "    Manual setup: Add these to your system environment variables:" -ForegroundColor Gray
    Write-Host "    HTTP_PROXY=$HTTP_PROXY_URL" -ForegroundColor Gray
    Write-Host "    HTTPS_PROXY=$HTTPS_PROXY_URL" -ForegroundColor Gray
    Write-Host "    NO_PROXY=localhost,127.0.0.1,*.bcbst.com" -ForegroundColor Gray
}

Write-Host ""
Write-Host "🎉 BCBST Corporate proxy configuration complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Configuration Summary:" -ForegroundColor Cyan
Write-Host "  HTTP Proxy:  $HTTP_PROXY_URL" -ForegroundColor White
Write-Host "  HTTPS Proxy: $HTTPS_PROXY_URL" -ForegroundColor White
Write-Host "  Registry:    $REGISTRY_URL" -ForegroundColor White
Write-Host ""
Write-Host "🔄 Environment variables are set for this session." -ForegroundColor Yellow
Write-Host "   For permanent changes, restart your terminal or IDE." -ForegroundColor Yellow
Write-Host ""

# Test connectivity
Write-Host "🧪 Testing npm connectivity..." -ForegroundColor Yellow
try {
    $null = npm ping 2>&1
    Write-Host "✅ npm connectivity test passed" -ForegroundColor Green
}
catch {
    Write-Host "❌ npm connectivity test failed - check proxy settings" -ForegroundColor Red
} 