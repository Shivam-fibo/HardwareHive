  export const moveToCart = async (productId, userId) => {
    try {
      const res = await fetch("https://hardware-hive-backend.vercel.app/api/user/addSavedItemToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    } catch (err) {
      console.error("Error moving item to cart:", err);
      throw err;
    }
  };