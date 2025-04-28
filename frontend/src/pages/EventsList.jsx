import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

function EventsList() {
  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [eventsError, setEventsError] = useState('');
  const [citiesError, setCitiesError] = useState('');

  const fetchWithAuth = async (url) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await fetchWithAuth('http://localhost:8085/api/events');
        setEvents(data);
      } catch (error) {
        console.error('Błąd pobierania wydarzeń:', error);
        setEventsError('Nie udało się załadować wydarzeń.');
      }
    };

    const fetchCities = async () => {
      try {
        const data = await fetchWithAuth('http://localhost:8085/api/cities');
        setCities(data);
      } catch (error) {
        console.error('Błąd pobierania miast:', error);
        setCitiesError('Nie udało się załadować listy miast.');
      }
    };

    fetchEvents();
    fetchCities();
  }, []);

  const filteredEvents = events.filter(evt => {
    const matchesCity = selectedCity ? evt.cityName === selectedCity : true;
    const matchesDate = selectedDate ? evt.eventDate.startsWith(selectedDate) : true;
    return matchesCity && matchesDate;
  });

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
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdownPortfolio" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Konto</a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                    <li><Link className="dropdown-item" to="/Login">Logowanie</Link></li>
                    <li><Link className="dropdown-item" to="/Register">Rejestracja</Link></li>
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
                <h1 className="display-5 fw-bolder">Lista wydarzeń</h1>
                <p className="lead text-white-50">Przeglądaj wydarzenia w różnych miastach i na różne daty.</p>
              </div>
            </div>
          </div>
        </header>

        {/* Filters */}
        <section className="py-4">
          <div className="container px-5">
            <div className="row g-3 justify-content-center">
              <div className="col-md-4">
                <label htmlFor="citySelect" className="form-label text-white">Wybierz miasto:</label>
                <select
                  id="citySelect"
                  className="form-select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Wszystkie miasta</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {citiesError && (
                  <div className="text-danger mt-2">{citiesError}</div>
                )}
              </div>
              <div className="col-md-4">
                <label htmlFor="dateSelect" className="form-label text-white">Wybierz datę:</label>
                <input
                  id="dateSelect"
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

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

export default EventsList;
