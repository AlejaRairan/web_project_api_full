import { Navigate } from "react-router-dom";

export default function RedirectIfLoggedIn({ isLoggedIn, children }) {
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}