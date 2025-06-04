import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage/Loginpage';
import Dashboard from './Landingpage/Dashboard';
import Adduser from './Landingpage/Adduser';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/Dashboard' element={<Dashboard />} />
    </Routes>
    <Adduser/>
    <main style={{ padding: '20px' }}>
        <h1>Welcome!</h1>
      </main>
      
    </div>
  );
}

export default App;
