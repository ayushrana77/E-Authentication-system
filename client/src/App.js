import {Routes,Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header/header';
import Home from './components/Home/home'
import Login from './components/Login/login';
import Register from './components/Register/register';


function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
