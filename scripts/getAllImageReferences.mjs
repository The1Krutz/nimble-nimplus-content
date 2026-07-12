/**
 * Scan /src for any image references in the json
 * Returns them as one list with no duplicates
 */

import { readdirSync, statSync, readFileSync } from 'fs';
import { join, extname } from 'path';

function getAllImageReferences() {
  function findImgPropertyRecursiveSync(obj, matches = []) {
    if (obj == null || typeof obj !== 'object') {
      return matches;
    }

    if (obj.hasOwnProperty('img')) {
      matches.push(obj.img);
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        findImgPropertyRecursiveSync(obj[key], matches);
      }
    }

    return matches;
  }

  function searchJsonFilesForImg(dirPath) {
    const allMatches = [];

    try {
      const files = readdirSync(dirPath, { recursive: true });

      files.forEach((relativePath) => {
        const fullPath = join(dirPath, relativePath);

        if (!statSync(fullPath).isFile()) {
          return;
        }
        if (extname(fullPath) !== '.json') {
          return;
        }

        try {
          const content = readFileSync(fullPath, 'utf8');
          const jsonObject = JSON.parse(content);

          const fileMatches = findImgPropertyRecursiveSync(
            jsonObject,
            allMatches
          );
        } catch (parseError) {
          console.warn(`JSON error: ${fullPath} (${parseError.message})`);
        }
      });

      return [...new Set(allMatches)];
    } catch (error) {
      console.error(`Error reading directory: ${error.message}`);
    }
  }

  const rawReferences = searchJsonFilesForImg('./src');
  const cleanReferences = rawReferences.map((z) =>
    z.replace('modules/nimble-nimplus-content/', '')
  );

  return cleanReferences;
}

/**
 * @type {string[]}
 */
export const allImageReferences = getAllImageReferences();
