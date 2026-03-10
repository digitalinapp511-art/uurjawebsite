import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";
import { notyf } from "../utils/notyf";

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart} = useCart();
    console.log("Cart Item =>", JSON.stringify(item));

    const discount =
        item.originalPrice &&
        Math.round(
            ((item.originalPrice - item.salePrice) / item.originalPrice) * 100
        );

    const savedAmount =
        item.originalPrice
            ? (item.originalPrice - item.salePrice) * item.quantity
            : 0;

    const increaseQty = () => {
        updateQuantity(item.productId, item.quantity + 1);
        notyf.success("Item quantity increased");
    };

    const decreaseQty = () => {
        if (item.quantity > 1) {
            updateQuantity(item.productId, item.quantity - 1);
            notyf.error("Item quantity decreased");
        }
    };

    const removeItem = () => {
        removeFromCart(item.productId, item.size);
        notyf.error("Item removed from cart");
    };

    return (
        <div className="flex gap-4 border rounded-xl p-2 bg-white">
            {/* IMAGE */}
            <img
                src={item.images}
                alt={item.name}
                className="w-24 h-28 object-cover rounded-lg"
            />

            {/* DETAILS */}
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col space-y-2">
                    <h3 className="font-semibold text-gray-900">
                        {item.name}
                    </h3>

                    {/* Size */}
                    {/* <div>
                        <label className="text-sm text-gray-500 mr-2">Size:</label>
                        <select
                            value={item.size}
                            onChange={(e) =>
                                updateSize(item.productId, item.size, e.target.value)
                            }
                            className="border rounded px-2 py-1 text-sm"
                        >
                            {item.availableSizes?.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div> */}

                    {/* Quantity */}
                    <div className="flex w-24 border rounded-lg">
                        <button className="px-2 py-1" onClick={decreaseQty}>
                            −
                        </button>

                        <span className="px-4 py-1">{item.quantity}</span>

                        <button className="px-2 py-1" onClick={increaseQty}>
                            +
                        </button>
                    </div>
                </div>

                {/* PRICE */}
                <div className="space-y-1 ml-auto text-right">
                    <button
                        onClick={removeItem}
                        className="text-gray-500 text-sm"
                    >
                        <FaTrash />
                    </button>

                    <div className="flex items-center justify-end gap-2">
                        <span className="font-bold text-lg">
                            ₹{item.salePrice * item.quantity}
                        </span>

                        {item.originalPrice && (
                            <span className="line-through text-gray-400 text-sm">
                                ₹{item.originalPrice * item.quantity}
                            </span>
                        )}
                    </div>

                    {item.originalPrice && (
                        <div className="text-sm text-green-600">
                            <p>Saved ₹{savedAmount}</p>
                            <p>{discount}% OFF</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartItem;
