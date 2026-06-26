import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

export default function DeleteBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleDeleteBook = async () => {
    try {
      setLoading(true);

      await axios.delete(`http://localhost:5555/api/books/${id}`);

      navigate("/");
    } catch (error) {
      console.error("Error deleting book:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deletebook-container">
      <BackButton destination="/" />

      <div className="deletebook-card">
        <h1 className="deletebook-title">Delete Book</h1>

        <p className="deletebook-message">
          Are you sure you want to delete this book?
        </p>

        {loading ? (
          <div className="deletebook-spinner">
            <Spinner />
          </div>
        ) : (
          <button className="deletebook-btn" onClick={handleDeleteBook}>
            Delete Book
          </button>
        )}
      </div>
    </div>
  );
}
