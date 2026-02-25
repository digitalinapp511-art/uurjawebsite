import { useEffect, useState } from "react";
import { PiFunnelBold, PiXBold, PiCaretDownBold } from "react-icons/pi";

const MobileFilter = ({ onFilterChange }) => {
    const [open, setOpen] = useState(false);

    const [openCategory, setOpenCategory] = useState(true);
    const [openSize, setOpenSize] = useState(true);
    const [openColor, setOpenColor] = useState(true);
    const [openPrice, setOpenPrice] = useState(true);

    const MIN_PRICE = 0;
    const MAX_PRICE = 20000;

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(12641);

    const [selectedFilters, setSelectedFilters] = useState({
        category: [],
        size: [],
        color: [],
        price: { min: 0, max: 12641 },
    });

    /* 🔥 auto send filters like FilterSidebar */
    useEffect(() => {
        onFilterChange(selectedFilters);
    }, [selectedFilters]);

    const handleMinChange = (value) => {
        const val = Math.min(Number(value), maxPrice - 500);
        setMinPrice(val);
        setSelectedFilters((prev) => ({
            ...prev,
            price: { min: val, max: prev.price.max },
        }));
    };

    const handleMaxChange = (value) => {
        const val = Math.max(Number(value), minPrice + 500);
        setMaxPrice(val);
        setSelectedFilters((prev) => ({
            ...prev,
            price: { min: prev.price.min, max: val },
        }));
    };

    return (
        <>
            {/* FILTER BUTTON */}
            <button
                onClick={() => setOpen(true)}
                className="md:hidden flex items-center gap-2 border-2 px-8 py-2 text-xs font-medium"
            >
                <PiFunnelBold />
                Filters
            </button>

            {/* OVERLAY */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* DRAWER */}
            <div
                className={`fixed top-16 left-0 h-full w-[60%] max-w-sm bg-white z-50 py-5
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* HEADER */}
                <div className="flex justify-between items-center p-3 border-b">
                    <h2 className="font-semibold text-lg tracking-wider">Filters</h2>
                    <button onClick={() => setOpen(false)}>
                        <PiXBold size={20} />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="px-4 py-4 space-y-6 text-sm overflow-y-auto h-[calc(100%-64px)]">

                    {/* CATEGORY */}
                    <div>
                        <button
                            onClick={() => setOpenCategory(!openCategory)}
                            className="w-full flex justify-between items-center font-semibold mb-3"
                        >
                            SHOP BY CATEGORY
                            <PiCaretDownBold className={`${openCategory ? "rotate-180" : ""}`} />
                        </button>

                        {openCategory && (
                            <div className="space-y-2">
                                {["Bracelet", "Ring", "Selenite Plate"].map(
                                    (item) => (
                                        <label key={item} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                className="accent-black"
                                                onChange={(e) =>
                                                    setSelectedFilters((prev) => ({
                                                        ...prev,
                                                        category: e.target.checked
                                                            ? [...prev.category, item]
                                                            : prev.category.filter((c) => c !== item),
                                                    }))
                                                }
                                            />
                                            {item}
                                        </label>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    {/* SIZE */}
                    <div className="border-t pt-2">
                        <button
                            onClick={() => setOpenSize(!openSize)}
                            className="w-full flex justify-between items-center font-semibold mb-3"
                        >
                            SIZE
                            <PiCaretDownBold className={`${openSize ? "rotate-180" : ""}`} />
                        </button>

                        {openSize && (
                            <div className="space-y-2">
                                {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
                                    <label key={size} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="accent-black"
                                            onChange={(e) =>
                                                setSelectedFilters((prev) => ({
                                                    ...prev,
                                                    size: e.target.checked
                                                        ? [...prev.size, size]
                                                        : prev.size.filter((s) => s !== size),
                                                }))
                                            }
                                        />
                                        {size}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* COLOR */}
                    <div className="border-t pt-2">
                        <button
                            onClick={() => setOpenColor(!openColor)}
                            className="w-full flex justify-between items-center font-semibold mb-3"
                        >
                            COLOR
                            <PiCaretDownBold className={`${openColor ? "rotate-180" : ""}`} />
                        </button>

                        {openColor && (
                            <div className="flex flex-wrap gap-3">
                                {["red", "black", "white", "green", "blue", "pink","yellow"].map((color) => (
                                    <button
                                        key={color}
                                        onClick={() =>
                                            setSelectedFilters((prev) => ({
                                                ...prev,
                                                color: prev.color.includes(color)
                                                    ? prev.color.filter((c) => c !== color)
                                                    : [...prev.color, color],
                                            }))
                                        }
                                        className={`w-6 h-6 rounded-full border-2
                      ${selectedFilters.color.includes(color)
                                                ? "border-black scale-125"
                                                : "border-gray-300"}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* PRICE */}
                    <div className="border-t pt-2 pb-10">
                        <button
                            onClick={() => setOpenPrice(!openPrice)}
                            className="w-full flex justify-between items-center font-semibold mb-4"
                        >
                            PRICE
                            <PiCaretDownBold className={`${openPrice ? "rotate-180" : ""}`} />
                        </button>

                        {openPrice && (
                            <div className="space-y-5">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) => handleMinChange(e.target.value)}
                                        className="w-20 border py-1 rounded"
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) => handleMaxChange(e.target.value)}
                                        className="w-20 border py-1 rounded"
                                    />
                                </div>

                                <div className="relative h-2">
                                    <div className="absolute inset-0 bg-gray-300 rounded-full" />
                                    <div
                                        className="absolute h-2 bg-black rounded-full"
                                        style={{
                                            left: `${(minPrice / MAX_PRICE) * 100}%`,
                                            right: `${100 - (maxPrice / MAX_PRICE) * 100}%`,
                                        }}
                                    />

                                    <input
                                        type="range"
                                        min={MIN_PRICE}
                                        max={MAX_PRICE}
                                        value={minPrice}
                                        onChange={(e) => handleMinChange(e.target.value)}
                                        className="absolute w-full h-2 bg-transparent appearance-none z-10
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-black"
                                    />
                                    <input
                                        type="range"
                                        min={MIN_PRICE}
                                        max={MAX_PRICE}
                                        value={maxPrice}
                                        onChange={(e) => handleMaxChange(e.target.value)}
                                        className="absolute w-full h-2 bg-transparent appearance-none z-20
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-black"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileFilter;
