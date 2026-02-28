import { useState, useEffect } from "react";

const AdminEditBanner = () => {
    const [heroPreview, setHeroPreview] = useState(null);
    const [flashPreview, setFlashPreview] = useState(null);

    useEffect(() => {
        setHeroPreview(localStorage.getItem("heroBanner"));
        setFlashPreview(localStorage.getItem("flashBanner"));
    }, []);

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);

        if (type === "hero") {
            setHeroPreview(previewUrl);
            localStorage.setItem("heroBanner", previewUrl);
        } else {
            setFlashPreview(previewUrl);
            localStorage.setItem("flashBanner", previewUrl);
        }
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