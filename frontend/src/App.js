import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Homepage/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { VerifyToken } from './components/PrivateRoute/VerifyToken';
import { Painel } from './components/Painel/Painel';
import { VerifyLogged } from './components/VerifyLogged/VerifyLogged';
function App() {
  return (
    <Router>



      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<VerifyLogged>
          <Login />
        </VerifyLogged>} />
        <Route path='/register' element={<Register />} />
        <Route path='/painel' element={<VerifyToken>
          <Painel />
        </VerifyToken>} />
      </Routes>
    </Router>
  );
}

export default App;
