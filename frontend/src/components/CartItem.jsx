import { FaTrash } from "react-icons/fa";
import { notyf } from "../utils/notyf";
import {
    useAddToCartMutation,
    useRemoveCartMutation,
    useUpdateCartMutation
} from "../redux/backendApi";

const CartItem = ({ item }) => {
    // console.log("Cart Item =>", JSON.stringify(item));
    // console.log("quantity:", item.quantity);
    console.log("productId:", item.product._id)


    const [updateCartApi] = useUpdateCartMutation();
    const [removeCartApi] = useRemoveCartMutation();

    const quantity = item.quantity || 1;
    const salePrice = item.product.salePrice || 0;
    const originalPrice = item.product.originalPrice || 0;

    const discount =
        originalPrice &&
        Math.round(((originalPrice - salePrice) / originalPrice) * 100);

    const savedAmount =
        originalPrice
            ? (originalPrice - salePrice) * quantity
            : 0;

    const increaseQty = async () => {
        try {
            if (quantity >= item.product.stock) {
                notyf.error(`You can only add ${item.product.stock} items`);
                return;
            }
            await updateCartApi({
                productId: item.product._id,
                quantity: quantity + 1
            }).unwrap();


            notyf.success("Item quantity increased");
        } catch (error) {
            console.error(error);
            notyf.error("Failed to increase quantity");
        }
    };

    const decreaseQty = async () => {
        if (quantity > 1) {
            try {
                await updateCartApi({
                    productId: item.product._id,
                    quantity: quantity - 1
                }).unwrap();

                notyf.error("Item quantity decreased");
            } catch (error) {
                console.error(error);
                notyf.error("Failed to decrease quantity");
            }
        }
    };

    const removeItem = async () => {
        try {
            await removeCartApi(item.product._id).unwrap();
            console.log("Product Id:", item.product._id);
            notyf.error("Item removed from cart");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex gap-4 border rounded-xl p-2 bg-white">
            {/* IMAGE */}
            <img
                src={item.product.images?.[0]}
                alt={item.product.productName}
                className="w-24 h-28 object-cover rounded-lg"
            />

            {/* DETAILS */}
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col space-y-2">
                    <h3 className="font-semibold text-gray-900">
                        {item.product.productName}
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
                            ₹{item.product.salePrice * item.quantity}
                        </span>

                        {item.product.originalPrice && (
                            <span className="line-through text-gray-400 text-sm">
                                ₹{item.product.originalPrice * item.quantity}
                            </span>
                        )}
                    </div>

                    {item.product.originalPrice && (
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
