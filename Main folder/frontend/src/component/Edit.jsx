import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import put from "../assets/put.png"; // Assuming you have this image in assets

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the post ID from the URL
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        const data = await response.json();
        if (response.ok) {
          setFormData({
            title: data.title,
            content: data.content,
            image: null, // Set image to null since we won't reuse the original image file
          });
          setImagePreview(data.imageUrl); // Set the preview image URL if any
        } else {
          setErrorMessage('Failed to load post data');
        }
      } catch (error) {
        setErrorMessage('');
      }
    };

    fetchPostData();
  }, [id]);

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

    // Image Preview
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
    formDataToSend.append('content', formData.content);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/editpost/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: '',
          content: '',
          image: null,
        });
        setImagePreview(null);
        navigate('/home'); // Redirect to home page after successful post update
      } else {
        const errorResponse = await response.json();
        const errorMessages = errorResponse.errors
          ? errorResponse.errors.map(err => err.msg).join(", ")
          : "An unknown error occurred.";
        setErrorMessage(errorMessages);
      }
    } catch (err) {
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
            Edit Dish Post
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
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <textarea
                name="content"
                placeholder="Content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="4"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 border border-gray-300 rounded-md py-2"
              />
            </div>

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
                {isSubmitting ? 'Submitting...' : 'Update Post'}
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

export default EditPost;
