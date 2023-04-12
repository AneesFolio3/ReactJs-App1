import './App.css';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './Screen/Home';
import { Login } from './Screen/Login';
import { NavBar } from './Components/Navbar';
import { CreatePost } from './Screen/CreatePost';


function App() {
  return (
    <div className="App">
     <Router>
     <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/CreatePost' element={<CreatePost/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
