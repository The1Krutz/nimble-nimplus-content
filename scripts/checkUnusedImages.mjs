/**
 * List of images that are present in /assets but are not referenced in /src
 * We don't want to ship unused assets
 */

import { allImagePaths } from './getAllImagePaths.mjs';
import { allImageReferences } from './getAllImageReferences.mjs';

const unusedImages = allImagePaths.filter(
  (z) => !allImageReferences.includes(z)
);

if (unusedImages.length === 0) {
  console.log('All present images are referenced!');
} else {
  console.error('unused images: ', unusedImages);
  throw new Error('unused images');
}
