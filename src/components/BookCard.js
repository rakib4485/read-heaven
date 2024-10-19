import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book, onWishlistToggle }) => {
  return (
    <Link to={book.id}>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition-transform duration-300">
      <img src={book.formats['image/jpeg']} alt={book.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-xl">{book.title}</h3>
        <p className="text-gray-700">{book.authors.map(author => author.name).join(', ')}</p>
        <p className="text-sm text-gray-500">Genre: {book.subjects.join(', ') || 'Unknown'}</p>
        <button
          className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
          onClick={() => onWishlistToggle(book.id)}
        >
          ❤ Wishlist
        </button>
      </div>
    </div>
    </Link>
  );
};

export default BookCard;
