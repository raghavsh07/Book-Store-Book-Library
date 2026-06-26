import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";

export default function BooksCard({ books }) {
  return (
    <div className="books-grid">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <h2 className="book-card-title">{book.title}</h2>

          <p className="book-card-text">
            <strong>Author:</strong> {book.author}
          </p>

          <p className="book-card-text">
            <strong>Year:</strong> {book.publish_year}
          </p>

          <div className="card-actions">
            <Link to={`/books/show/${book.id}`} className="icon-btn info-btn">
              <BsInfoCircle />
            </Link>

            <Link to={`/books/edit/${book.id}`} className="icon-btn edit-btn">
              <AiOutlineEdit />
            </Link>

            <Link
              to={`/books/delete/${book.id}`}
              className="icon-btn delete-btn"
            >
              <AiOutlineDelete />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
