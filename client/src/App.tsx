import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Accounts from "./components/Admin/Accounts"
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import './index.css';

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/Tourists" element={<Accounts />} />
         
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
