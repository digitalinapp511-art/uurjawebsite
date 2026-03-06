import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi"; 

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // TEMP: Load orders from localStorage
    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // Filter by status first
  const filteredByStatus =
    filter === "ALL"
      ? orders
      : orders.filter((o) => o.status === filter);

  // Then filter by search query (order ID or customer name)
  const filteredOrders = filteredByStatus.filter((order) => {
    const query = searchQuery.toLowerCase();
    const orderId = order.orderId.toLowerCase();
    const customerName = order.customer?.name?.toLowerCase() || "";

    return orderId.includes(query) || customerName.includes(query);
  });

  if (orders.length === 0) {
    return (
      <div className="pt-24 text-center">
        <h2 className="text-xl font-semibold">
          No orders available
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="pt-2 md:pt-6 md:px-6 w-full md:max-w-7xl mx-auto mb-10">
        <h2 className="text-2xl font-semibold mb-4 px-4 md:px-0 text-[#ff9d00]">Orders</h2>
        <div className="bg-white rounded-lg p-2 shadow">

          {/* Filter and Search Bar */}
          <div className="m-4 md:m-6 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            {/* Filter Dropdown */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-56 border border-gray-300 rounded-lg px-3 py-2 
          text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9d00]"
            >
              <option value="ALL">All Orders</option>
              <option value="PLACED">Placed</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            {/* Search Bar */}
            <div className="relative w-full sm:flex-1 sm:max-w-md">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Order ID or Customer Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
            text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9d00]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Results count */}
          {searchQuery && (
            <div className="mx-4 md:mx-6 mb-4 text-sm text-gray-600">
              Found {filteredOrders.length} result(s)
            </div>
          )}

          {/* Table with horizontal scroll */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Order ID</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Payment</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.orderId}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium">
                        {order.orderId}
                      </td>

                      <td className="px-4 py-3">
                        {order.customer?.name}
                      </td>

                      <td className="px-4 py-3">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3 font-semibold">
                        ₹{order.totalAmount}
                      </td>

                      <td className="px-4 py-3">
                        {order.paymentMethod}
                      </td>

                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order.orderId,
                              e.target.value
                            )
                          }
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="PLACED">PLACED</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">
                            DELIVERED
                          </option>
                          <option value="CANCELLED">
                            CANCELLED
                          </option>
                        </select>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          className="text-[#ff9d00] font-semibold hover:underline"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowModal(true);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      No orders found matching "{searchQuery}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6 overflow-y-auto max-h-[90vh]">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Order #{selectedOrder.orderId}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 text-xl"
              >
                ✕
              </button>
            </div>

            {/* CUSTOMER INFO */}
            <div className="mb-4 text-sm">
              <p><b>Name:</b> {selectedOrder.customer.name}</p>
              <p><b>Phone:</b> {selectedOrder.customer.phone}</p>
              <p><b>Placed On:</b> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            </div>

            {/* ADDRESS */}
            <div className="mb-4 text-sm">
              <p className="font-semibold">Delivery Address</p>
              <p>
                {selectedOrder.shippingAddress.address1},{" "}
                {selectedOrder.shippingAddress.city},{" "}
                {selectedOrder.shippingAddress.state} –{" "}
                {selectedOrder.shippingAddress.pincode}
              </p>
            </div>

            {/* ITEMS */}
            <div className="border-t pt-4 space-y-3">
              {selectedOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      className="w-12 h-14 rounded object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {item.name}
                      </p>
                      {/* <p className="text-xs text-gray-500">
                        Size: {item.size} × {item.quantity}
                      </p> */}
                    </div>
                  </div>
                  <p className="text-sm font-semibold">
                    ₹{item.salePrice * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="border-t mt-4 pt-4 flex justify-between items-center">
              <div className="text-sm">
                <p><b>Payment:</b> {selectedOrder.paymentMethod}</p>
                <p>
                  <b>Status:</b>{" "}
                  <span className={`font-semibold ${selectedOrder.status === "CANCELLED"
                    ? "text-red-600"
                    : "text-green-600"
                    }`}>
                    {selectedOrder.status}
                  </span>
                </p>
              </div>

              <p className="text-lg font-bold">
                ₹{selectedOrder.totalAmount}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrders;