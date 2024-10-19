import React, { useEffect, useState } from 'react';
import Loading from './Loading'; // Import the Loading component
import NoDataFound from './NoDataFound'; // Import the NoDataFound component

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6; // Number of books per page

  // Fetch data from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://gutendex.com/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data.results); // Update state with fetched books
        setFilteredBooks(data.results); // Set initial filtered books
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchBooks();
  }, []);

  // Handle search term change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterBooks(e.target.value, selectedGenre);
  };

  // Handle genre selection change
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    filterBooks(searchTerm, e.target.value);
  };

  // Filter books based on title and genre
  const filterBooks = (search, genre) => {
    let filtered = books;

    if (search) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (genre) {
      filtered = filtered.filter((book) =>
        book.subjects.includes(genre)
      );
    }

    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Manage wishlist
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const toggleWishlist = (bookId) => {
    const updatedWishlist = wishlist.includes(bookId)
      ? wishlist.filter((id) => id !== bookId)
      : [...wishlist, bookId];

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Render loading, error message, or no data found
  if (loading) return <Loading />; // Use the loading component
  if (error) return <div>Error: {error}</div>;
  if (filteredBooks.length === 0) return <NoDataFound />; // Show No Data Found component

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Book List</h1>
      
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearch}
        className="border rounded p-2 mb-4 w-full"
      />
      
      {/* Genre Filter Dropdown */}
      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        className="border rounded p-2 mb-4 w-full md:w-1/4"
      >
        <option value="">All Genres</option>
        {/* Map unique genres from books for dropdown options */}
        {[...new Set(books.flatMap(book => book.subjects))].map((genre, index) => (
          <option key={index} value={genre}>{genre}</option>
        ))}
      </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={book.formats['image/jpeg']} alt={book.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-700">Author: {book.authors.map(author => author.name).join(', ')}</p>
              <p className="text-gray-700">Genre: {book.subjects.join(', ')}</p>
              <p className="text-gray-700">ID: {book.id}</p>
              <button
                onClick={() => toggleWishlist(book.id)}
                className={`mt-2 ${wishlist.includes(book.id) ? 'text-red-500' : 'text-gray-500'}`}
              >
                {wishlist.includes(book.id) ? '❤️' : '🤍'} {/* Heart icon for wishlist */}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="mx-1 px-3 py-1 bg-gray-300 rounded"
          >
            Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="mx-1 px-3 py-1 bg-gray-300 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default BookList;
