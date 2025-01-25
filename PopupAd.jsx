import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const PopupAd = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  ];

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    const carouselTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 8000);

    return () => {
      clearTimeout(popupTimer);
      clearInterval(carouselTimer);
    };
  }, [carouselImages.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-xs mx-4 relative shadow-lg">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative mb-4 w-full h-32 rounded-lg overflow-hidden">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          ))}
        </div>

        <h3 className="text-lg font-bold mb-2 text-center">
          discover Your Next Adventure!
        </h3>
        <p className="text-sm text-gray-600 mb-4 text-center">
          explore our vast collection of books across all genres. From timeless
          classics to modern masterpieces, find your perfect read today.
        </p>

        <a
          href="#books"
          onClick={() => setIsVisible(false)}
          className="block w-full bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          get a book
        </a>
      </div>
    </div>
  );
};

export default PopupAd;
