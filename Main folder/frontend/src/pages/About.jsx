import React from 'react';
import look from "../assets/look.webp"; // Assuming look.webp is your image

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-950 to-blue-800 flex flex-col items-center py-10">
      <div className="max-w-4xl w-full text-center bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-blue-950 mb-6">
          About <span className="text-blue-600">RestroApp</span>
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          Welcome to <span className="font-semibold text-blue-600">RestroApp</span>! We’re a food lover’s dream, helping you discover the best dishes, recipes, and culinary experiences from around the globe.
        </p>

        <div className="mb-8">
          <img
            src={look} // Using the look image here
            alt="Restaurant"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        <p className="text-lg text-gray-700 mb-6">
          Whether you’re craving something spicy, sweet, or savory, RestroApp makes it easy to discover, explore, and enjoy the foods you love. Our platform connects you with top restaurants, home cooks, and the best food makers around you.
        </p>

        <h2 className="text-2xl font-semibold text-blue-950 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-6">
          Our goal is to make food discovery fun and easy for everyone. RestroApp is designed to bring delicious meals to your fingertips. Discover new recipes, order from local restaurants, or simply get inspired by our food community.
        </p>

        <h3 className="text-xl font-semibold text-blue-950 mb-4">Key Features</h3>
        <ul className="list-disc text-left pl-8 text-gray-700 mb-6">
          <li>Browse and explore a variety of cuisines from around the world.</li>
          <li>Order food directly from top local restaurants and chefs.</li>
          <li>Save your favorite dishes and get personalized recommendations.</li>
          <li>Discover cooking tips, new recipes, and foodie content daily.</li>
          <li>Interact with a community of food lovers and share your experiences.</li>
        </ul>

        <p className="text-lg text-gray-700">
          RestroApp is all about celebrating food and sharing the joy of eating. Whether you're a seasoned chef or just someone who loves great food, we’ve created a platform to inspire your next meal.
        </p>

        <div className="mt-8">
          <button
            onClick={() => window.location.href = '/home'}
            className="bg-blue-950 w-full  hover:bg-blue-900 text-white px-6 py-3 rounded-full shadow-lg transition duration-300"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
