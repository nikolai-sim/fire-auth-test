import { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard() {
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");
  const [userData, setUserData] = useState<DocumentData>();
  const { currentUser, logout } = useAuth();

  async function getUser(user: string) {
    const docRef = doc(db, "users", user!);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    currentUser && getUser(currentUser.uid);
  }, []);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to Log Out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>First Name: </strong>
          {userData && userData.firstName}
          <br />
          <strong>Last Name:</strong>
          {userData && userData.lastName}
          <br />
          <strong>Star Sign:</strong>
          {userData && userData.starSign}
          <br />
          <strong>Email: </strong>
          {currentUser?.email}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
