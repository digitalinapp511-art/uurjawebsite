import { useState } from "react";
import { notyf } from "../utils/notyf";
import { useAddProductMutation } from "../redux/backendApi";

const AdminAddProduct = () => {
    const [product, setProduct] = useState({
        productName: "",   // ❌ was "name"
        description: "",
        originalPrice: "", // ❌ was "price"
        salePrice: "",
        stock: "",         // ❌ was missing
        category: "",
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [addProduct, { isLoading }] = useAddProductMutation();

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        setProduct({ ...product, images: files });

        const previews = files.map((file) =>
            URL.createObjectURL(file)
        );
        setImagePreviews(previews);
    };

    const handleAddProduct = async () => {
        if (
            !product.productName ||
            !product.originalPrice ||
            !product.salePrice ||
            !product.category ||
            !product.description ||
            !product.stock ||
            product.images.length === 0
        ) {
            notyf.error("Please fill all fields");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("productName", product.productName);   // ✅ match backend
            formData.append("description", product.description);
            formData.append("originalPrice", product.originalPrice);
            formData.append("salePrice", product.salePrice);
            formData.append("stock", product.stock);
            formData.append("category", product.category);

            // ✅ Append each image file
            product.images.forEach((img) => formData.append("images", img));

            await addProduct(formData).unwrap();
            notyf.success("Product Added Successfully!");

            // ✅ Reset form
            setProduct({
                productName: "",
                description: "",
                originalPrice: "",
                salePrice: "",
                stock: "",
                category: "",
                images: [],
            });
            setImagePreviews([]);

        } catch (err) {
            console.error("Failed:", err);
            notyf.error(err?.data?.message || "Failed to add product");
        }
    };

    return (
        <div className="w-full flex justify-center items-center py-10">
            <div className="bg-gray-50 rounded-xl shadow-lg p-8 sm:w-[90%] md:w-[90%]">

                {/* FORM GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* NAME */}
                    <div>
                        <label className="font-medium text-md">
                            Product Name *
                        </label>
                        <input
                            name="productName"
                            value={product.name}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg"
                            placeholder="Lava Stone Bracelet"

                        />
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <label className="font-medium text-md">
                            Category *
                        </label>
                        <select
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg bg-white"
                        >
                            <option value="">-- Select Category --</option>
                            <option value="Bracelet">Bracelet</option>
                            <option value="Ring">Ring</option>
                            <option value="Selenite-plate">Selenite Plate</option>
                        </select>
                    </div>

                    {/* COLOR */}
                    <div>
                        <label className="font-medium text-md">
                            Stock
                        </label>
                        <input
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg"
                            placeholder="10, 20, 50"
                        />
                    </div>

                    {/* SIZES */}
                    {/* <div>
                        <label className="font-medium text-sm">
                            Available Sizes
                        </label>
                        <input
                            name="sizes"
                            value={product.sizes}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg"
                            placeholder="S,M,L,XL"
                        />
                    </div> */}

                    {/* PRICE */}
                    <div>
                        <label className="font-medium text-md">
                            Original Price *
                        </label>
                        <input
                            type="number"
                            name="originalPrice"
                            value={product.originalPrice}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg"
                            placeholder="per piece e.g.999"
                        />
                    </div>

                    {/* SALE PRICE */}
                    <div>
                        <label className="font-medium text-md">
                            Sale Price *
                        </label>
                        <input
                            type="number"
                            name="salePrice"
                            value={product.salePrice}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg"
                            placeholder="per piece. e.g.499"
                        />
                    </div>
                </div>

                {/* DESCRIPTION */}
                <div className="mt-6">
                    <label className="font-medium text-md">
                        Product Description
                    </label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full mt-1 p-3 border rounded-lg"
                        placeholder="Material, stone type, size, finish, care instructions..."
                    />
                </div>

                {/* IMAGE UPLOAD */}
                <div className="mt-6">
                    <label className="font-medium text-md">
                        Product Images *
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block mt-2"
                    />

                    {/* IMAGE PREVIEW */}
                    {imagePreviews.length > 0 && (
                        <div className="flex gap-3 mt-4 flex-wrap">
                            {imagePreviews.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="preview"
                                    className="w-24 h-28 object-cover rounded-lg border"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* SUBMIT */}
                <button
                    onClick={handleAddProduct}
                    className="mt-8 bg-[#ff9d00] hover:bg-[#e68c00] text-white px-8 py-3 rounded-lg font-semibold"
                >
                    Add Product
                </button>
            </div>
        </div>
    );
};

export default AdminAddProduct;
