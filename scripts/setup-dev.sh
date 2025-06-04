#!/bin/bash

# =============================================================================
# Development Environment Setup Script
# =============================================================================
# This script sets up the development environment according to global standards
# Run this script after cloning the repository
# =============================================================================

set -e  # Exit on any error

echo "🚀 Setting up Consumer Portals development environment..."

# Configure corporate proxy if not already set
echo "🌐 Configuring corporate proxy settings..."
HTTP_PROXY=$(npm config get proxy)
HTTPS_PROXY=$(npm config get https-proxy)

if [ "$HTTP_PROXY" = "null" ] || [ -z "$HTTP_PROXY" ]; then
    echo "Setting npm HTTP proxy to webproxy.bcbst.com:80..."
    npm config set proxy http://webproxy.bcbst.com:80
    npm config set registry http://registry.npmjs.org/
else
    echo "✅ HTTP proxy already configured: $HTTP_PROXY"
fi

if [ "$HTTPS_PROXY" = "null" ] || [ -z "$HTTPS_PROXY" ]; then
    echo "Setting npm HTTPS proxy to webproxy.bcbst.com:443..."
    npm config set https-proxy https://webproxy.bcbst.com:443
else
    echo "✅ HTTPS proxy already configured: $HTTPS_PROXY"
fi

# Also configure git proxy for repository operations
GIT_HTTP_PROXY=$(git config --global --get http.proxy)
if [ -z "$GIT_HTTP_PROXY" ]; then
    echo "Setting git HTTP proxy..."
    git config --global http.proxy http://webproxy.bcbst.com:80
    git config --global https.proxy https://webproxy.bcbst.com:443
else
    echo "✅ Git proxy already configured: $GIT_HTTP_PROXY"
fi

# Check Node.js version
echo "📋 Checking Node.js version..."
NODE_VERSION=$(node --version)
REQUIRED_NODE_VERSION="v18"

if [[ $NODE_VERSION < $REQUIRED_NODE_VERSION ]]; then
    echo "❌ Node.js version $NODE_VERSION is not supported. Please install Node.js $REQUIRED_NODE_VERSION or higher."
    exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm@10.5.2
    
    # Configure pnpm with same proxy settings
    echo "🌐 Configuring pnpm proxy settings..."
    pnpm config set proxy http://webproxy.bcbst.com:80
    pnpm config set https-proxy https://webproxy.bcbst.com:443
    pnpm config set registry http://registry.npmjs.org/
else
    echo "✅ pnpm is already installed: $(pnpm --version)"
    
    # Ensure pnpm proxy is configured
    PNPM_PROXY=$(pnpm config get proxy)
    if [ "$PNPM_PROXY" = "undefined" ] || [ -z "$PNPM_PROXY" ]; then
        echo "🌐 Configuring pnpm proxy settings..."
        pnpm config set proxy http://webproxy.bcbst.com:80
        pnpm config set https-proxy https://webproxy.bcbst.com:443
        pnpm config set registry http://registry.npmjs.org/
    fi
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Setup git hooks
echo "🔧 Setting up git hooks..."
pnpm prepare

# Copy environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp env.example .env.local
    echo "⚠️  Please update .env.local with your actual environment variables"
fi

# Build packages
echo "🏗️  Building packages..."
pnpm build:packages

# Run initial checks
echo "🔍 Running initial checks..."
pnpm lint
pnpm check-types
pnpm test

echo ""
echo "🎉 Development environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your environment variables"
echo "2. Run 'pnpm dev' to start development servers"
echo "3. Visit the documentation at docs/README.md"
echo ""
echo "Available commands:"
echo "  pnpm dev          - Start development servers"
echo "  pnpm build        - Build all packages and apps"
echo "  pnpm test         - Run tests"
echo "  pnpm lint         - Lint code"
echo "  pnpm commit       - Commit with conventional format"
echo "" 