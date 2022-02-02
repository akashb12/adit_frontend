import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../app/store";
import { updateEmployee } from "../../features/employeeSlice/employeeSlice";
interface Props {
  show: boolean;
  handleCloseProp: any;
  payload: any;
  data: any;
}
interface Idata {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  companyId: number;
  roleId: number;
}
function UpdateEmployee(props: Props) {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Idata>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    companyId: 0,
    roleId: 0,
  });
  useEffect(() => {
    setData({
      id: props.data.id,
      firstName: props.data.firstName,
      lastName: props.data.lastName,
      email: props.data.email,
      companyId: props.data.companyId,
      roleId: props.data.roleId,
    });
  }, [props.data]);
  //   submit form
  const onSubmit = () => {
    dispatch(updateEmployee(data)).then((res: any) => {
      props.handleCloseProp();

      props.payload(res.payload.update);
    });
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevState: Idata) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div>
      <Modal show={props.show} onHide={props.handleCloseProp} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                <option selected={data.roleId == 1} value={1}>
                  Manager
                </option>
                <option selected={data.roleId == 2} value={2}>
                  Admin
                </option>

                <option selected={data.roleId == 3} value={3}>
                  Developer
                </option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" onClick={onSubmit}>
              Submit
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              variant="secondary"
              onClick={props.handleCloseProp}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateEmployee;
