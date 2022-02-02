import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../app/store";
import { updateCompanySlice } from "../../features/companySlice/companySlice";
interface Props {
  show: boolean;
  handleCloseProp: any;
  payload: any;
  updateId: any;
  companyName: string;
}
function UpdateCompany(props: Props) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");
  useEffect(() => {
    setName(props.companyName);
  }, [props.companyName]);
  //   submit form
  const onSubmit = () => {
    const data: any = {
      name: name,
      id: props.updateId,
    };
    dispatch(updateCompanySlice(data)).then((res: any) => {
      setName("");
      props.handleCloseProp();
      props.payload(res.payload.update);
    });
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={onSubmit}>
              Update
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

export default UpdateCompany;
