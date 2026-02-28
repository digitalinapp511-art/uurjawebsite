import { useState, forwardRef } from "react";

const ProductGallery = forwardRef(({ product }, ref) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);

  return (
    <div ref={ref}>
      {/* MAIN IMAGE */}
      <img
        src={activeImage}
        alt={product.name}
        className="w-full object-contain rounded-lg"
      />
    </div>
  );
});

export default ProductGallery;