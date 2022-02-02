import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CompanyDetails from "./Components/Company/CompanyDetails";
const Company = lazy(() => import("./Components/Company/Company"));
function App() {
  return (
    <div className="App" id="App">
      <Router>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path="/" element={<Company />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
