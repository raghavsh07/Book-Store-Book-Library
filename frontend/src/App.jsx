import { Route, Routes } from "react-router-dom";
import CreateBook from "./pages/CreateBook.jsx";
import EditBook from "./pages/EditBook.jsx";
import DeleteBook from "./pages/DeleteBook.jsx";
import ShowBook from "./pages/ShowBook.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
      <Route path="/books/show/:id" element={<ShowBook />} />
    </Routes>
  );
}

export default App;
