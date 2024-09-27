import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Tourists from "./components/Admin/Tourists"
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import './index.css';

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/Tourists" element={<Tourists />} />
         
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
