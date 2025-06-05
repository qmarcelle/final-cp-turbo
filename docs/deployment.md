# 🚀 Deployment Guide

This guide covers local build processes and integration with Azure DevOps pipelines for the Consumer Portals project.

## Overview

The Consumer Portals project supports multiple environments:

- **Development**: Local development environment
- **Staging**: Integration testing environment  
- **Production**: Live customer-facing environment

Each portal application builds independently, allowing for flexible release schedules and isolated deployments.

## Local Development Builds

### Environment Configuration

Each environment requires specific configuration:

```bash
# Required for all environments
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com

# API Configuration
API_BASE_URL=https://api.your-domain.com
API_TIMEOUT=30000

# Logging
LOG_LEVEL=info

# Feature Flags
FEATURE_NEW_DASHBOARD=true
FEATURE_BETA_FEATURES=false
```

### Environment-Specific Settings

```bash
# Development (.env.local)
NEXTAUTH_URL=http://localhost:3000
LOG_LEVEL=debug
FEATURE_BETA_FEATURES=true

# Staging (.env.staging)
NEXTAUTH_URL=https://staging-broker.bcbst.com
LOG_LEVEL=info
FEATURE_BETA_FEATURES=true

# Production (.env.production)
NEXTAUTH_URL=https://broker.bcbst.com
LOG_LEVEL=warn
FEATURE_BETA_FEATURES=false
```

### Local Build Process

```bash
# 1. Clean previous builds
pnpm clean

# 2. Install dependencies
pnpm install --frozen-lockfile

# 3. Build all packages first (dependency order)
pnpm build:packages

# 4. Build specific portal
pnpm build:broker          # Build broker portal
pnpm build:employer        # Build employer portal

# 5. Build all applications
pnpm build                 # Build everything

# 6. Start production build locally
pnpm start:broker          # Start broker portal in production mode
pnpm start:employer        # Start employer portal in production mode
```

### Build Verification

```bash
# Check build outputs
ls -la apps/broker-portal/.next/
ls -la apps/employer-portal/.next/

# Verify static files
ls -la apps/broker-portal/.next/static/
ls -la apps/employer-portal/.next/static/

# Test production build locally
NODE_ENV=production pnpm start:broker
```

### Performance Optimization

```bash
# Analyze bundle size
pnpm build:analyze         # Generates bundle analysis

# Check for unused dependencies
pnpm dlx depcheck

# Audit bundle performance
pnpm perf:analyze          # Performance budget checks
```

## Azure DevOps Pipeline Integration

### Pipeline Overview

The project uses Azure DevOps pipelines (see `azure-pipelines.yml`) for automated builds and deployments. The pipeline handles:

1. **Corporate proxy configuration** for BCBST network
2. **Dependency installation** with pnpm
3. **Security audits** and vulnerability scanning
4. **Code quality checks** (TypeScript, ESLint)
5. **Automated testing** with coverage reports
6. **Production builds** for all applications
7. **Performance analysis** for main branch
8. **Artifact publishing** for deployment

### Key Pipeline Configuration

```yaml
# From azure-pipelines.yml
variables:
  PNPM_VERSION: 10.5.2
  NODE_VERSION: 20.x
  TURBO_TOKEN: $(TURBO_TOKEN)
  TURBO_TEAM: $(TURBO_TEAM)
  SECURITY_AUDIT_LEVEL: moderate
  PERFORMANCE_BUDGET: 500KB
```

### Corporate Network Configuration

The pipeline automatically configures BCBST corporate proxy settings:

```powershell
# Configure npm proxy
npm config set proxy http://webproxy.bcbst.com:80
npm config set https-proxy https://webproxy.bcbst.com:443

# Configure pnpm proxy  
pnpm config set proxy http://webproxy.bcbst.com:80
pnpm config set https-proxy https://webproxy.bcbst.com:443
```

### Pipeline Stages

1. **Setup**: Node.js 20.x installation and proxy configuration
2. **Dependencies**: Install with `pnpm install --frozen-lockfile`
3. **Security**: Run `pnpm audit --audit-level=moderate`
4. **Quality**: TypeScript checks and ESLint validation
5. **Build**: Production builds for all applications
6. **Test**: Unit tests with coverage reporting
7. **Performance**: Bundle analysis and performance budgets
8. **Artifacts**: Publish build artifacts for deployment

