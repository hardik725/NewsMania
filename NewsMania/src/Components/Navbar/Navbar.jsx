import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import icons
import NewsSection from "../NewsSection/NewsSection";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [category, setCategory] = useState("finance"); // Default category
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle viewport resizing to toggle mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to handle search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCategory(searchQuery.toLowerCase());
    }
  };

  // Handle category selection
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className="bg-slate-800">
      <nav className="bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg p-5 flex items-center justify-between relative">
        {/* Logo Section */}
        <div className="text-3xl font-bold text-white animate-pulse">NewsPortal</div>

        {/* Navigation Links (Hidden in Mobile Mode) */}
        <div className={`md:flex space-x-10 items-center transition-all duration-500 ${isMobile ? "hidden" : "block"}`}>
          <ul className="flex space-x-8 text-lg font-medium">
            {["home", "politics", "sports", "technology", "health", "entertainment"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleCategoryChange(item)}
                  className="text-white hover:text-yellow-400 hover:underline"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`text-white text-3xl focus:outline-none ${isMobile ? "" : "hidden"}`}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} /> {/* Use FontAwesomeIcon */}
        </button>
      </nav>

      {/* Mobile Dropdown Menu (Only visible in mobile mode) */}
      {isMobile && (
        <div
          className={`transition-transform duration-500 ${isMenuOpen ? "translate-x-0" : "translate-x-full"} absolute top-16 left-0 w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white p-5 z-30`}
        >
          <ul className="space-y-6 text-lg font-medium">
            {["home", "politics", "sports", "technology", "health", "entertainment"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleCategoryChange(item)}
                  className="block hover:text-yellow-400 hover:underline"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search Section (Positioned Below on Mobile) */}
      <div className="flex items-center justify-center">
      <div className={`flex items-center space-x-4 ${isMobile ? "mt-5" : ""}`}>
        <input
          type="text"
          className="p-2 rounded-md border-2 text-white border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400 w-64"
          placeholder="Search for news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-400 text-black p-2 rounded-md hover:bg-yellow-500 transition-colors duration-300 ease-in-out"
        >
          Search
        </button>
      </div>
      </div>

      {/* News Section */}
      <NewsSection category={category} />
    </div>
  );
};

export default Navbar;
