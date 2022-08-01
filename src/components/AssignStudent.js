import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Button, Container, FormCheck, ToggleButton } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignStudent = () => {
  const API_URL = "https://student-mentor-server.herokuapp.com";

  const history = useHistory();
  const [values, setValues] = useState({
    students: [],
    mentors: [],
  });

  const [selected, setSelected] = useState({
    mentor: "Select Mentor",
  });

  const [userinfo, setUserInfo] = useState({
    students: [],
    response: [],
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
    // Destructuring
    const { value, checked } = e.target;
    const { students } = userinfo;

    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        students: [...students, value],
        response: [...students, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        students: students.filter((e) => e !== value),
        response: students.filter((e) => e !== value),
      });
    }
  };

  const handleMentorChange = (e) => {
    const { name, value } = e.target;
    setSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    assignStudents(selected, userinfo);
  };

  const assignStudents = async (selected, userinfo) => {
    const selectedMentor = selected.mentor;
    const selectedStudents = userinfo.students;

    const mentorId = values.mentors.filter(
      (ele) => ele.name === selectedMentor
    );
    const mId = mentorId[0]._id;

    const stu = selectedStudents.map((sel) =>
      values.students.filter((ele) => ele.name === sel)
    );
    const stuValues = stu.map((ele) => ele[0]._id);
    const info = {
      studentInfo: [],
    };
    info.studentInfo = stuValues;

    try {
      const { data } = await axios.patch(`${API_URL}/mentor/${mId}`, info);
      toast.success("Student assigned successfully!");
    } catch (err) {
      toast.error(" Check request again!");
    }
  };

  return (
    <>
      <ToastContainer />
      <Container className="d-flex justify-content-center align-items-center flex-column p-4 gap-3 square border">
        <Container className="d-flex justify-content-center align-items-center flex-column">
          <p style={{ color: "crimson", fontWeight: 500 }}>Select one Mentor</p>
          <Form.Select
            aria-label="Assignment-Mentor"
            value={selected.mentor}
            onChange={handleMentorChange}
            name="mentor"
            style={{ fontSize: 14, padding: 6, width: "100px" }}
          >
            <option value="Select one">Select One</option>
            {values.mentors.map((ele, i) => (
              <option value={ele.name}>{ele.name}</option>
            ))}
          </Form.Select>
        </Container>
        <Container className="d-flex justify-content-center align-items-center flex-column">
          <p style={{ color: "crimson", fontWeight: 500 }}>
            Select one/more Students
          </p>
          {values.students.length !== 0 ? (
            <Form className="d-flex justify-content-center align-items-center flex-column">
              {values.students.map((ele, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  name="students"
                  value={ele.name}
                  onChange={handleChange}
                  label={ele.name}
                  style={{ fontSize: 14, padding: 6, width: "100px" }}
                />
              ))}
            </Form>
          ) : (
            <p>
              All the existing students already have mentors assigned to them.
            </p>
          )}
        </Container>

        <Button variant="success" onClick={handleSubmit} type="submit">
          Assign
        </Button>
      </Container>
    </>
  );
};

export default AssignStudent;
