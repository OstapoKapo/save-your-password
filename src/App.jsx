import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PasswordForm from './components/PasswordForm/PasswordForm';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome  />} />
        <Route path="/LogIn" element={<LogIn  />} />
        <Route path="/SignUp" element={<SignUp  />} />
        <Route path="/PasswordForm" element={<PasswordForm  />} />
      </Routes>
    </Router>
  );
}

export default App;
