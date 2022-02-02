import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../../axios/axiosRequest";

// create employee
export const createEmployee = createAsyncThunk(
  "company/createEmployee",
  async (data: any) => {
    const createEmployee = await axiosRequest
      .post("/employee/create", data)
      .then((res) => res.data);
    return createEmployee;
  }
);

// get employee
export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async (data: any) => {
    const getEmployees = await axiosRequest
      .post(`/employee/get/${data.id}`, data)
      .then((res) => res.data);
    console.log(getEmployees);
    return getEmployees;
  }
);

// // update company
export const updateEmployee = createAsyncThunk(
  "company/updateEmployee",
  async (data: any) => {
    const updateEmployee = await axiosRequest
      .put("/employee/update/" + data.id, data)
      .then((res) => res.data);
    return updateEmployee;
  }
);

export const deleteEmployee = createAsyncThunk(
  "company/deleteEmployee",
  async (id: number) => {
    const deleteEmployee = await axiosRequest
      .delete("/employee/delete/" + id)
      .then((res) => res.data);
    return deleteEmployee;
  }
);
export const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    getEmployeesData: {},
    createEmployeeData: {},
    deleteEmployeeData: {},
    updateEmployeeData: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createEmployee.fulfilled, (state, { payload }) => {
      const data = payload;
      state.createEmployeeData = data;
    });
    builder.addCase(getEmployees.fulfilled, (state, { payload }) => {
      const data = payload;
      state.getEmployeesData = data;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, { payload }) => {
      const data = payload;
      state.deleteEmployeeData = data;
    });
    builder.addCase(updateEmployee.fulfilled, (state, { payload }) => {
      const data = payload;
      state.updateEmployeeData = data;
    });
  },
});
export default employeeSlice.reducer;
