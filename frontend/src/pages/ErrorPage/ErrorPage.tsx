import "./ErrorPage.scss";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-code">404</h1>
      <h2 className="error-title">Page not found</h2>
      <p className="error-text">The page you’re looking for doesn’t exist or has been moved.</p>
      <Link to="/" className="error-btn">
        Back to Home
      </Link>
    </div>
  );
};
