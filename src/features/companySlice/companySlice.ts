import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../../axios/axiosRequest";

// create company
export const createCompanySlice = createAsyncThunk(
  "company/createCompanySlice",
  async (data: any) => {
    const createCompany = await axiosRequest
      .post("/company/create", data)
      .then((res) => res.data);
    return createCompany;
  }
);

// get company
export const getCompanySlice = createAsyncThunk(
  "company/getCompanySlice",
  async () => {
    const getCompany = await axiosRequest
      .get("/company/get")
      .then((res) => res.data);
    return getCompany;
  }
);

// update company
export const updateCompanySlice = createAsyncThunk(
  "company/updateCompanySlice",
  async (data: any) => {
    const { name, id } = data;
    const updateCompany = await axiosRequest
      .put("/company/update/" + id, { name: name })
      .then((res) => res.data);
    return updateCompany;
  }
);

export const deleteCompanySlice = createAsyncThunk(
  "company/deleteCompanySlice",
  async (id: number) => {
    const deleteCompany = await axiosRequest
      .delete("/company/delete/" + id)
      .then((res) => res.data);
    return deleteCompany;
  }
);
export const companySlice = createSlice({
  name: "users",
  initialState: {
    createCompanyData: {},
    getCompanyData: {},
    deleteCompanyData: {},
    updateCompanyData: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCompanySlice.fulfilled, (state, { payload }) => {
      const data = payload;
      state.createCompanyData = data;
    });
    builder.addCase(getCompanySlice.fulfilled, (state, { payload }) => {
      const data = payload;
      state.getCompanyData = data;
    });
    builder.addCase(deleteCompanySlice.fulfilled, (state, { payload }) => {
      const data = payload;
      state.deleteCompanyData = data;
    });
    builder.addCase(updateCompanySlice.fulfilled, (state, { payload }) => {
      const data = payload;
      state.updateCompanyData = data;
    });
  },
});
export default companySlice.reducer;
