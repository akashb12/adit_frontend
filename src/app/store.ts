import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import company from "../features/companySlice/companySlice";
import employees from "../features/employeeSlice/employeeSlice";
export const store = configureStore({
  reducer: {
    company: company,
    employees: employees,
  },
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
