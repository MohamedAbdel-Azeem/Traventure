import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewApp from "./NewApp";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<NewApp />} />
         
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
