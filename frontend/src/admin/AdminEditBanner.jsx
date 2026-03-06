import { useState, useEffect } from "react";

const AdminEditBanner = () => {
    const [heroPreview, setHeroPreview] = useState(null);
    const [flashPreview, setFlashPreview] = useState(null);

    const DEFAULT_HERO =
        "https://res.cloudinary.com/dqkssrvir/image/upload/v1772029048/sliderImage_x7mdix.png";

    const DEFAULT_FLASH =
        "https://res.cloudinary.com/dqkssrvir/image/upload/v1772030852/flashSale1_p3auwa.png";

    useEffect(() => {
        setHeroPreview(localStorage.getItem("heroBanner") || DEFAULT_HERO);
        setFlashPreview(localStorage.getItem("flashBanner") || DEFAULT_FLASH);
    }, []);

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            if (type === "hero") {
                setHeroPreview(reader.result);
                localStorage.setItem("heroBanner", reader.result);
            } else {
                setFlashPreview(reader.result);
                localStorage.setItem("flashBanner", reader.result);
            }
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className="p-6 space-y-10">

            {/* Hero Banner */}
            <div>
                <h2 className="text-lg font-semibold mb-3">Hero Banner</h2>

                {heroPreview && (
                    <img
                        src={heroPreview}
                        alt="Hero Preview"
                        className="w-full max-w-xl rounded-lg shadow mb-3"
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "hero")}
                    className="border p-2 rounded"
                />
            </div>

            {/* Flash Banner */}
            <div>
                <h2 className="text-lg font-semibold mb-3">Flash Sale Banner</h2>

                {flashPreview && (
                    <img
                        src={flashPreview}
                        alt="Flash Preview"
                        className="w-full max-w-xl rounded-lg shadow mb-3"
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "flash")}
                    className="border p-2 rounded"
                />
            </div>

        </div>
    );
};

export default AdminEditBanner;