### Developer Responsibilities

**What developers handle:**
- Local development and testing
- Code quality (lint, typecheck, test)
- Feature branch builds
- Pull request validation

**What Azure DevOps handles:**
- Production builds
- Security scanning
- Performance analysis
- Artifact deployment
- Environment promotion

## Build Troubleshooting

### Common Build Issues

#### TypeScript Compilation Errors

```bash
# Check for type errors
pnpm typecheck

# Build with verbose output
pnpm build --verbose

# Clean and rebuild
pnpm clean && pnpm build
```

#### Memory Issues During Build

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=8192" pnpm build

# Build packages individually
pnpm build --filter=@portals/ui
pnpm build --filter=broker-portal
```

#### Dependency Resolution Problems

```bash
# Clear all caches
pnpm store prune
rm -rf node_modules packages/*/node_modules apps/*/node_modules
rm pnpm-lock.yaml

# Fresh install
pnpm install
```

### Build Performance Optimization

```bash
# Enable Turborepo caching
export TURBO_TOKEN=your-token
export TURBO_TEAM=your-team

# Parallel builds
pnpm build --parallel

# Skip unchanged packages
pnpm build --filter="...[HEAD~1]"
```

### Production Build Verification

```bash
# 1. Build in production mode
NODE_ENV=production pnpm build

# 2. Check bundle sizes
pnpm build:analyze

# 3. Test locally
NODE_ENV=production pnpm start

# 4. Performance audit
pnpm perf:analyze

# 5. Security scan
pnpm audit
```

## Environment-Specific Builds

### Development Builds

```bash
# Fast development builds
pnpm dev                   # Hot reload enabled
pnpm build:dev             # Development optimized build
```

### Staging Builds

```bash
# Production-like builds for testing
NODE_ENV=staging pnpm build
```

### Production Builds

```bash
# Optimized production builds
NODE_ENV=production pnpm build
pnpm build:analyze         # Bundle analysis
```

## Build Artifacts

### Generated Files

```
apps/broker-portal/
├── .next/
│   ├── static/            # Static assets
│   ├── standalone/        # Self-contained app
│   └── server.js          # Production server
└── public/                # Public assets

apps/employer-portal/
├── .next/
│   ├── static/            # Static assets
│   ├── standalone/        # Self-contained app
│   └── server.js          # Production server
└── public/                # Public assets
```

### Package Builds

```
packages/*/
├── dist/
│   ├── index.js           # CommonJS build
│   ├── index.mjs          # ESM build
│   ├── index.d.ts         # TypeScript declarations
│   └── index.css          # Styles (if applicable)
└── package.json
```

## Health Checks and Monitoring

### Build Health Checks

```bash
# Basic health check
curl http://localhost:3000/api/health

# Performance check
pnpm perf:analyze

# Security check
pnpm audit
```

### Monitoring Build Performance

The Azure pipeline tracks:
- Build duration
- Bundle size changes
- Test coverage metrics
- Security vulnerability counts
- Performance budget compliance

## Best Practices

### For Developers

1. **Test builds locally** before pushing
2. **Keep dependencies updated** with security patches
3. **Monitor bundle sizes** and performance impact
4. **Follow semantic versioning** for package changes
5. **Write meaningful commit messages** for better tracking

### For Build Optimization

1. **Use Turborepo caching** to speed up builds
2. **Minimize bundle sizes** through code splitting
3. **Optimize images and assets** for web delivery
4. **Enable gzip compression** for static assets
5. **Monitor build performance** metrics regularly

### For Security

1. **Run security audits** before every release
2. **Keep dependencies current** with latest patches
3. **Use environment variables** for secrets
4. **Validate all inputs** in production builds
5. **Follow BCBST security guidelines** for deployments

## Getting Help

**For build issues:**
- **Microsoft Teams**: Contact the Consumer Portals team
- **Email**: consumerportals@groups.bcbst.com
- **Documentation**: Check the [troubleshooting guide](./troubleshooting.md)
- **Azure DevOps**: Check pipeline logs for detailed error information

**For deployment issues:**
- Contact the DevOps team through your normal BCBST channels
- Reference the pipeline run ID when reporting issues
- Include relevant error logs and build artifacts

---

**Note**: This guide covers the development aspects of builds. Post-deployment monitoring and production environment management are handled by BCBST DevOps and infrastructure teams. 