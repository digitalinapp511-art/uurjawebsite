import { useState } from "react";
import AdminAddProduct from "./AdminAddProduct";
import AdminOrders from "./AdminOrders";
import AdminAllProducts from "./AdminAllProducts";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("orders");

    return (
        <div className="min-h-screen bg-gray-100 p-3 md:p-6">
            <h1 className="text-3xl font-bold m-3 md:m-6">Admin Dashboard</h1>

            {/* TABS */}
            <div className="flex gap-4 m-6 border-b-2 pb-3">
                <button
                    onClick={() => setActiveTab("orders")}
                    className={`px-4 py-2 rounded-lg ${activeTab === "orders"
                            ? "bg-[#ff9d00] text-white"
                            : "bg-white"
                        }`}
                >
                    Orders
                </button>

                <button
                    onClick={() => setActiveTab("addProduct")}
                    className={`px-4 py-2 rounded-lg ${activeTab === "addProduct"
                            ? "bg-[#ff9d00] text-white"
                            : "bg-white"
                        }`}
                >
                    Add Product
                </button>
                <button
                    onClick={() => setActiveTab("allProduct")}
                    className={`px-4 py-2 rounded-lg ${activeTab === "allProduct"
                            ? "bg-[#ff9d00] text-white"
                            : "bg-white"
                        }`}
                >
                    All Product
                </button>
            </div>

            {/* CONTENT */}
            {activeTab === "orders" && <AdminOrders />}
            {activeTab === "addProduct" && <AdminAddProduct />}
            {activeTab === "allProduct" && <AdminAllProducts />}
        </div>
    );
};

export default AdminDashboard;
