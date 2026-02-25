import React from 'react';

/**
 * ProductImage - Image component with optional white background handling
 * @param {string} src - Image source URL
 * @param {string} alt - Alternative text
 * @param {string} className - CSS classes to apply
 * @param {string} loading - Loading strategy ('lazy' or 'eager')
 * @param {boolean} useWhiteBg - Whether to apply white background styles
 * @param {...props} - Additional props to pass to img element
 */
const ProductImage = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  useWhiteBg = false,
  onError,
  ...props
}) => {
  const handleError = (e) => {
    e.target.src = '/images/placeholder/placeholder.png';
    if (onError) onError(e);
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
      {...props}
    />
  );
};

export default ProductImage;
