import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

export default function EditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:5555/api/books/${id}`,
        );

        const { title, author, publish_year } = response.data;

        setTitle(title);
        setAuthor(author);
        setPublishYear(publish_year);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  const handleEditBook = async () => {
    try {
      setLoading(true);

      const updatedBook = {
        title,
        author,
        publishYear,
      };

      await axios.put(`http://localhost:5555/api/books/${id}`, updatedBook);

      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editbook-container">
      <BackButton destination="/" />

      <h1 className="editbook-title">Edit Book</h1>

      {loading ? (
        <div className="editbook-spinner">
          <Spinner />
        </div>
      ) : (
        <div className="editbook-form">
          <div className="form-group">
            <label className="form-label">Title</label>

            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Author</label>

            <input
              type="text"
              className="form-input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Publish Year</label>

            <input
              type="number"
              className="form-input"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>

          <button
            className="save-btn"
            onClick={handleEditBook}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Book"}
          </button>
        </div>
      )}
    </div>
  );
}
