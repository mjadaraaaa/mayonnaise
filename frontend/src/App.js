
import './App.css';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ManagementPage } from './pages/ManagementPage';


  
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/management" element={<ManagementPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
