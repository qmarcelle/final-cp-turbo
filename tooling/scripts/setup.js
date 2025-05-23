#!/usr/bin/env node

const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen');
const figlet = require('figlet');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function printBanner() {
  console.log(
    chalk.cyan(
      figlet.textSync('Portals Setup', { horizontalLayout: 'full' })
    )
  );
}

function checkVersion(cmd, expected, name) {
  let version;
  try {
    version = execSync(cmd).toString().trim();
  } catch (e) {
    console.log(chalk.red(`Error: Could not determine ${name} version.`));
    process.exit(1);
  }
  if (!version.startsWith(expected)) {
    console.log(
      chalk.yellow(`Warning: ${name} version is ${version}, expected ${expected}`)
    );
  } else {
    console.log(chalk.green(`${name} version OK: ${version}`));
  }
}

function ensureEnvLocal() {
  const envExample = path.resolve(process.cwd(), '.env.example');
  const envLocal = path.resolve(process.cwd(), '.env.local');

  if (!fs.existsSync(envExample)) {
    console.log(chalk.red('.env.example not found! Please add one to the project root.'));
    process.exit(1);
  }

  if (!fs.existsSync(envLocal)) {
    fs.copyFileSync(envExample, envLocal);
    console.log(chalk.green('.env.local created from .env.example!'));
  } else {
    console.log(chalk.yellow('.env.local already exists, not overwriting.'));
  }
}

function validateWorkspace() {
  // Add checks for workspace structure, package names, config files, etc.
  // For now, just print a placeholder
  console.log(chalk.blue('Validating workspace structure...'));
  // TODO: Implement actual checks
}

async function main() {
  printBanner();

  // Version checks
  checkVersion('node -v', 'v18', 'Node.js');
  checkVersion('pnpm -v', '8', 'pnpm');
  checkVersion('npx turbo --version', '1', 'Turbo');

  // Ensure .env.local exists
  ensureEnvLocal();

  // Install dependencies
  const spinner = ora('Installing dependencies...').start();
  try {
    execSync('pnpm install', { stdio: 'inherit' });
    spinner.succeed('Dependencies installed!');
  } catch (e) {
    spinner.fail('Dependency installation failed!');
    process.exit(1);
  }

  // Workspace validation, config checks, etc.
  validateWorkspace();

  // Success message
  console.log(
    boxen(
      chalk.green('Setup complete! You are ready to develop 🚀'),
      { padding: 1, borderColor: 'green', borderStyle: 'round' }
    )
  );
}

main();
