import { useState } from "react";
import { notyf } from "../utils/notyf";

const AdminAddProduct = () => {
    const [product, setProduct] = useState({
        title: "",
        description: "",
        sizes: "",
        price: "",
        salePrice: "",
        color: "",
        category: "",
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);

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

    const handleAddProduct = () => {
        if (
            !product.title ||
            !product.price ||
            !product.salePrice ||
            !product.category
        ) {
            notyf.error("Please fill all fields")
            // alert("Please fill all required fields");
            return;
        }

        const products =
            JSON.parse(localStorage.getItem("products")) || [];

        const newProduct = {
            id: Date.now(),
            title: product.title,
            description: product.description,
            sizes: product.sizes.split(","),
            price: product.price,
            salePrice: product.salePrice,
            color: product.color,
            category: product.category,
            images: imagePreviews, // TEMP (later backend URLs)
            status: "ACTIVE",
            createdAt: new Date().toISOString(),
        };

        localStorage.setItem(
            "products",
            JSON.stringify([...products, newProduct])
        );

        alert("✅ Product Added Successfully");

        // reset
        setProduct({
            title: "",
            description: "",
            sizes: "",
            price: "",
            salePrice: "",
            color: "",
            category: "",
            images: [],
        });
        setImagePreviews([]);
    };

    return (
        <div className="w-full flex justify-center items-center py-10">
            <div className="bg-white rounded-xl shadow-lg p-8 md:w-[90%]">

                {/* FORM GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* TITLE */}
                    <div>
                        <label className="font-medium text-sm">
                            Product Title *
                        </label>
                        <input
                            name="title"
                            value={product.title}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg"
                            placeholder="Lava Stone Bracelet"

                        />
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <label className="font-medium text-sm">
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
                        <label className="font-medium text-sm">
                            Quantity
                        </label>
                        <input
                            name="quantity"
                            value={product.quantity}
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
                        <label className="font-medium text-sm">
                            Price *
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg"
                            placeholder="per piece"
                        />
                    </div>

                    {/* SALE PRICE */}
                    {/* <div>
                        <label className="font-medium text-sm">
                            Sale Price *
                        </label>
                        <input
                            type="number"
                            name="salePrice"
                            value={product.salePrice}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg"
                            placeholder="1499"
                        />
                    </div> */}
                </div>

                {/* DESCRIPTION */}
                <div className="mt-6">
                    <label className="font-medium text-sm">
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
                    <label className="font-medium text-sm">
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
