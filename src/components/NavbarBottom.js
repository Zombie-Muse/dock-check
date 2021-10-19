import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Container, Nav, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const NavbarBottom = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("You even failed to logout! Go think about what you've done.");
    }
  }

  return (
    <Navbar bg="light" fixed="bottom">
      <Container>
        {currentUser ? (
          <Nav className="me-auto my-4 justify-content-center">
            <Nav.Item>
              <Nav.Link href="/">Dock Layout</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/history">Door History</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/notes">App Updates</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/" onClick={handleLogout}>
                {error && <Alert variant="danger">{error}</Alert>}
                Log Out
              </Nav.Link>
              {/* <Button variant="link" onClick={handleLogout}>
                {error && <Alert variant="danger">{error}</Alert>}
                Logout
              </Button> */}
            </Nav.Item>
            {/* <Nav.Item>
            <Nav.Link href="/add">Add Door</Nav.Link>
          </Nav.Item> */}
          </Nav>
        ) : (
          <Nav>
            <Nav.Item>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/notes">App Updates</Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarBottom;
