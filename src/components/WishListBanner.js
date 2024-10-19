import React from 'react';
import banner from '../assets/wishlist-banner.mp4'

const WishlistBanner = () => {
  return (
    <div className="relative w-full h-64">
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
      <div className="relative flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold mb-2 animate__animated animate__fadeIn">My Wishlist</h1>
        <p className="text-lg animate__animated animate__fadeIn">Discover the books you love!</p>
      </div>
    </div>
  );
};

export default WishlistBanner;
