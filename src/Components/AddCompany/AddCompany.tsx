import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../app/store";
import {
  createCompanySlice,
  updateCompanySlice,
} from "../../features/companySlice/companySlice";
interface Props {
  show: boolean;
  handleCloseProp: any;
  payload: any;
}
function AddCompany(props: Props) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");
  const [error, setError] = useState("");

  //   submit form
  const onSubmit = () => {
    const data: any = {
      name: name,
    };
    if (data.name) {
      dispatch(createCompanySlice(data)).then((res: any) => {
        setName("");
        if (res.payload) {
          props.handleCloseProp();
          setError("");
          props.payload(res.payload.create);
        } else {
          setError(
            res.error.message == "Request failed with status code 409"
              ? "Company Already Exist"
              : res.error.message
          );
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      });
    } else {
      setError("All Fields Are Mandatory");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  const closeModal = () => {
    props.handleCloseProp();
    setError("");
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
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

export default AddCompany;
