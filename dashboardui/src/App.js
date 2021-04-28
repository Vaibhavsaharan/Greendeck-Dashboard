import { Component } from 'react';
import MetricsWidget from './components/MetricsWidget';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar bg="grey">
          <img height="30px" width="140px" alt=" " src="https://www.greendeck.co/images/logo/logo_full.png"></img>
          <div><h5 style={{marginLeft : "6px", marginTop : "8px", fontWeight:"bolder", color:"#3c1f59", fontSize : "23px"}} >Dashboard</h5></div>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Admin</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <MetricsWidget/>
      </div>
    )
  }
}

export default App;
