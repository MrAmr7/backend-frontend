import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://your-api-endpoint.com/data")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-800">
          <AiOutlineHome className="text-2xl" />
          <Link to="/" className="text-xl font-bold hover:underline">
            Home
          </Link>
        </div>
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">Loading data...</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
