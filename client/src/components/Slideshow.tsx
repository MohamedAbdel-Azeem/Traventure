import React, { useState, useEffect } from "react";

interface SlideItem {
  image: string;
  title: string;
}

interface SlideshowProps {
  items: SlideItem[];
}

const Slideshow: React.FC<SlideshowProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full sm:h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden rounded-xl group">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-shadow">
              {item.title}
            </h2>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 p-4 rounded-full text-white hover:bg-opacity-70 sm:text-lg md:text-xl lg:text-2xl opacity-0 group-hover:opacity-100 transition-all"
      >
        ❮
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 p-4 rounded-full text-white hover:bg-opacity-70 sm:text-lg md:text-xl lg:text-2xl opacity-0 group-hover:opacity-100 transition-all"
      >
        ❯
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
        {items.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full bg-white ${
              currentIndex === index ? "bg-opacity-100" : "bg-opacity-50"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
