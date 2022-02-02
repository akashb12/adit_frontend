import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import {
  deleteCompanySlice,
  getCompanySlice,
} from "../../features/companySlice/companySlice";
import AddCompany from "../AddCompany/AddCompany";
import UpdateCompany from "../UpdateCompany/UpdateCompany";
import "./Company.css";
interface ICompany {
  id: number;
  name: string;
}
function Company() {
  const dispatch = useAppDispatch();
  const [Companies, setCompanies] = useState<ICompany[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateId, setupdateId] = useState();
  const [name, setName] = useState("");
  useEffect(() => {
    dispatch(getCompanySlice()).then((res: any) => {
      setCompanies(res.payload.get);
    });
  }, []);
  // close modal
  const handleCloseAdd = () => setShowAdd(false);
  const handleCloseUpdate = () => setShowUpdate(false);

  // open modal
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleShowUpdate = (item: any) => {
    setShowUpdate(true);
    setupdateId(item.id);
    setName(item.name);
  };

  // delete company
  const deleteCompany = (id: number) => {
    dispatch(deleteCompanySlice(id)).then((res: any) => {
      if (res.payload) {
        const arr = Companies.filter((item) => item.id !== id);
        setCompanies(arr);
      }
    });
  };
  return (
    <div className="company">
      <h1 style={{ textAlign: "center" }}>Company List</h1>
      <div>
        <Button
          className="add"
          variant="primary"
          onClick={() => handleShowAdd()}>
          Add Company
        </Button>
        <AddCompany
          show={showAdd}
          handleCloseProp={() => handleCloseAdd()}
          payload={(data: any) => {
            setCompanies([...Companies, data]);
          }}
        />
        <UpdateCompany
          show={showUpdate}
          handleCloseProp={() => handleCloseUpdate()}
          payload={(data: any) => {
            const index = Companies.findIndex(({ id }) => id === data.id);
            if (index === -1) {
              setCompanies([...Companies, data]);
            } else {
              const tempArr = [...Companies];
              tempArr[index] = data;
              setCompanies(tempArr);
            }
          }}
          updateId={updateId}
          companyName={name}
        />
      </div>
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">View</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {Companies &&
              Companies.map((item: any, key: number) => {
                return (
                  <tr key={key}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>
                      <Link
                        to={`/company/${item.id}`}
                        type="button"
                        className="btn btn-primary">
                        View
                      </Link>
                    </td>
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
                        onClick={() => deleteCompany(item.id)}
                        className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Company;
