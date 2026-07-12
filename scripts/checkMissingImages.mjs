/**
 * List of images that are referenced in /src but are not present in /assets
 * We don't want to ship broken references
 */

import { allImagePaths } from './getAllImagePaths.mjs';
import { allImageReferences } from './getAllImageReferences.mjs';

const missingImages = allImageReferences.filter(
  (z) => !allImagePaths.includes(z)
);

if (missingImages.length === 0) {
  console.log('All referenced images are present!');
} else {
  console.error('missing images: ', missingImages);
  throw new Error('missing images');
}
