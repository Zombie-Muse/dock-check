import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Card, Form, Button, Container } from "react-bootstrap";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions.");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Password Reset
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                {error && (
                  <p className="text-red-500 text-sm italic pb-2 ">{error}</p>
                )}
                <Form.Label>Email:</Form.Label>
                <Form.Control id="email" type="text" ref={emailRef} required />

                <Button
                  disabled={loading}
                  className="w-100 mt-4"
                  type="submit"
                  onSubmit={handleSubmit}
                >
                  Reset Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/login">Log In</Link>
          </div>
          <p>{message}</p>
          <div className="w-100 text-center mt-2">
            <p>New user? Sign up here!</p>
          </div>
          <div className="w-100 text-center">
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </Container>
    </AuthProvider>
  );
}
