import React from 'react';
import look from '../assets/look.webp'; // Ensure this image exists

const Server = () => {
  return (
    <div className="min-h-screen bg-blue-950 flex justify-center items-center px-4 py-10">
      <div className="bg-white max-w-5xl w-full rounded-xl shadow-2xl p-8 md:p-12">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6 text-center">
          Our <span className="text-blue-800">Services</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-700 mb-6 text-center">
          Discover what we offer to elevate your food journey with RestroApp.
        </p>

        {/* Image */}
        <div className="mb-8">
          <img
            src={look}
            alt="Our Services"
            className="w-full h-[300px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Services List */}
        <ul className="list-disc pl-6 text-gray-700 text-lg space-y-4">
          <li>
            <strong className="text-blue-800">Online Ordering:</strong> Seamlessly place food orders from top local restaurants.
          </li>
          <li>
            <strong className="text-blue-800">Food Discovery:</strong> Explore trending dishes and curated menus daily.
          </li>
          <li>
            <strong className="text-blue-800">Custom Recommendations:</strong> Get food suggestions based on your taste and preferences.
          </li>
          <li>
            <strong className="text-blue-700">Post Your Dishes:</strong> Home cooks and chefs can showcase and sell their creations.
          </li>
          <li>
            <strong className="text-blue-800">Community & Reviews:</strong> Share your food experiences and read trusted reviews.
          </li>
        </ul>

        {/* CTA Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => window.location.href = '/home'}
            className="bg-blue-950 w-full hover:bg-blue-900 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
          >
            Explore Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Server;
