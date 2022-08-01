import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignMentor = () => {
  const API_URL = "https://student-mentor-server.herokuapp.com";

  const [values, setValues] = useState({
    students: [],
    mentors: [],
  });

  const [selected, setSelected] = useState({
    student: "",
    mentor: "",
  });

  useEffect(() => {
    const getStudents = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/student`);
        const response = data.data;
        const filtered = data.data.filter((ele) => ele.hasMentor !== true);
        setValues((prevData) => ({ ...prevData, students: filtered }));
      } catch (err) {
        console.error(err);
      }
    };

    const getMentors = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/mentor`);
        const response = data.data;
        setValues((prevData) => ({ ...prevData, mentors: response }));
      } catch (err) {
        console.error(err);
      }
    };

    getStudents();
    getMentors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    assignMentor(selected);
  };

  const assignMentor = async (selected) => {
    const selectedStudent = selected.student;
    const selectedMentor = selected.mentor;

    const studentId = values.students.filter(
      (ele) => ele.name === selectedStudent
    );
    const mentorId = values.mentors.filter(
      (ele) => ele.name === selectedMentor
    );
    const info = {
      mentorInfo: "",
    };
    info.mentorInfo = mentorId[0]._id;

    const sId = studentId[0]._id;

    try {
      const { data } = await axios.patch(`${API_URL}/student/${sId}`, info);
      toast.success("Mentor assigned successfully!");
    } catch (err) {
      toast.error(" Check request again!");
    }
  };

  return (
    <>
      <ToastContainer />
      <Container className="d-flex justify-content-center align-items-center flex-column p-4 gap-3">
        <Container className="d-flex justify-content-center align-items-center flex-column">
          <p style={{ color: "crimson", fontWeight: 500 }}>
            Select one Student
          </p>
          {values.students.length !== 0 ? (
            <Form.Select
              aria-label="Assignment-Student"
              value={selected.student}
              onChange={handleChange}
              name="student"
              style={{ fontSize: 14, padding: 6, width: "120px" }}
            >
              <option value="Select one">Select One</option>
              {values.students.map((ele, i) => (
                <option value={ele.name}>{ele.name}</option>
              ))}
            </Form.Select>
          ) : (
            <p>
              All the existing students already have mentors assigned to them.
            </p>
          )}
        </Container>
        <Container className="d-flex justify-content-center align-items-center flex-column">
          <p style={{ color: "crimson", fontWeight: 500 }}>Select one Mentor</p>
          <Form.Select
            aria-label="Assignment-Mentor"
            value={selected.mentor}
            onChange={handleChange}
            name="mentor"
            style={{ fontSize: 14, padding: 6, width: "120px" }}
          >
            <option value="Select one">Select One</option>
            {values.mentors.map((ele, i) => (
              <option value={ele.name}>{ele.name}</option>
            ))}
          </Form.Select>
        </Container>
        <Button variant="success" onClick={handleSubmit} type="submit">
          Assign
        </Button>
      </Container>
    </>
  );
};

export default AssignMentor;
