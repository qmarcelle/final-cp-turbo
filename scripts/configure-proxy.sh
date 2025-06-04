#!/bin/bash

# =============================================================================
# BCBST Corporate Proxy Configuration Script
# =============================================================================
# This script configures proxy settings for npm, pnpm, and git
# Run this script if you're behind the BCBST corporate firewall
# =============================================================================

set -e  # Exit on any error

echo "🌐 Configuring BCBST Corporate Proxy Settings..."

# BCBST Proxy Configuration
HTTP_PROXY_URL="http://webproxy.bcbst.com:80"
HTTPS_PROXY_URL="https://webproxy.bcbst.com:443"
REGISTRY_URL="http://registry.npmjs.org/"

# Configure npm proxy
echo "📦 Configuring npm proxy settings..."
npm config set proxy $HTTP_PROXY_URL
npm config set https-proxy $HTTPS_PROXY_URL
npm config set registry $REGISTRY_URL
npm config set strict-ssl false
echo "✅ npm proxy configured"

# Configure pnpm proxy (if installed)
if command -v pnpm &> /dev/null; then
    echo "📦 Configuring pnpm proxy settings..."
    pnpm config set proxy $HTTP_PROXY_URL
    pnpm config set https-proxy $HTTPS_PROXY_URL
    pnpm config set registry $REGISTRY_URL
    pnpm config set strict-ssl false
    echo "✅ pnpm proxy configured"
else
    echo "⚠️  pnpm not installed, skipping pnpm proxy configuration"
fi

# Configure yarn proxy (if installed)
if command -v yarn &> /dev/null; then
    echo "📦 Configuring yarn proxy settings..."
    yarn config set proxy $HTTP_PROXY_URL
    yarn config set https-proxy $HTTPS_PROXY_URL
    yarn config set registry $REGISTRY_URL
    yarn config set strict-ssl false
    echo "✅ yarn proxy configured"
else
    echo "⚠️  yarn not installed, skipping yarn proxy configuration"
fi

# Configure git proxy
echo "🔧 Configuring git proxy settings..."
git config --global http.proxy $HTTP_PROXY_URL
git config --global https.proxy $HTTPS_PROXY_URL
git config --global http.sslVerify false
echo "✅ git proxy configured"

# Set environment variables for current session
echo "🌍 Setting environment variables..."
export HTTP_PROXY=$HTTP_PROXY_URL
export HTTPS_PROXY=$HTTPS_PROXY_URL
export http_proxy=$HTTP_PROXY_URL
export https_proxy=$HTTPS_PROXY_URL
export NO_PROXY="localhost,127.0.0.1,*.bcbst.com"
export no_proxy="localhost,127.0.0.1,*.bcbst.com"

# Add to shell profile for persistence
SHELL_PROFILE=""
if [ -f ~/.bashrc ]; then
    SHELL_PROFILE=~/.bashrc
elif [ -f ~/.zshrc ]; then
    SHELL_PROFILE=~/.zshrc
elif [ -f ~/.profile ]; then
    SHELL_PROFILE=~/.profile
fi

if [ ! -z "$SHELL_PROFILE" ]; then
    echo "📝 Adding proxy settings to $SHELL_PROFILE..."
    
    # Remove existing proxy settings
    grep -v "# BCBST Proxy Settings" $SHELL_PROFILE > temp_profile 2>/dev/null || touch temp_profile
    grep -v "HTTP_PROXY\|HTTPS_PROXY\|http_proxy\|https_proxy\|NO_PROXY\|no_proxy" temp_profile > temp_profile2 2>/dev/null || touch temp_profile2
    
    # Add new proxy settings
    cat >> temp_profile2 << EOF

# BCBST Proxy Settings
export HTTP_PROXY=$HTTP_PROXY_URL
export HTTPS_PROXY=$HTTPS_PROXY_URL
export http_proxy=$HTTP_PROXY_URL
export https_proxy=$HTTPS_PROXY_URL
export NO_PROXY="localhost,127.0.0.1,*.bcbst.com"
export no_proxy="localhost,127.0.0.1,*.bcbst.com"
EOF
    
    mv temp_profile2 $SHELL_PROFILE
    rm -f temp_profile
    echo "✅ Proxy settings added to $SHELL_PROFILE"
else
    echo "⚠️  Could not find shell profile, you may need to manually set environment variables"
fi

echo ""
echo "🎉 BCBST Corporate proxy configuration complete!"
echo ""
echo "📋 Configuration Summary:"
echo "  HTTP Proxy:  $HTTP_PROXY_URL"
echo "  HTTPS Proxy: $HTTPS_PROXY_URL"
echo "  Registry:    $REGISTRY_URL"
echo ""
echo "🔄 To apply environment variables to your current session, run:"
echo "  source $SHELL_PROFILE"
echo ""
echo "🧪 To test the configuration, try:"
echo "  npm ping"
echo "  git ls-remote https://github.com/microsoft/TypeScript.git HEAD"
echo ""

# Test connectivity
echo "🧪 Testing npm connectivity..."
if npm ping > /dev/null 2>&1; then
    echo "✅ npm connectivity test passed"
else
    echo "❌ npm connectivity test failed - check proxy settings"
fi 