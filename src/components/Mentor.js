import React, { useState } from "react";
import { Container, Form, Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mentor = () => {
  const [values, setValues] = useState({
    name: "",
  });

  const API_URL = "https://student-mentor-server.herokuapp.com";

  const handleChange = (e) => {
    const { value } = e.target;
    setValues({ name: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(values);
  };

  const createUser = async (values) => {
    axios
      .post(`${API_URL}/mentor`, values)
      // axios(config)
      .then((response) => {
        toast.success("Mentor created successfully!");
        // setTimeout(history.push("/"), 10000);
      })
      .catch(function (error) {
        if (error.response.data.includes(" Request failed"));
        toast.error(" Check request again!");
      });
    setTimeout(setValues({ name: "" }), 10000);
  };
  return (
    <>
      <ToastContainer />
      <Container className="mx-auto p-4">
        <Container className="d-flex justify-content-center align-items-center flex-column">
          <h3>Please enter a new Mentor name</h3>
          <Form className="d-flex justify-content-center align-items-center flex-column">
            <Form.Group className="m-3" controlId="name">
              <Form.Control
                type="text"
                htmlSize="50px"
                placeholder="Enter name"
                value={values.name}
                onChange={handleChange}
              />
            </Form.Group>
            <ButtonGroup className="d-flex flex-row gap-2">
              <Button variant="success" onClick={handleSubmit} type="submit">
                Create
              </Button>
              <Button variant="danger" as={Link} to="/">
                Cancel
              </Button>
            </ButtonGroup>
          </Form>
        </Container>
      </Container>
    </>
  );
};

export default Mentor;
