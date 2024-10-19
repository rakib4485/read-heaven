import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://gutendex.com/books/${id}`);
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!book) {
    return <div className="text-center py-10">No book found!</div>;
  }

  return (
    <div>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start">
          <img
            src={book.formats['image/jpeg']}
            alt={book.title}
            className="w-full md:w-1/3 object-cover mb-4 md:mb-0"
          />
          <div className="md:ml-6">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <p className="text-xl mb-2">
              Author: {book.authors.map((author) => author.name).join(', ')}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Genre: {book.subjects.join(', ') || 'Unknown'}
            </p>
            <p className="text-base leading-relaxed mb-4">
              {book.description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookDetails;
