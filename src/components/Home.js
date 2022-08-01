import React from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Container className="d-flex justify-content-md-between flex-md-row justify-content-sm-center flex-sm-column gap-2">
        <Container>
          <Image
            src="https://blog.prep.works/wp-content/uploads/2020/04/PrepWorks-Mentorship-Program-1.png"
            fluid
          ></Image>
        </Container>
        <Container className="d-flex flex-column justify-content-center align-items-center gap-4">
          <Container className="d-flex justify-content-center align-items-center">
            <Button variant="success">
              <Nav.Link as={Link} to="/student">
                Create Student
              </Nav.Link>
            </Button>
          </Container>
          <Container className="d-flex justify-content-center align-items-center">
            <Button variant="dark">
              <Nav.Link as={Link} to="/mentor">
                Create Mentor
              </Nav.Link>
            </Button>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default Home;
