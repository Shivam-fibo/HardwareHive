import { useState } from "react";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [subheading, setSubheading] = useState("");
  const [category,setCategory] = useState("")
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subheading", subheading);
    formData.append("category", category)
    formData.append("price", price);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/upload/uploadProduct", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Product uploaded successfully!");
        setTitle("");
        setSubheading("");
        setPrice("");
        setImage(null);
      } else {
        setMessage(data.error || "Failed to upload product.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Product</h2>
      {message && <p className="text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Subheading"
          value={subheading}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />
          <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setSubheading(e.target.value)}
          className="w-full p-2 border rounded"
        />
        
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
