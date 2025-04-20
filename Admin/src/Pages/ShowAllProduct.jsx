import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ShowAllProduct = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch all images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://hardware-hive.vercel.app/api/admin/images");
      const data = await response.json();
      setAllImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setUploading(true);
      const response = await fetch("https://hardware-hive.vercel.app/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Refresh the images list after upload
        fetchImages();
        // Reset the form
        setImage(null);
        setPreview(null);
      } else {
        const data = await response.json();
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleting(id);
      const response = await fetch(`https://hardware-hive.vercel.app/api/admin/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the images after deletion
        fetchImages();
      } else {
        const data = await response.json();
        alert("Delete failed: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setDeleting(null);
    }
  };

  return (

    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Product Image Management</h1>
        
        {/* Upload Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Upload New Image</h2>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-white"
              disabled={uploading}
            />
            <button
              onClick={handleUpload}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold rounded whitespace-nowrap disabled:bg-blue-400"
              disabled={uploading || !image}
            >
              {uploading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : "Upload"}
            </button>
          </div>
          
          {preview && (
            <div className="mt-4 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <img src={preview} alt="Preview" className="h-40 rounded-lg object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-white font-medium">Preview</p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
        
        {/* Gallery Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">All Uploaded Images</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : allImages.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p>No images have been uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {allImages.map((img) => (
    <motion.div
      key={img._id}
      className="relative bg-gray-700 rounded-lg shadow-md overflow-hidden flex items-center justify-center w-40 h-40 mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      <img 
        src={img.url} 
        alt="Product" 
        className="w-full h-full object-contain"
      />

      <button
        onClick={() => handleDelete(img._id)}
        disabled={deleting === img._id}
        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-colors disabled:bg-red-400"
        title="Delete image"
      >
        {deleting === img._id ? (
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        )}
      </button>
    </motion.div>
  ))}
</div>

          )}
        </div>
      </div>
    </div>

  );
};

export default ShowAllProduct;