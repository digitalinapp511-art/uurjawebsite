import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

// Initialize Cloudinary
const cld = new Cloudinary({ cloud: { cloudName: 'dqkssrvir' } });

const CloudinaryImage = ({ publicId, width = 500, height = 500, alt = 'Image' }) => {
  const img = cld
    .image(publicId)
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(width).height(height));

  return <AdvancedImage cldImg={img} alt={alt} />;
};

export default CloudinaryImage;