import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
