import { useState, forwardRef } from "react";

const ProductGallery = forwardRef(({ images }, ref) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div ref={ref}>
      {/* MAIN IMAGE */}
      <img src={activeImage} alt="Product"
        className="w-full object-contain rounded-lg"
      />

      {/* THUMBNAILS */}
      <div className="flex gap-3 mt-4">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            onClick={() => setActiveImage(img)}
            className={`w-20 h-20 object-cover rounded cursor-pointer
              ${activeImage === img ? "ring-2 ring-black" : ""}`}
          />
        ))}
      </div>
    </div>
  );
});

export default ProductGallery;
