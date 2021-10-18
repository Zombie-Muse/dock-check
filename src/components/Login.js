import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to sign in. You're a failure.");
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
              <Card.Title className="text-center mb-4">Log In</Card.Title>
              <Form className="" onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group className="mt-4">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    id="email"
                    type="email"
                    ref={emailRef}
                    required
                  />
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    className=""
                    id="password"
                    type="password"
                    ref={passwordRef}
                  />
                  {error && <p className="">Please enter a password.</p>}
                </Form.Group>

                <Button
                  disabled={loading}
                  className="w-100 mt-4"
                  type="submit"
                  onSubmit={handleSubmit}
                >
                  Log In
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="text-center mt-2">
            <p className="">New user? Sign up here!</p>
          </div>
          <div className="text-center">
            <Link to="/signup" className="">
              Sign Up
            </Link>
          </div>
        </div>
      </Container>
    </AuthProvider>
  );
}
