import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import Banner from '../components/Bannner';
import Footer from '../components/Footer';
import BookList from '../components/BookList';
// import Banner from '../components/Banner';
// import Footer from '../components/Footer';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);

  const booksPerPage = 10;

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://gutendex.com/books');
      const data = await response.json();
      setBooks(data.results);
      setFilteredBooks(data.results);
    };
    fetchBooks();
  }, []);

  console.log(books)

  const toggleWishlist = (bookId) => {
    let updatedWishlist = [...wishlist];
    if (wishlist.includes(bookId)) {
      updatedWishlist = updatedWishlist.filter(id => id !== bookId);
    } else {
      updatedWishlist.push(bookId);
    }
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const currentBooks = filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

  return (
    <div>
      <Banner />
      {/* <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBooks.map(book => (
            <BookCard key={book.id} book={book} onWishlistToggle={toggleWishlist} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredBooks.length / booksPerPage)}
          onPageChange={setCurrentPage}
        />
      </div> */}
      <BookList/>
      
    </div>
  );
};

export default Home;
