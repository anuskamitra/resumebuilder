import Header from './components/Header.js';
import  './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Welcome from './components/Welcome.js';
import Login from "./components/Login.js"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/resume" element={<Header/>}/>

        </Routes>
     
      
      </Router>

     
    </div>
   
  );
}

export default App;
