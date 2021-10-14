import { Navbar, Container, Nav } from "react-bootstrap";

const NavbarBottom = () => {
  return (
    <Navbar bg="light" fixed="bottom">
      <Container>
        <Nav className="me-auto my-4 justify-content-center">
          <Nav.Item>
            <Nav.Link href="/">Dock Layout</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/history">Door History</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/notes">Notes</Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link href="/add">Add Door</Nav.Link>
          </Nav.Item> */}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarBottom;
