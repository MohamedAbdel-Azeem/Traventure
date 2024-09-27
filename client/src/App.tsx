import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import './index.css';

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
         
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
