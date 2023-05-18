import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { isUserLogin, userLoginData } from '../../redux/selector/userselector'
import './Header.scss'

const Header = () => {
  const navigate = useNavigate()

  const isLogged = useSelector(isUserLogin)
  const dataUser = useSelector(userLoginData)

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">
          PRO QUIZZZ
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to={isLogged ? '/users' : '/log-in'} className="nav-link">
              User
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {!isLogged ? (
              <>
                <button className="nav-btn btn-login" onClick={() => navigate('/log-in')}>
                  Log in
                </button>
                <button className="nav-btn btn-signup" onClick={() => navigate('/sign-up')}>
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Log out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
