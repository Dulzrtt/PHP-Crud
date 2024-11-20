//layout
import NavBar from './components/layouts/NavBar';
//pages
import Home from './components/pages/Home';
import AddTask from './components/pages/AddTask';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
          <NavBar></NavBar>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/addTask' element={<AddTask/>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
