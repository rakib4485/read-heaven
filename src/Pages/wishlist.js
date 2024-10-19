import React, { useEffect, useState } from 'react';
import NoDataFound from '../components/NoDataFound'; // Import the NoDataFound component
import WishlistBanner from '../components/WishListBanner'; // Import the WishlistBanner component
import Loading from '../components//Loading'; // Import the Loading component

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch wishlist from localStorage on component mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  // Fetch book details from the API based on wishlist IDs
  useEffect(() => {
    const fetchWishlistBooks = async () => {
      setLoading(true); // Set loading to true before fetching
      const fetchedBooks = [];

      for (const bookId of wishlist) {
        const response = await fetch(`https://gutendex.com/books/${bookId}`);
        if (response.ok) {
          const bookData = await response.json();
          fetchedBooks.push(bookData);
        }
      }

      setBooks(fetchedBooks);
      setLoading(false); // Set loading to false after fetching
    };

    if (wishlist.length > 0) {
      fetchWishlistBooks();
    } else {
      setLoading(false); // If wishlist is empty, set loading to false
    }
  }, [wishlist]);

  const removeFromWishlist = (bookId) => {
    const updatedWishlist = wishlist.filter(id => id !== bookId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // Render loading indicator if still fetching
  if (loading) return <Loading />; // Use the Loading component

  // Render no data found if wishlist is empty
  if (wishlist.length === 0) return <NoDataFound />;

  return (
    <div>
      <WishlistBanner /> {/* Add the banner here */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src={book.formats['image/jpeg']} alt={book.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-700">Author: {book.authors.map(author => author.name).join(', ')}</p>
                <p className="text-gray-700">Genre: {book.subjects.join(', ')}</p>
                <p className="text-gray-700">ID: {book.id}</p>
                <button
                  onClick={() => removeFromWishlist(book.id)}
                  className="mt-2 text-red-500 hover:text-red-700 transition duration-300"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
