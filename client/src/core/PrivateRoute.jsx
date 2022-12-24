import { Navigate } from "react-router-dom";

function isAuthenticated() {
  const token = JSON.parse(localStorage.getItem("user" || "{}"));
  if (token) {
    return token.encode.role === 0 ? true : false;
  }
}
export function privateRoute(Wrapped) {
  return (props) => (isAuthenticated() ? <Wrapped /> : <Navigate to="/" />);
}
