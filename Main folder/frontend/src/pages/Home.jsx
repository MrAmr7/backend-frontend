import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import imrs from "../assets/imrs.jpeg";
import just from "../assets/just.jpg";
import doImg from "../assets/do.jpeg";
import useImg from "../assets/use.webp";
import jpgImg from "../assets/jpg.webp";
import look from "../assets/look.webp";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setUsername(user.username);

    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch posts");
          setPosts([]);
        } else {
          const data = await res.json();
          setPosts(data.reverse());
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`You searched for: ${searchQuery}`);
      // Implement dynamic search filtering logic here if needed
    }
  };

  const handleDelete = async (postId) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/deletepost/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setPosts(posts.filter(post => post._id !== postId)); // Remove the post from local state
      } else {
        alert('Failed to delete post.');
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert('An error occurred while deleting the post.');
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Customize this format as needed
  };

  const cardData = [
    { title: 'Chicken Curry', img: just, price: 10 },
    { title: 'Italian Pasta', img: doImg, price: 12 },
    { title: 'Tasty Drinks', img: useImg, price: 5 },
    { title: 'Desserts', img: jpgImg, price: 7 },
    { title: 'Starters', img: look, price: 6 },
    { title: 'Specials', img: just, price: 15 },
    { title: 'Starters', img: look, price: 6 },
    { title: 'Specials', img: just, price: 15 },
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      {/* ✅ Navbar */}
      <nav className="bg-blue-950 text-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center">
          🍽️ <span className="ml-2 text-white">RestroApp</span>
        </div>
        <div className="space-x-6 text-gray-100 font-medium">
          <Link to="/home" className="hover:text-blue-300">Home</Link>
          <Link to="/about" className="hover:text-blue-300">About</Link>
          <Link to="/services" className="hover:text-blue-300">Services</Link>
          <Link to="/dashbord" className="hover:text-blue-300">Dashbord</Link>
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <div className="w-full h-[400px] relative">
        <img
          src={look}
          alt="Restaurant"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <img src={just} alt="Full menu" className="w-32 md:w-40 rounded-full mb-4 shadow-lg" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">
            Welcome to our delicious menu{username ? `, ${username}` : ''} 👋
          </h1>
          <p className="text-sm md:text-lg mb-4 drop-shadow-sm">Pick your favorite and order now!</p>

          {/* ✅ Search */}
          <div className="flex w-full max-w-md backdrop-blur-md bg-white/10 rounded-md overflow-hidden border border-white/30 shadow-lg">
            <input
              type="text"
              placeholder="Search your favorite dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 bg-transparent text-white placeholder-white focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-950 hover:bg-blue-900 px-4 py-2 text-white transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Popular Dishes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 py-10">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:scale-105 text-center overflow-hidden"
          >
            <div className="relative">
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-56 object-cover rounded-t-xl transition duration-300 ease-in-out shadow-lg"
              />
            </div>

            <div className="p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">{card.title}</h2>
              <p className="text-sm text-gray-600 mb-4">Tasty {card.title.toLowerCase()} waiting for you!</p>
              <p className="text-lg font-semibold text-blue-900 mb-4">${card.price}</p> {/* Price added */}
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => navigate('/createpost')}
                  className="bg-blue-950 hover:bg-blue-900 text-white text-xs px-4 py-2 rounded-full transition duration-200"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => navigate('/payment')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-4 py-2 rounded-full transition duration-200"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Recent Posts */}
      <div className="px-6 py-10">
        <h2 className="text-2xl text-center font-semibold text-blue-900 mb-4">Recent Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="bg-white rounded-xl hover:bg-gray-100 shadow-lg p-9">
                <h2 className="text-lg font-semibold text-blue-900">{post.title}</h2>
                <p className="text-sm text-gray-600 my-2">{post.description}</p>
                {post.img && (
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg shadow mb-4"
                  />
                )}
                <p className="text-lg font-semibold text-blue-900 mb-4">${post.price}</p> {/* Price added */}
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => navigate(`/edit/${post._id}`)}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-12 py-3 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}  // Post deletion integrated here
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-10  py-3 rounded"
                  >
                    Delete
                  </button>
                </div>
                {/* ✅ Display creation time */}
                <p className="text-xs text-gray-500 mt-2">{formatDate(post.createdAt)}</p>
              </div>
            ))
          ) : (
            <p>No posts available. Please add some.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
