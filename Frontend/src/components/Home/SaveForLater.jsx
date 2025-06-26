import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Header from "./Nabar";
import Footer from "../LandingPage/Module/Footer";

const SavedForLater = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      const id = parsedUser._id;
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchSavedItems = async () => {
      try {
        const res = await fetch(`https://hardware-hive-backend.vercel.app/api/user/savedItems/${userId}`);
        const data = await res.json();
        if (data?.savedItems) setSavedItems(data.savedItems.reverse());
      } catch (error) {
        console.error("Error fetching saved items:", error);
      }
    };

    fetchSavedItems();
  }, [userId]);

  const handleMoveToCart = async (item) => {
    try {
      const res = await fetch("https://hardware-hive-backend.vercel.app/api/user/addSavedItemToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: item.productId, userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      setSavedItems(prev => prev.filter(si => si.productId !== item.productId));
      navigate("/cart");
    } catch (err) {
      console.error("Error moving item to cart:", err);
    }
  };

  const handleRemoveSavedItem = async (item) => {
    try {
      const res = await fetch("https://hardware-hive-backend.vercel.app/api/user/deleteSavedItem", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: item.productId }),
      });

      if (!res.ok) throw new Error("Failed to remove saved item");
      setSavedItems(prev => prev.filter(si => si.productId !== item.productId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F5F6]">
      <Header savedItemsCount={savedItems.length} />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b">
            <h1 className="text-xl font-bold text-gray-800">Saved for Later ({savedItems.length})</h1>
          </div>

          {savedItems.length > 0 ? (
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {savedItems.map((item) => (
                  <div key={item._id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="relative mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-32 object-contain rounded"
                      />
                    </div>

                    <div className="mb-3">
                      <h3 className="font-medium text-sm text-gray-800 mb-1 line-clamp-2">{item.title}</h3>
                      <p className="text-base font-semibold text-gray-800">₹{item.price}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRemoveSavedItem(item)}
                        className="p-2 border border-gray-300 text-gray-700 rounded text-sm"
                        title="Remove"
                      >
                        <MdDelete size={16} />
                      </button>
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm font-medium"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <img
                src="/images/empty-saved.webp"
                alt="No saved items"
                className="w-48 h-auto mx-auto mb-6"
              />
              <h2 className="text-lg font-semibold text-gray-700 mb-2">No Saved Items</h2>
              <p className="text-gray-500 mb-4">You haven't saved any items for later yet.</p>
              <button
                onClick={() => navigate("/home")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SavedForLater;