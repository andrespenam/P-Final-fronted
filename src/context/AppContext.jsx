import { createContext, useEffect, useMemo, useState } from "react";
import { createOrder, getFeaturedProducts, getProducts } from "../services/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  const normalize = (data) =>
    data.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: Number(p.price),
      image: p.image,
      category: p.category,
      created_at: p.created_at,
    }));

  const refreshProducts = async () => {
    try {
      setLoadingProducts(true);
      setProductsError(null);
      const data = await getProducts();
      setProducts(normalize(data));
    } catch (err) {
      setProductsError(err.message || "Error cargando productos");
    } finally {
      setLoadingProducts(false);
    }
  };

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [featuredError, setFeaturedError] = useState(null);

  const refreshFeaturedProducts = async () => {
    try {
      setLoadingFeatured(true);
      setFeaturedError(null);

      try {
        const data = await getFeaturedProducts();
        setFeaturedProducts(normalize(data));
      } catch {
        setFeaturedProducts(products.slice(0, 3));
      }
    } catch (err) {
      setFeaturedError(err.message || "Error cargando destacados");
    } finally {
      setLoadingFeatured(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  useEffect(() => {
    refreshFeaturedProducts();
  }, [products.length]);

  const [creatingOrder, setCreatingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const checkout = async () => {
    try {
      setCreatingOrder(true);
      setOrderError(null);

      const payload = {
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
      };

      const result = await createOrder(payload);
      setCart([]);
      return result;
    } catch (err) {
      setOrderError(err.message || "Error creando orden");
      throw err;
    } finally {
      setCreatingOrder(false);
    }
  };

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      total,
      products,
      loadingProducts,
      productsError,
      refreshProducts,
      featuredProducts,
      loadingFeatured,
      featuredError,
      refreshFeaturedProducts,
      creatingOrder,
      orderError,
      checkout,
    }),
    [
      cart,
      total,
      products,
      loadingProducts,
      productsError,
      featuredProducts,
      loadingFeatured,
      featuredError,
      creatingOrder,
      orderError,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};