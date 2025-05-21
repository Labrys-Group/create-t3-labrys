#!/usr/bin/env node

/**
 * This script updates the package.json exports when adding a new component.
 * It's meant to be run after the shadcn CLI adds a new component.
 * 
 * Usage: node scripts/update-exports.js [component-name]
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import path from 'path';

// Get the component name from command line argument
let componentName = process.argv[2];

// If no component name is provided, we'll update all components
if (!componentName) {
  console.log('No component name provided, updating all components in src/');
  updateAllComponents();
} else {
  console.log(`Updating exports for component: ${componentName}`);
  updateExports(componentName);
}

function updateAllComponents() {
  // Get all .tsx files in the src directory
  const srcDir = path.join(process.cwd(), 'src');
  const files = readdirSync(srcDir)
    .filter(file => file.endsWith('.tsx') && file !== 'index.ts' && file !== 'index.tsx');
  
  // Convert filenames to component names (remove .tsx extension)
  const components = files.map(file => file.replace(/\.tsx$/, ''));
  
  // Update exports for each component
  let updated = false;
  for (const component of components) {
    updated = updateExports(component) || updated;
  }
  
  if (!updated) {
    console.log('All components are already exported. No changes needed.');
  }
}

function updateExports(componentName) {
  // Read package.json
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  
  // Check if the component is already exported
  const exportPath = `./${componentName}`;
  if (packageJson.exports && packageJson.exports[exportPath]) {
    console.log(`Component "${componentName}" is already exported.`);
    return false;
  }
  
  // Add the export
  packageJson.exports = packageJson.exports || {};
  packageJson.exports[exportPath] = `./src/${componentName}.tsx`;
  
  // Write back to package.json
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`Added export for "${componentName}" to package.json`);
  return true;
}