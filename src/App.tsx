import './App.css';
import Topbar from './layouts/components/main/Topbar';
import Footer from './layouts/components/main/Footer';
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from './layouts/components/main/Sidebar';
// import Sidebar from './layouts/components/drawer/Sidebar';
import AppRoutes from './AppRoutes';


function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
    <Topbar/>
    <Router>
          <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1, padding: "20px" }}>
              <AppRoutes />
            </div>
          </div>
        </Router>
        <Footer />
    </div>
  );
}

export default App;
