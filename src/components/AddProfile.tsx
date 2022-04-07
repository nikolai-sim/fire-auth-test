import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function AddProfile() {
  const navigate = useNavigate();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lasNameRef = useRef<HTMLInputElement>(null);
  const starSignRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await setDoc(doc(db, "users", currentUser!.uid), {
        firstName: firstNameRef.current?.value,
        lastName: lasNameRef.current?.value,
        starSign: starSignRef.current?.value,
        email: currentUser?.email,
        uid: currentUser?.uid,
      });
      navigate("/");
      console.log("Document written with ID: ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="First Name">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="string" ref={firstNameRef} required />
            </Form.Group>
            <Form.Group id="Last Name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="string" ref={lasNameRef} required />
            </Form.Group>
            <Form.Group id="star-sign">
              <Form.Label>Star Sign</Form.Label>
              <Form.Control type="string" ref={starSignRef} required />
            </Form.Group>
            <Form.Group>
              <Button className="w-100 mt-2" type="submit" disabled={loading}>
                Add Profile
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <div className="wd-100 text-center mt-2">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </>
  );
}
