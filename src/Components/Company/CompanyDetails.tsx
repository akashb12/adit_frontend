import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import { useAppDispatch } from "../../app/store";
import {
  deleteEmployee,
  getEmployees,
} from "../../features/employeeSlice/employeeSlice";
import "./Company.css";
import AddEmployees from "../AddEmployees/AddEmployees";
import UpdateEmployee from "../UpdateEmployee/UpdateEmployee";
import EmptyDiv from "../EmptyDiv/EmptyDiv";
interface Idata {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  companyId: number;
  roleId: number;
}
export default function CompanyDetails() {
  const [employees, setEmployees] = useState<Idata[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [roleId, setRoleId] = useState("");
  const [data, setData] = useState<Idata>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    companyId: 0,
    roleId: 0,
  });
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    const data = {
      id: id,
      roleId: roleId,
    };
    dispatch(getEmployees(data)).then((res: any) => {
      setEmployees(res.payload.get.employees);
      setCompanyName(res.payload.get.name);
    });
  }, [roleId]);

  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleShowUpdate = (item: any) => {
    setShowUpdate(true);
    setData({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      companyId: item.companyId,
      roleId: item.roleId,
    });
  };
  const handleCloseAdd = () => setShowAdd(false);
  const handleCloseUpdate = () => setShowUpdate(false);

  const deleteEmployeeData = (id: number) => {
    dispatch(deleteEmployee(id)).then((res: any) => {
      if (res.payload) {
        const arr = employees.filter((item: any) => item.id !== id);
        setEmployees(arr);
      }
    });
  };
  return (
    <div className="company-details">
      <h1 style={{ textAlign: "center" }}>{companyName}</h1>
      <div>
        <Button
          className="add"
          variant="primary"
          onClick={() => handleShowAdd()}>
          Add Employees
        </Button>
        <Link
          style={{ marginLeft: "10px" }}
          to="/"
          type="button"
          className="add btn btn-primary">
          Go Back
        </Link>
        <Form.Select
          style={{ marginBottom: "10px" }}
          size="sm"
          name="roleId"
          onChange={(e) => setRoleId(e.target.value)}>
          <option selected value="">
            All Roles
          </option>
          <option value={1}>Manager</option>
          <option value={2}>Admin</option>

          <option value={3}>Developer</option>
        </Form.Select>
        <AddEmployees
          show={showAdd}
          id={id}
          handleCloseProp={() => handleCloseAdd()}
          payload={(data: any) => {
            setEmployees([...employees, data]);
          }}
        />

        <UpdateEmployee
          show={showUpdate}
          handleCloseProp={() => handleCloseUpdate()}
          payload={(data: any) => {
            const index = employees.findIndex(({ id }) => id === data.id);
            if (index === -1) {
              setEmployees([...employees, data]);
            } else {
              const tempArr = [...employees];
              tempArr[index] = data;
              setEmployees(tempArr);
            }
          }}
          data={data}
        />
      </div>
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((item: any, key: number) => {
                return (
                  <tr key={key}>
                    <th scope="row">{item.id}</th>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.role.name}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShowUpdate(item)}>
                        Edit
                      </Button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteEmployeeData(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        {employees.length == 0 && <EmptyDiv />}
      </div>
    </div>
  );
}
