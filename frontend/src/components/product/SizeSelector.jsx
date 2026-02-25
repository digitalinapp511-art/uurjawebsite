const SizeSelector = ({ sizes, selectedSize, setSelectedSize }) => {
    return (
        <div className="flex gap-3 mt-4">
            {sizes.map((size) => (
                <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded
            ${selectedSize === size ? "bg-[#8b1c62] text-white" : "bg-white"}
          `}
                >
                    {size}
                </button>
            ))}
        </div>
    );
};

export default SizeSelector;
