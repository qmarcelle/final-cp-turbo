const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PNPM_MIN_VERSION = '8.0.0'; // Specify your desired minimum pnpm version

// Function to execute a command synchronously
const runCommandSync = (command, options = {}) => {
  console.log(`\n[CMD] ${command}`);
  try {
    execSync(command, { stdio: 'inherit', ...options });
    return true;
  } catch (error) {
    console.error(`\n[ERROR] Failed to execute command: ${command}`);
    console.error(error.message);
    return false;
  }
};

// Function to execute a command asynchronously (for long-running processes like dev server)
const runCommandAsync = (command, args = [], options = {}) => {
  console.log(`\n[CMD] ${command} ${args.join(' ')}`);
  const proc = spawn(command, args, { stdio: 'inherit', ...options });
  proc.on('error', (err) => {
    console.error(`\n[ERROR] Failed to start process: ${command} ${args.join(' ')}`);
    console.error(err);
    process.exit(1);
  });
  proc.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.log(`\n[INFO] Process exited with code ${code}`);
    }
  });
  return proc;
};


// Function to check if a command is available
const isCommandAvailable = (command) => {
  try {
    // Check for pnpm specifically with a more robust command that works across OS
    if (command === 'pnpm') {
        execSync('pnpm --version', { stdio: 'ignore' });
    } else {
        // For other commands, a simple which/where might be more appropriate if available
        // However, for simplicity and broad compatibility, sticking to --version
        execSync(`${command} --version`, { stdio: 'ignore' });
    }
    return true;
  } catch (error) {
    return false;
  }
};

// Function to get pnpm path
const getPnpmPath = () => {
  if (isCommandAvailable('pnpm')) {
    console.log('[INFO] Global pnpm found.');
    return 'pnpm';
  }
  // Try to find local pnpm installed by npm
  const localPnpmPath = path.resolve(__dirname, '../../../node_modules/.bin/pnpm');
  if (fs.existsSync(localPnpmPath)) {
    console.log('[INFO] Local pnpm found at:', localPnpmPath);
    return localPnpmPath;
  }
  return null;
};

// Function to install pnpm locally if not available globally or locally
const ensurePnpm = () => {
  let pnpmPath = getPnpmPath();
  if (pnpmPath) {
    try {
      const versionOutput = execSync(`${pnpmPath} --version`).toString().trim();
      console.log(`[INFO] pnpm version: ${versionOutput}`);
      // TODO: Add version comparison: if (semver.lt(versionOutput, PNPM_MIN_VERSION)) ...
    } catch (e) {
      console.warn('[WARN] Could not determine pnpm version. Proceeding anyway.');
    }
    return pnpmPath;
  }

  console.log('[INFO] pnpm not found. Attempting to install it locally via npm into root node_modules...');
  // Installs pnpm to the root node_modules and adds to root package.json devDependencies
  if (!runCommandSync('npm install pnpm --save-dev --loglevel error', { cwd: path.resolve(__dirname, '../../..') })) {
    console.error('[FATAL] Failed to install pnpm. Please install pnpm globally and try again.');
    console.error('[INFO] Visit https://pnpm.io/installation for instructions.');
    process.exit(1);
  }

  pnpmPath = getPnpmPath(); // Re-check after install
  if (!pnpmPath) {
    console.error('[FATAL] pnpm installed but still not found in expected local path. This might be an issue with npm install or path resolution. Check npm logs.');
    process.exit(1);
  }
  console.log('[INFO] pnpm installed successfully locally.');
  return pnpmPath;
};

const main = () => {
  console.log('[INFO] Starting project initialization...');

  const pnpmCmd = ensurePnpm();

  console.log('\n[STEP 1/4] Installing workspace dependencies...');
  if (!runCommandSync(`${pnpmCmd} install --loglevel error`)) {
    console.error('[FATAL] Dependency installation failed.');
    process.exit(1);
  }
  console.log('[SUCCESS] Dependencies installed successfully.');

  console.log('\n[STEP 2/4] Building all packages and applications...');
  if (!runCommandSync(`${pnpmCmd} turbo run build --output-logs=errors-only`)) {
    console.error('[FATAL] Build process failed.');
    process.exit(1);
  }
  console.log('[SUCCESS] All projects built successfully.');

  console.log('\n[STEP 3/4] Checking for required environment variables (if any)... ');
  // TODO: Add checks for essential .env files or variables for the default app
  // For example, check if apps/broker-portal/.env.local exists or if required vars are set
  console.log('[INFO] Environment variable check placeholder. Implement as needed.');


  const defaultApp = 'broker-portal'; // Or make this configurable
  console.log(`\n[STEP 4/4] Starting ${defaultApp} in development mode...`);
  console.log(`[INFO] Access ${defaultApp} at http://localhost:3000 (or the port it runs on).`);
  console.log('[INFO] Press Ctrl+C to stop the development server.');

  runCommandAsync(pnpmCmd, ['turbo', 'run', 'dev', `--filter=${defaultApp}...`]);

  process.on('SIGINT', () => {
    console.log('\n[INFO] Shutting down...');
    process.exit(0);
  });
};

main(); 