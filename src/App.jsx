import { Outlet } from 'react-router-dom';
import './App.css'
import SideBar from './components/SideBar'
import TopBar from './components/TopBar';
import Footer from './components/Footer';

function App() {

  return (
    <div id="wrapper">
      <SideBar/>
      <div id="content">
        <TopBar/>
        <div id="content-wrapper" className="d-flex flex-column">
          <Outlet/>
          <Footer/>
        </div>
      </div>

    </div>    
  )
}

export default App;
