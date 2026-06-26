import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function BackButton({ destination = "/" }) {
  return (
    <div className="back-button-wrapper">
      <Link to={destination} className="back-button">
        <AiOutlineArrowLeft className="back-icon" />
        Back
      </Link>
    </div>
  );
}
