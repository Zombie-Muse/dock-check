import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Card, Form, Button, Container } from "react-bootstrap";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
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
              <Card.Title className="text-center mb-4">Sign Up</Card.Title>
              <Form onSubmit={handleSubmit}>
                {error && <p className="">{error}</p>}
                <Form.Group className="mt-4">
                  <Form.Label>Email: </Form.Label>

                  <Form.Control
                    id="email"
                    type="email"
                    ref={emailRef}
                    required
                  />
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Label>Password: </Form.Label>

                  <Form.Control
                    id="password"
                    type="password"
                    ref={passwordRef}
                  />
                  {error && (
                    <p className="text-red-500 text-xs italic ">
                      Please choose a password.
                    </p>
                  )}
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Label htmlFor="confirm-password">
                    Confirm Password:
                  </Form.Label>
                  <Form.Control
                    id="confirm-password"
                    type="password"
                    ref={passwordConfirmRef}
                  />
                  {error && (
                    <p className="text-red-500 text-xs italic">
                      Please confirm your password.
                    </p>
                  )}
                </Form.Group>
                <Button
                  disabled={loading}
                  className="w-100 mt-4"
                  type="submit"
                  onSubmit={handleSubmit}
                >
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <div className="w-100 text-center mt-2">
            <p>Already have an account?</p>
          </div>
          <div className="text-center">
            <Link to="/login">Log In</Link>
          </div>
        </div>
      </Container>
    </AuthProvider>
  );
}
