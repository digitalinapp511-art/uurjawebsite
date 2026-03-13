import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiFilter, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery, useDeleteProductMutation, useUpdateProductMutation } from "../redux/backendApi"; // ✅

const AdminAllProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [editImageFile, setEditImageFile] = useState(null);
    const navigate = useNavigate();

    // ✅ RTK Query
    const { data: products = [], isLoading, error } = useGetProductsQuery();
    const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    // ✅ Derive categories from products
    const categories = [...new Set(products.map((p) => p.category))].filter(Boolean);

    // ✅ Filter products by category
    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter((p) => p.category === selectedCategory);

    // ✅ Delete handler
    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await deleteProduct(productId).unwrap();
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete product");
        }
    };

    // ✅ Edit handler
    const handleEdit = (productId) => {
        const productToEdit = products.find((p) => p._id === productId);
        setCurrentProduct(productToEdit);
        setIsEditOpen(true);
    };

    // ✅ Update handler
    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("productName", currentProduct.productName);
            formData.append("description", currentProduct.description);
            formData.append("originalPrice", currentProduct.originalPrice);
            formData.append("salePrice", currentProduct.salePrice);
            formData.append("stock", currentProduct.stock);
            formData.append("category", currentProduct.category);

            if (editImageFile) {
                formData.append("images", editImageFile);
            }

            await updateProduct({ id: currentProduct._id, formData }).unwrap();
            setIsEditOpen(false);
            setEditImageFile(null); 
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update product");
        }
    };

    const clearFilter = () => setSelectedCategory("all");

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b1c62] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-red-600">
                    <p className="text-xl">Failed to load products</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <p className="text-gray-600">
                        Manage your product inventory ({filteredProducts.length} products)
                    </p>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-lg shadow-sm p-2 md:p-4 mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-2 md:gap-4">
                        <div className="flex items-center gap-1">
                            <FiFilter className="text-gray-500" />
                            <span className="font-medium text-gray-700">Filter by Category:</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff9d00]"
                            >
                                <option value="all">All Categories</option>

                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>

                            {selectedCategory !== "all" && (
                                <button
                                    onClick={clearFilter}
                                    className="px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition flex items-center gap-1"
                                >
                                    <FiX /> Clear
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <p className="text-gray-500 text-lg">No products found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
                            >
                                {/* Product Image */}
                                <div className="relative aspect-square bg-gray-100">
                                    {product.images ? (
                                        <img
                                            src={product.images[0]}
                                            alt={product.productNameame}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    <div className="absolute top-2 left-2">
                                        <span className="bg-[#ff9d00] text-black text-xs px-3 py-1 rounded-full">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1 truncate">
                                        {product.productName}
                                    </h3>

                                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-sm  text-gray-800">
                                            Sell price: ₹{product.salePrice}
                                        </p>
                                        <p className="text-sm  text-gray-600">
                                            Original price: ₹{product.originalPrice}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Stock: {product.stock || 0}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product._id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        >
                                            <FiEdit2 /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            disabled={deleteLoading === product._id}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {deleteLoading === product._id ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            ) : (
                                                <>
                                                    <FiTrash2 /> Delete
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit modal */}
                {isEditOpen && currentProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl h-[90vh] scrollbar-hide overflow-y-auto">
                            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                            <div>
                                {currentProduct.images && (
                                    <img
                                        src={currentProduct.images[0]}
                                        alt="Preview"
                                        className="mt-3 w-32 h-32 object-cover rounded-lg border"
                                    />
                                )}
                                <label className="block text-sm font-medium mb-2">
                                    Product Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setEditImageFile(file); // ✅ store actual file
                                            const previewUrl = URL.createObjectURL(file);
                                            setCurrentProduct({ ...currentProduct, images: [previewUrl] }); // just for preview
                                        }
                                    }}
                                    className="w-full border p-2 rounded mb-3"
                                />
                            </div>

                            <div className="space-y-4">

                                {/* Name */}
                                <div className="flex items-center gap-4">
                                    <label className="w-32 text-sm font-medium">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        value={currentProduct.productName}
                                        onChange={(e) =>
                                            setCurrentProduct({
                                                ...currentProduct,
                                                productName: e.target.value,
                                            })
                                        }
                                        className="flex-1 border p-2 rounded"
                                        placeholder="Product Name"
                                    />
                                </div>

                                {/* Original Price */}
                                <div className="flex items-center gap-4">
                                    <label className="w-32 text-sm font-medium">
                                        Original Price:
                                    </label>
                                    <input
                                        type="number"
                                        value={currentProduct.originalPrice}
                                        onChange={(e) =>
                                            setCurrentProduct({
                                                ...currentProduct,
                                                originalPrice: e.target.value,
                                            })
                                        }
                                        className="flex-1 border p-2 rounded"
                                        placeholder="Original Price"
                                    />
                                </div>

                                {/* Sale Price */}
                                <div className="flex items-center gap-4">
                                    <label className="w-32 text-sm font-medium">
                                        Price:
                                    </label>
                                    <input
                                        type="number"
                                        value={currentProduct.salePrice}
                                        onChange={(e) =>
                                            setCurrentProduct({
                                                ...currentProduct,
                                                salePrice: e.target.value,
                                            })
                                        }
                                        className="flex-1 border p-2 rounded"
                                        placeholder="Price"
                                    />
                                </div>

                                {/* Stock */}
                                <div className="flex items-center gap-4">
                                    <label className="w-32 text-sm font-medium">
                                        Stock:
                                    </label>
                                    <input
                                        type="number"
                                        value={currentProduct.stock}
                                        onChange={(e) =>
                                            setCurrentProduct({
                                                ...currentProduct,
                                                stock: e.target.value,
                                            })
                                        }
                                        className="flex-1 border p-2 rounded"
                                        placeholder="Stock"
                                    />
                                </div>

                                {/* Description */}
                                <div className="flex items-start gap-4">
                                    <label className="w-32 text-sm font-medium pt-2">
                                        Description:
                                    </label>
                                    <textarea
                                        value={currentProduct.description}
                                        onChange={(e) =>
                                            setCurrentProduct({
                                                ...currentProduct,
                                                description: e.target.value,
                                            })
                                        }
                                        className="flex-1 border p-2 rounded"
                                        placeholder="Description"
                                    />
                                </div>

                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setIsEditOpen(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="px-4 py-2 bg-[#ff9d00] text-white rounded-lg"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAllProducts;