import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);
export const CartProvider = ({ children }) => {

    // ✅ LOAD FROM LOCAL STORAGE
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // ✅ SAVE TO LOCAL STORAGE
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // ✅ ADD TO CART
    const addToCart = (product, size, quantity = 1) => {
        const finalSize = size || product.sizes?.[0];

        setCartItems((prev) => {
            const existingItem = prev.find(
                (item) =>
                    item.productId === product.id &&
                    item.size === finalSize
            );

            if (existingItem) {
                return prev.map((item) =>
                    item.productId === product.id &&
                        item.size === finalSize
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [
                ...prev,
                {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    image: product.images?.[0],
                    size: finalSize,
                    quantity,
                    availableSizes: product.sizes,
                },
            ];
        });
    };

    // ✅ REMOVE ITEM
    const removeFromCart = (productId, size) => {
        setCartItems((prev) =>
            prev.filter(
                (item) =>
                    !(item.productId === productId && item.size === size)
            )
        );
    };

    // ✅ UPDATE QUANTITY
    const updateQuantity = (productId, size, quantity) => {
        if (quantity < 1) return;

        setCartItems((prev) =>
            prev.map((item) =>
                item.productId === productId && item.size === size
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    // ✅ UPDATE SIZE
    const updateSize = (productId, oldSize, newSize) => {
        setCartItems((prev) => {
            const oldItem = prev.find(
                (i) =>
                    i.productId === productId &&
                    i.size === oldSize
            );

            if (!oldItem) return prev;

            const existingNewSizeItem = prev.find(
                (i) =>
                    i.productId === productId &&
                    i.size === newSize
            );

            return prev.reduce((acc, item) => {
                if (item.productId === productId && item.size === oldSize) {
                    if (!existingNewSizeItem) {
                        acc.push({ ...item, size: newSize });
                    }
                } else if (
                    item.productId === productId &&
                    item.size === newSize &&
                    existingNewSizeItem
                ) {
                    acc.push({
                        ...item,
                        quantity: item.quantity + oldItem.quantity,
                    });
                } else {
                    acc.push(item);
                }
                return acc;
            }, []);
        });
    };

    // ✅ CART COUNT FOR NAVBAR
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                updateSize,
                cartCount, 
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }
    return context;
};
