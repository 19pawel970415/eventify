// Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // <-- dodane useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import React from 'react';
import AddEvent from './AddEvent';
import EventsList from './EventsList';

function HomeUser() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState('');
  

  useEffect(() => {
    fetch('http://localhost:8085/api/events')
      .then(res => res.json())
      .then(data => {
        console.log('Odebrane dane:', data);
        setEvents(data);
      })
      .catch(() => setError('Błąd połączenia'));
  }, []);


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
            <a className="navbar-brand" href="/">Eventify</a>
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
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/addevent">Dodaj wydarzenie</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/eventslist">Lista wydarzeń</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/myevents">Moje wydarzenia</Link> {/* NOWA ZAKŁADKA */}
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdownPortfolio" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Konto</a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                    <li><Link className="dropdown-item" to="/">Wyloguj się</Link></li>
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
              <div className="col-lg-8 col-xl-7 col-xxl-6">
                <div className="my-5 text-center text-xl-start">
                  <h1 className="display-5 fw-bolder text-white mb-2">Twoje wydarzenia</h1>
                  <p className="lead fw-normal text-white-50 mb-4">
                    Poniżej znajdziesz listę wszystkich wydarzeń pobranych z bazy danych.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Events */}
        <section className="py-5" id="events">
          <div className="container px-5 my-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-8">
                <ul className="list-group">
                  {events.map((evt) => (
                    <li key={evt.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-1">{evt.title}</h5>
                        <small>{new Date(evt.event_date).toLocaleString()}</small>
                      </div>
                    </li>
                  ))}
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
            <div className="col-auto">
              <div className="small m-0 text-white">&copy; Twoja Strona 2025</div>
            </div>
            <div className="col-auto">
              <a className="link-light small" href="#!">Privacy</a>
              <span className="text-white mx-1">&middot;</span>
              <a className="link-light small" href="#!">Terms</a>
              <span className="text-white mx-1">&middot;</span>
              <a className="link-light small" href="#!">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



export default HomeUser;
