import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../app/store";
import { createEmployee } from "../../features/employeeSlice/employeeSlice";
interface Props {
  show: boolean;
  handleCloseProp: any;
  payload: any;
  id: any;
}
interface Idata {
  firstName: string;
  lastName: string;
  email: string;
  companyId: number;
  roleId: number;
}
function AddEmployees(props: Props) {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [data, setData] = useState<Idata>({
    firstName: "",
    lastName: "",
    email: "",
    companyId: props.id,
    roleId: 1,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevState: Idata) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const closeModal = () => {
    props.handleCloseProp();
    setError("");
  };
  //   submit form
  const onSubmit = () => {
    const { firstName, lastName, email, roleId } = data;
    if (firstName && lastName && email && roleId) {
      dispatch(createEmployee(data)).then((res: any) => {
        if (res.payload) {
          props.handleCloseProp();
          setError("");
          setData({
            firstName: "",
            lastName: "",
            email: "",
            companyId: props.id,
            roleId: 1,
          });
          props.payload(res.payload.create);
        } else {
          setError(
            res.error.message == "Request failed with status code 409"
              ? "Employee Already Exist"
              : res.error.message
          );
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      });
    } else {
      setError("all fields are mandatory");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div>
      <Modal show={props.show} onHide={closeModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{error}</p>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={data.firstName}
                placeholder="Enter First Name"
                name="firstName"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={data.lastName}
                placeholder="Enter Last Name"
                name="lastName"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={data.email}
                placeholder="Enter Email"
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Role</Form.Label>
              <Form.Select
                size="sm"
                name="roleId"
                onChange={(e) => handleChange(e)}>
                <option selected value={1}>
                  Manager
                </option>
                <option value={2}>Admin</option>

                <option value={3}>Developer</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" onClick={onSubmit}>
              Submit
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              variant="secondary"
              onClick={closeModal}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddEmployees;
