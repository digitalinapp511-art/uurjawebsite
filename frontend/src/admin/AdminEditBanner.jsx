import { useState, useEffect } from "react";
import { useGetAdminBannersQuery, useCreateBannerMutation, useUpdateBannerMutation, useDeleteBannerMutation } from "../redux/backendApi";

const AdminEditBanner = () => {
    const [heroPreview, setHeroPreview] = useState(null);
    const [flashPreview, setFlashPreview] = useState(null);
    const [heroFile, setHeroFile] = useState(null);
    const [flashFile, setFlashFile] = useState(null);

    // ✅ RTK Query
    const { data: bannersResponse } = useGetAdminBannersQuery();
    const banners = bannersResponse?.data || [];
    const [createBanner] = useCreateBannerMutation();
    const [updateBanner] = useUpdateBannerMutation();
    const [deleteBanner] = useDeleteBannerMutation();

    // ✅ Load banners from API on mount
    useEffect(() => {
        if (banners.length > 0) {
            setHeroPreview(banners[0]?.image || null);
            setFlashPreview(banners[1]?.image || null);
        }
    }, [banners]);

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        // ✅ Show preview
        const previewUrl = URL.createObjectURL(file);
        if (type === "hero") {
            setHeroPreview(previewUrl);
            setHeroFile(file);
        } else {
            setFlashPreview(previewUrl);
            setFlashFile(file);
        }
    };

    // ✅ Save banner to backend
    const handleSave = async (type) => {
        const file = type === "hero" ? heroFile : flashFile;
        if (!file) { alert("Please select an image first"); return; }

        const formData = new FormData();
        formData.append("image", file);

        try {
            const existingBanner = type === "hero" ? banners[0] : banners[1]; // ✅ use index

            if (existingBanner) {
                await updateBanner({ id: existingBanner._id, formData }).unwrap();
                alert("Banner updated successfully!");
            } else {
                await createBanner(formData).unwrap();
                alert("Banner created successfully!");
            }

        } catch (err) {
            console.error("Banner save failed:", err);
            alert("Failed to save banner");
        }
    };

    const handleDelete = async (type) => {
        if (!window.confirm("Are you sure you want to delete this banner?")) return;

        try {
            const banner = type === "hero" ? banners[0] : banners[1];
            await deleteBanner(banner._id).unwrap();

            // ✅ Clear preview after delete
            if (type === "hero") setHeroPreview(null);
            else setFlashPreview(null);

            alert("Banner deleted successfully!");
        } catch (err) {
            alert("Failed to delete banner");
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

                <div className="flex items-center gap-3">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "hero")}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={() => handleSave("hero")}
                        className="px-4 py-2 bg-[#ff9d00] text-white rounded-lg hover:opacity-90"
                    >
                        Save Hero Banner
                    </button>

                    <button
                        onClick={() => handleDelete("hero")}  // ✅ add this
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-90"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Flash Banner */}
            {/* <div>
                <h2 className="text-lg font-semibold mb-3">Flash Sale Banner</h2>

                {flashPreview && (
                    <img
                        src={flashPreview}
                        alt="Flash Preview"
                        className="w-full max-w-xl rounded-lg shadow mb-3"
                    />
                )}

                <div className="flex items-center gap-3">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "flash")}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={() => handleSave("flash")}
                        className="px-4 py-2 bg-[#ff9d00] text-white rounded-lg hover:opacity-90"
                    >
                        Save Flash Banner
                    </button>
                    <button
                        onClick={() => handleDelete("flash")}  // ✅ delete button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-90"
                    >
                        Delete
                    </button>
                </div>
            </div> */}
        </div>
    );
};

export default AdminEditBanner;