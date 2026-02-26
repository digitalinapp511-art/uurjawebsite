// import { useState } from "react";
// import AdminAddProduct from "./AdminAddProduct";
// import AdminOrders from "./AdminOrders";
// import AdminAllProducts from "./AdminAllProducts";

// const AdminDashboard = () => {
//     const [activeTab, setActiveTab] = useState("orders");

//     return (
//         <div className="min-h-screen bg-gray-100 p-3 md:p-6">
//             <h1 className="text-3xl font-bold m-3 md:m-6">Admin Dashboard</h1>

//             {/* TABS */}
//             <div className="flex gap-4 m-6 border-b-2 pb-3">
//                 <button
//                     onClick={() => setActiveTab("orders")}
//                     className={`px-4 py-2 rounded-lg ${activeTab === "orders"
//                             ? "bg-[#ff9d00] text-white"
//                             : "bg-white"
//                         }`}
//                 >
//                     Orders
//                 </button>

//                 <button
//                     onClick={() => setActiveTab("addProduct")}
//                     className={`px-4 py-2 rounded-lg ${activeTab === "addProduct"
//                             ? "bg-[#ff9d00] text-white"
//                             : "bg-white"
//                         }`}
//                 >
//                     Add Product
//                 </button>
//                 <button
//                     onClick={() => setActiveTab("allProduct")}
//                     className={`px-4 py-2 rounded-lg ${activeTab === "allProduct"
//                             ? "bg-[#ff9d00] text-white"
//                             : "bg-white"
//                         }`}
//                 >
//                     All Product
//                 </button>
//             </div>

//             {/* CONTENT */}
//             {activeTab === "orders" && <AdminOrders />}
//             {activeTab === "addProduct" && <AdminAddProduct />}
//             {activeTab === "allProduct" && <AdminAllProducts />}
//         </div>
//     );
// };

// export default AdminDashboard;



import { useState } from "react";
import AdminAddProduct from "./AdminAddProduct";
import AdminOrders from "./AdminOrders";
import AdminAllProducts from "./AdminAllProducts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const tabs = [
    {
        id: "orders",
        label: "Orders",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),
        // badge: 4,
    },
    {
        id: "addProduct",
        label: "Add Product",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
        ),
    },
    {
        id: "allProduct",
        label: "All Products",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
        ),
    },
];

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("orders");
    const activeLabel = tabs.find((t) => t.id === activeTab)?.label;

    const navigate = useNavigate();

    return (
        <div className="bg-[#faf9f7] h-screen overflow-hidden">
            <div className="flex flex-col md:flex-row h-full">

                {/* ── SIDEBAR (desktop) / TOP BAR (mobile) ───────────────────────── */}
                <aside className="
                w-full md:w-64 md:h-screen md:sticky md:top-0 md:flex-shrink-0
                bg-white border-b md:border-b-0 md:border-r border-gray-100
                flex flex-row md:flex-col
                md:shadow-[4px_0_24px_rgba(0,0,0,0.04)]
                md:overflow-y-auto
            ">
                    {/* Brand */}
                    <div className="hidden md:flex items-center gap-3 px-6 py-7 border-b border-gray-100">
                        <div className="w-9 h-9 rounded-xl bg-[#ff9d00] flex items-center justify-center shadow-md shadow-orange-200">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 leading-tight text-sm">Admin Panel</p>
                            <p className="text-[11px] text-gray-400 font-medium">Management Suite</p>
                        </div>
                    </div>

                    {/* Mobile: logo pill */}
                    <div className="flex md:hidden items-center gap-2 px-4 py-3 border-r border-gray-100">
                        <div className="w-7 h-7 rounded-lg bg-[#ff9d00] flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <span className="font-bold text-gray-800 text-sm whitespace-nowrap">Admin</span>
                    </div>

                    {/* Nav Items */}
                    <nav className="flex flex-row md:flex-col flex-1 md:flex-none md:mt-4 overflow-x-auto md:overflow-x-visible md:px-3 md:pb-6">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                    relative flex items-center gap-3 transition-all duration-200 group
                                    flex-shrink-0 px-4 py-3 text-sm font-medium
                                    md:w-full md:rounded-xl md:px-4 md:py-3 md:mb-1
                                    ${isActive
                                            ? "text-[#ff9d00] md:bg-orange-50"
                                            : "text-gray-500 hover:text-gray-800 md:hover:bg-gray-50"
                                        }
                                `}
                                >
                                    {/* Active indicator — mobile: bottom border, desktop: left bar */}
                                    {isActive && (
                                        <span className="
                                        absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-[#ff9d00]
                                        md:left-0 md:top-2 md:bottom-2 md:right-auto md:w-1 md:h-auto md:rounded-r-full
                                    " />
                                    )}

                                    <span className={`transition-colors ${isActive ? "text-[#ff9d00]" : "text-gray-400 group-hover:text-gray-600"}`}>
                                        {tab.icon}
                                    </span>

                                    <span className="hidden sm:inline md:inline whitespace-nowrap">{tab.label}</span>

                                    {tab.badge && (
                                        <span className="ml-auto hidden md:flex items-center justify-center w-5 h-5 rounded-full bg-[#ff9d00] text-white text-[10px] font-bold">
                                            {tab.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Desktop footer */}
                    <div className="hidden md:block px-6 py-5 border-t border-gray-100 mt-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center text-white font-bold text-xs">
                                AD
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-700">Admin User</p>
                            </div>
                            <button
                                onClick={() => {
                                    localStorage.removeItem("adminAuth");
                                    navigate("/admin/login");
                                }}
                                className="bg-[#ff9d00] text-white px-3 py-2 rounded-lg text-sm ml-auto"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </aside>

                {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
                <main className="flex-1 md:h-screen md:overflow-y-auto p-2 md:p-6">
                    {/* Page header */}
                    <div className="mb-4 mt-3 md:mb-5">
                        <p className="text-xs font-semibold text-[#ff9d00] uppercase tracking-widest mb-1">Dashboard</p>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{activeLabel}</h1>
                    </div>

                    {/* Content area */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                        {activeTab === "orders" && <AdminOrders />}
                        {activeTab === "addProduct" && <AdminAddProduct />}
                        {activeTab === "allProduct" && <AdminAllProducts />}
                    </div>
                </main>

            </div>
        </div>
    );
};

export default AdminDashboard;