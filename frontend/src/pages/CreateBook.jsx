import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveBook = async () => {
    try {
      setLoading(true);

      const newBook = {
        title,
        author,
        publishYear,
      };

      await axios.post("http://localhost:5555/api/books", newBook);

      navigate("/");
    } catch (error) {
      console.error("Error saving book:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createbook-container">
      <BackButton destination="/" />

      <h1 className="createbook-title">Create Book</h1>

      {loading ? (
        <div className="createbook-spinner">
          <Spinner />
        </div>
      ) : (
        <div className="createbook-form">
          <div className="form-group">
            <label className="form-label">Title</label>

            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Author</label>

            <input
              type="text"
              className="form-input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Publish Year</label>

            <input
              type="number"
              className="form-input"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              placeholder="Enter publish year"
            />
          </div>

          <button
            className="createbook-btn"
            onClick={handleSaveBook}
            disabled={loading}
          >
            Save Book
          </button>
        </div>
      )}
    </div>
  );
}
