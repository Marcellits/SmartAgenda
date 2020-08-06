import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppContext, AppContextProvider } from '../context/AppContext';
import axios from 'axios';

export default function Menu() {
  const history = useHistory();

  const Logout = async () => {
    const token = localStorage.getItem('token');
    await axios({
      method: 'POST',
      url: `/companies/logout`,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        localStorage.removeItem('token');
        history.push('/login');
        window.location.reload();
      })
      .catch((e) => console.log(e.message.toString()));
  };
  // const { setUser, setLoggedIn } = useContext(AppContext);
  const { user, setUser } = useContext(AppContext);
  const { loggedIn, setLoggedIn } = useContext(AppContext);
  const signedIn = (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark" className="navbar-custom">
        <Navbar.Brand href="/companies/me">S M A R T A G E N D A</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/calendar">Calendar </Nav.Link>
            <Nav.Link href="/clients">Clients </Nav.Link>
            <Nav.Link href="/ProfilePage">Profile </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#" onClick={Logout}>
              sign out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
  const signedOut = (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark" className="navbar-custom">
        <Navbar.Brand href="/companies/me">S M A R T A G E N D A</Navbar.Brand>
      </Navbar>
    </div>
  );
  return <>{loggedIn ? signedIn : signedOut}</>;
}
