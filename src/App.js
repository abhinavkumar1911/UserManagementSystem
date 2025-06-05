import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage/Loginpage';
import Adduser from './Landingpage/Adduser';
import NavBar from './Landingpage/NavBar';
import Logout from './Landingpage/Logout';

function App() {
  const location = useLocation();

  // Don't show NavBar on login page
  const hideNavBarOnPaths = ['/', '/logout'];
  const shouldShowNavBar = !hideNavBarOnPaths.includes(location.pathname.toLowerCase());

  return (
    <div className="App">
      {shouldShowNavBar && <NavBar />}
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Edit" element={<Edit />} />
        <Route path="/adduser" element={<Adduser />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
