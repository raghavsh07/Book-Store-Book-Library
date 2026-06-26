import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable.jsx";
import BooksCard from "../components/home/BooksCard.jsx";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("table");

  async function fetchBooks() {
    try {
      setLoading(true);

      const response = await axios.get("http://localhost:5555/api/books");

      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="home-container">
      <div className="view-switch">
        <button
          className={`view-btn ${viewMode === "table" ? "active-view" : ""}`}
          onClick={() => setViewMode("table")}
        >
          Table View
        </button>

        <button
          className={`view-btn ${viewMode === "card" ? "active-view" : ""}`}
          onClick={() => setViewMode("card")}
        >
          Card View
        </button>
      </div>

      <div className="home-header">
        <h1 className="home-title">Book List</h1>

        <Link to="/books/create" className="add-book-btn">
          <MdOutlineAddBox className="add-icon" />
          Add Book
        </Link>
      </div>

      {loading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : viewMode === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
}
