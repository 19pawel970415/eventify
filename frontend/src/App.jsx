import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import React from 'react';

import Register from './pages/Register';
import Login from './pages/Login';
import EventsList from './pages/EventsList';
import HomeUser from './pages/HomeUser';
import MyEvents   from './pages/MyEvents';
import Ticket from './pages/Ticket'

function Home({ events, error }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // Sprawdzamy czy mamy token w localStorage
    setIsAuthenticated(Boolean(localStorage.getItem('token')));

    // Filtrujemy wydarzenia na najbliższy tydzień
    if (events) {
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      const filtered = events.filter(event => {
        const eventDate = new Date(event.eventDate);
        return eventDate >= today && eventDate <= nextWeek;
      });

      setFilteredEvents(filtered);
    }
  }, [events]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/', { replace: true });
  };

  if (error) {
    return <h1>{error}</h1>;
  }
  if (!events) {
    return <h1>Ładuję wydarzenia...</h1>;
  }

  return (
    <div className="d-flex flex-column h-100">
      <main className="flex-shrink-0">
        {/* Navigation */}
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
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Strona główna</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/EventsList">Lista wydarzeń</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/MyTickets">Moje bilety</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/MyEvents">Polubione wydarzenia</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <button
                        className="nav-link dropdown-toggle btn btn-link"
                        id="navbarDropdownPortfolio"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Konto
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                        <li>
                          <button className="dropdown-item" onClick={handleLogout}>
                            Wyloguj się
                          </button>
                        </li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Strona główna</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/EventsList">Lista wydarzeń</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <button
                        className="nav-link dropdown-toggle btn btn-link"
                        id="navbarDropdownPortfolio"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Konto
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
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

        {/* Header */}
        <header className="bg-dark py-5">
          <div className="container px-5">
            <div className="row gx-5 align-items-center justify-content-center">
              <div className="col-lg-8 col-xl-7 col-xxl-6">
                <div className="my-5 text-center text-xl-start">
                  <h1 className="display-5 fw-bolder text-white mb-2">Witaj w Eventify!</h1>
                  <p className="lead fw-normal text-white-50 mb-4">
                    Największe wydarzenia kulturowe w cełej Polsce. Kupowanie bilató, możliowść dodawanie wydarzenia do listy ulubionych i wiele więcej. Zarejestruj się aby rozpocząć!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Events List */}
        <section className="py-5">
          <div className="container px-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-8">
                <ul className="list-group">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((evt) => (
                      <li key={evt.id} className="list-group-item p-4 mb-3 shadow-lg rounded">
                        <h4 className="text-primary">{evt.title}</h4>
                        <p className="mb-1">
                          <strong>Data:</strong> {new Date(evt.eventDate).toLocaleString()}<br />
                          <strong>Miasto:</strong> {evt.cityName}<br />
                          <strong>Adres:</strong> {evt.street} {evt.buildingNumber}
                          {evt.apartmentNumber ? `/${evt.apartmentNumber}` : ''}
                        </p>
                        <div className="d-flex justify-content-between">
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-center">
                      Brak wydarzeń spełniających kryteria.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-dark py-4 mt-auto">
        <div className="container px-5">
          <div className="row align-items-center justify-content-between flex-column flex-sm-row">
            <div className="col-auto text-white">
              &copy; Eventify 2025
            </div>
            <div className="col-auto">

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8085/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
      })
      .catch(() => setError('Błąd połączenia'));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home events={events} error={error} />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/HomeUser" element={<HomeUser />} />
        <Route path="/EventsList" element={<EventsList />} />
        <Route path="/MyEvents"     element={<MyEvents />} /> 
        <Route path="/Ticket" element={<Ticket />} />
      </Routes>
    </Router>
  );
}

export default App;
