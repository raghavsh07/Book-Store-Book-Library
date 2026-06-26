import { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton.jsx";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";

export default function ShowBook() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:5555/api/books/${id}`,
        );

        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  return (
    <div className="showbook-container">
      <BackButton destination="/" />

      {loading ? (
        <div className="showbook-spinner">
          <Spinner />
        </div>
      ) : book ? (
        <div className="book-details-card">
          <h1 className="book-title">{book.title}</h1>

          <div className="book-info">
            <span className="info-label">Author:</span>
            <span>{book.author}</span>
          </div>

          <div className="book-info">
            <span className="info-label">Publish Year:</span>
            <span>{book.publish_year}</span>
          </div>
        </div>
      ) : (
        <p className="not-found-message">Book not found.</p>
      )}
    </div>
  );
}
