import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import put from "../assets/put.png";

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    quantity: '',
    category: '',
    ingredients: '',
    preparationTime: '',
    contactInfo: '',
    isVegetarian: false,
    image: true,
    content: '',
    difficulty: '',  
    cuisineType: '', 
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      setErrorMessage("Only image files are allowed.");
      return;
    }

    if (file && file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 5MB.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));

   
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('quantity', formData.quantity);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('ingredients', formData.ingredients);
    formDataToSend.append('preparationTime', formData.preparationTime);
    formDataToSend.append('contactInfo', formData.contactInfo);
    formDataToSend.append('isVegetarian', formData.isVegetarian ? 'true' : 'false');
    formDataToSend.append('content', formData.content);
    formDataToSend.append('difficulty', formData.difficulty); 
    formDataToSend.append('cuisineType', formData.cuisineType);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/createpost', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });
  
      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          location: '',
          price: '',
          quantity: '',
          category: '',
          ingredients: '',
          preparationTime: '',
          contactInfo: '',
          isVegetarian: false,
          image: true,
          content: '',
          difficulty: '',  
          cuisineType: '',  
        });
        setImagePreview(null);
        navigate('/home'); 
      } else {
        console.log('Error creating post');
        const errorResponse = await response.json();
  
        const errorMessages = errorResponse.errors
          ? errorResponse.errors.map(err => err.msg).join(", ")
          : "An unknown error occurred.";
  
        setErrorMessage(errorMessages);
      }
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage('Error occurred while submitting the post.');
    }
  
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center py-6 px-4">
      {errorMessage && <div className="text-red-600 text-center mb-4">{errorMessage}</div>}
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl w-full">
        <div className="w-full lg:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            Create a New Dish Post
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form Fields */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
              />
              <input
                type="number"
                name="preparationTime"
                placeholder="Prep Time (mins)"
                value={formData.preparationTime}
                onChange={handleChange}
                required
                min="0"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* New Culinary Fields */}
            <div className="flex flex-col md:flex-row gap-4">
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <select
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Select Cuisine Type</option>
                <option value="italian">Italian</option>
                <option value="chinese">Chinese</option>
                <option value="mexican">Mexican</option>
                <option value="indian">Indian</option>
                {/* Add more cuisine types as needed */}
              </select>
            </div>

            <input
              type="text"
              name="contactInfo"
              placeholder="Contact Info"
              value={formData.contactInfo}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
            />

            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                name="isVegetarian"
                checked={formData.isVegetarian}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700 text-sm">Vegetarian</label>
            </div>

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
            ></textarea>

            <textarea
              name="ingredients"
              placeholder="Ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows="3"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
            ></textarea>

            <textarea
              name="content"
              placeholder="Content"
              value={formData.content}
              onChange={handleChange}
              rows="3"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
            ></textarea>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 border border-gray-300 rounded-md py-2"
            />
            
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Image Preview" className="w-32 h-32 object-cover rounded-md" />
              </div>
            )}

            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
                } text-white px-6 py-2 rounded-md transition`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Post'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-md"
              >
                Go Back Home
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${put})` }}></div>
      </div>
    </div>
  );
};

export default CreatePost;
