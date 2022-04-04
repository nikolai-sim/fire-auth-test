import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function PrivateRoute({ element: Element, ...rest }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Element {...props} /> : navigate("/login");
      }}
    />
  );
}
