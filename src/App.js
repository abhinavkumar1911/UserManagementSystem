import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage/Loginpage';
import Adduser from './Landingpage/Adduser';
import NavBar from './Landingpage/NavBar';
import Logout from './Landingpage/Logout';
import UserList from './Landingpage/UserList';
import Edit1 from './Landingpage/Edit1';

function App() {
  const location = useLocation();

  // Don't show NavBar on login page
  {/*const hideNavBarOnPaths = ['/', '/logout'];
  const shouldShowNavBar = !hideNavBarOnPaths.includes(location.pathname.toLowerCase());*/}

  return (
    <div className="App">
     {/*} {shouldShowNavBar && <NavBar />}*/}
     <NavBar />
      
      <Routes>
       {/*} <Route path="/" element={<LoginPage />} /> */}
        
        <Route path="/" element={<Adduser />} />
        <Route path="/adduser" element={<Adduser />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path='/Edit1' element={<Edit1 />}/>
        {/*<Route path="/logout" element={<Logout />} /> */}
      </Routes>
    </div>
  );
}

export default App;
