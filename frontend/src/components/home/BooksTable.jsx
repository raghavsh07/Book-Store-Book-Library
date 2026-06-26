import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";

export default function BooksTable({ books }) {
  return (
    <table className="books-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Author</th>
          <th>Publish Year</th>
          <th>Operations</th>
        </tr>
      </thead>

      <tbody>
        {books.map((book, index) => (
          <tr key={book.id}>
            <td>{index + 1}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publish_year}</td>

            <td>
              <div className="table-actions">
                <Link
                  to={`/books/show/${book.id}`}
                  className="icon-btn info-btn"
                >
                  <BsInfoCircle />
                </Link>

                <Link
                  to={`/books/edit/${book.id}`}
                  className="icon-btn edit-btn"
                >
                  <AiOutlineEdit />
                </Link>

                <Link
                  to={`/books/delete/${book.id}`}
                  className="icon-btn delete-btn"
                >
                  <AiOutlineDelete />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
