import React, { useEffect, useState } from "react";

const NewsSection = ({ category }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://newsapi.org/v2/everything?q=${category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
        if (!response.ok) {
          throw new Error("Error fetching news data");
        }
        const data = await response.json();
        
        // Filter news data to exclude articles without a title or image
        const filteredNews = data.articles.filter((article) => article.title && article.urlToImage);
        setNewsData(filteredNews);
      } catch (err) {
        setError("Error fetching news data");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error) return <div className="text-center p-5 text-red-500">{error}</div>;

  return (
    <section className="p-5">
      <h2 className="text-3xl font-bold mb-5 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 animate-text">
        {category.charAt(0).toUpperCase() + category.slice(1)} News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsData.map((article, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-green-400 to-blue-500 hover:text-white hover:cursor-pointer animate-card"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-500 ease-in-out transform hover:scale-110"
              />
            )}
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{article.title}</h3>
            <p className="text-gray-600 mb-3">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
