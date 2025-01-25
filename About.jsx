import React, { useState, useEffect } from 'react';

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    "https://images.pexels.com/photos/1181571/pexels-photo-1181571.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.pexels.com/photos/8653640/pexels-photo-8653640.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 8000);

    return () => clearInterval(carouselTimer);
  }, [carouselImages.length]);

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-64 md:h-full">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Courier New, monospace' }}>
              about archives digital
            </h2>
            <p className="text-gray-600 mb-4">
              Welcome to Archives Digital, where knowledge meets innovation. Our digital library 
              brings together centuries of literary excellence with modern technology.
            </p>
            <p className="text-gray-600">
              Founded with the mission to make literature accessible to everyone, we offer a 
              carefully curated collection of classics, contemporary works, and everything in 
              between. Join us in our journey to keep the love of reading alive in the digital age.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
