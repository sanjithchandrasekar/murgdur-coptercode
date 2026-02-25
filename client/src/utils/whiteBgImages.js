/**
 * White Background Images Utility
 * Maps product images to their white-background versions where available
 */

/**
 * Get white background version of a single image path
 * Falls back to original if white-bg version not available
 */
export const getWhiteBgImagePath = (imagePath) => {
  if (!imagePath) return '/images/placeholder/placeholder.png';
  // Return original path - white-bg versions are not currently available
  return imagePath;
};

/**
 * Get white background versions of image array
 * Falls back to originals if white-bg versions not available
 */
export const getWhiteBgImageArray = (images) => {
  if (!images || images.length === 0) {
    return ['/images/placeholder/placeholder.png'];
  }
  // Return original paths - white-bg versions are not currently available
  return images;
};
