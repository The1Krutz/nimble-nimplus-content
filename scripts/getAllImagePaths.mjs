/**
 * Scan /assets for any image files present
 * Returns them as one list with no duplicates
 */

import { readdirSync } from 'fs';
import { join, extname } from 'path';

function getAllImagePaths() {
  function getPngFilesRecursiveSync(dirPath) {
    const pngFiles = [];

    const entries = readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name);

      if (entry.isDirectory()) {
        pngFiles.push(...getPngFilesRecursiveSync(fullPath));
      } else if (entry.isFile() && extname(entry.name) === '.png') {
        pngFiles.push(fullPath);
      }
    }

    return pngFiles;
  }

  const targetDirectory = './assets';
  return getPngFilesRecursiveSync(targetDirectory);
}

/**
 * @type {string[]}
 */
export const allImagePaths = getAllImagePaths();
