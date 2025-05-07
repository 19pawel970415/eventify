import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function NavbarWihtAuth() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container px-5">
                <Link className="navbar-brand" to="/">Eventify</Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {isAuthenticated ? (
                      <>
                        <li className="nav-item"><Link className="nav-link" to="/">Strona główna</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/EventsList">Lista wydarzeń</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/MyTickets">Moje bilety</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/MyEvents">Polubione wydarzenia</Link></li>
                        <li className="nav-item dropdown">
                          <button className="nav-link dropdown-toggle btn btn-link" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            Konto
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><button className="dropdown-item" onClick={handleLogout}>Wyloguj się</button></li>
                          </ul>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="nav-item"><Link className="nav-link" to="/">Strona główna</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/EventsList">Lista wydarzeń</Link></li>
                        <li className="nav-item dropdown">
                          <button className="nav-link dropdown-toggle btn btn-link" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            Konto
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" to="/Login">Logowanie</Link></li>
                            <li><Link className="dropdown-item" to="/Register">Rejestracja</Link></li>
                          </ul>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
  );
}
