import React from 'react';
import banner from '../assets/banner.mp4'

const Banner = () => {
  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src={banner}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Banner Content */}
      <div className="relative flex items-center justify-center h-full">
        <div className="text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate__animated animate__fadeInDown">
            Welcome to BookScout
          </h1>
          <p className="text-lg md:text-xl mb-6 animate__animated animate__fadeInUp">
            Discover your next favorite book and start your reading journey today!
          </p>
          <a
            href="#"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-500 transition duration-300 animate__animated animate__bounceIn"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
