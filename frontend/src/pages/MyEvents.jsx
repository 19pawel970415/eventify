import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

function MyEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventsError, setEventsError] = useState('');
  const alerted = useRef(false);

  // Sprawdzenie, czy użytkownik jest zalogowany
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && !alerted.current) {
      alerted.current = true;
      alert(
        'Dostęp do tej strony posiadają tylko zalogowani użytkownicy. ' +
        'Zaloguj się by otrzymać dostęp do swoich ulubionych wydarzeń!'
      );
      navigate('/Login', { replace: true });
    }
  }, [navigate]);

  // Pobranie ulubionych wydarzeń
  useEffect(() => {
    const fetchWithAuth = async (url) => {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      return response.json();
    };

    const fetchEvents = async () => {
      try {
        const data = await fetchWithAuth('http://localhost:8085/api/events/liked');
        setEvents(data);
      } catch (error) {
        console.error('Błąd pobierania ulubionych wydarzeń:', error);
        setEventsError('Nie udało się załadować ulubionych wydarzeń.');
      }
    };

    fetchEvents();
  }, []);

  if (eventsError) {
    return <div className="alert alert-danger m-5">{eventsError}</div>;
  }

  return (
    <div className="d-flex flex-column h-100">
      <main className="flex-shrink-0">
        {/* Navbar */}
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
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          alert('Nastąpiło wylogowanie z konta.');
                          localStorage.removeItem('token');
                          navigate('/', { replace: true });
                        }}
                      >
                        Wyloguj się
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Header */}
        <header className="bg-dark py-5">
          <div className="container px-5">
            <div className="row gx-5 align-items-center justify-content-center">
              <div className="col-lg-8 col-xl-7 col-xxl-6 text-center text-white">
                <h1 className="display-5 fw-bolder">Twoje ulubione wydarzenia</h1>
                <p className="lead text-white-50">
                  Poniżej znajdziesz listę swoich ulubionych wydarzeń
                </p>
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
                  {events.length > 0 ? (
                    events.map((evt) => (
                      <li key={evt.id} className="list-group-item p-4 mb-3 shadow-lg rounded">
                        <h4 className="text-primary">{evt.title}</h4>
                        <p className="mb-1">
                          <strong>Data:</strong> {new Date(evt.eventDate).toLocaleString()}
                          <br />
                          <strong>Miasto:</strong> {evt.cityName}
                          <br />
                          <strong>Adres:</strong> {evt.street} {evt.buildingNumber}
                          {evt.apartmentNumber ? `/${evt.apartmentNumber}` : ''}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <Link to="/Ticket" className="btn btn-success">
                            Kup bilet
                          </Link>
                          <button
                            className="btn btn-outline-dark"
                            onClick={async () => {
                              const token = localStorage.getItem('token');
                              try {
                                const res = await fetch(`http://localhost:8085/api/events/${evt.id}/liked`, {
                                  method: 'DELETE',
                                  headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`,
                                  },
                                });
                                if (res.status === 204) {
                                  alert('Wydarzenie zostało usunięte z listy ulubionych!');
                                  setEvents((prev) => prev.filter((e) => e.id !== evt.id));
                                } else {
                                  throw new Error('Błąd usuwania z ulubionych');
                                }
                              } catch (err) {
                                console.error(err);
                                alert('Nie udało się usunąć wydarzenia z ulubionych');
                              }
                            }}
                            title="Usuń z ulubionych"
                          >
                            🗑
                          </button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-center">
                      Brak ulubionych wydarzeń.
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
            <div className="col-auto text-white">&copy; Eventify 2025</div>
            <div className="col-auto" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MyEvents;
