import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const { resetPassword } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current?.value);
      setSuccess(`A reset email has been sent to ${emailRef.current?.value}`);
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="secondary">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group>
              <Button className="w-100 mt-2" type="submit" disabled={loading}>
                Send Reset Email
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <div className="wd-100 text-center mt-2">
        Need an Account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
