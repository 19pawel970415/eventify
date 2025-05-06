import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

function EventsList() {
  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [eventsError, setEventsError] = useState('');
  const [citiesError, setCitiesError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    alert('Nastąpiło wylogowanie z konta.');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

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

  const filteredEvents = events
  .filter(evt => {
    const matchesCity = selectedCity ? evt.cityName === selectedCity : true;
    const matchesDate = selectedDate ? evt.eventDate.startsWith(selectedDate) : true;
    const eventDate = new Date(evt.eventDate);
    return matchesCity && matchesDate && eventDate >= new Date(); // filtruj tylko przyszłe wydarzenia
  })
  .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)); // sortuj rosnąco według daty

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
              <div className="col-lg-8 col-xl-7 col-xxl-6 text-center text-white">
                <h1 className="display-5 fw-bolder">Lista wydarzeń</h1>
                <p className="lead text-white-50">Zapoznaj się ze wszystkimi dostępnymi wydarzeniami. Filtruj po miastach, w których sie odbywają oraz datach.</p>
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
                          {evt.apartmentNumber ? `/${evt.apartmentNumber}` : ''} <br />
                          <strong>Cena:</strong> {evt.price} {"zł"}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          {isAuthenticated ? (
                            <button
                            className="btn btn-success"
                            onClick={() => navigate('/BoughtEvents', { state: { event: evt } })}
                          >
                            Kup bilet
                          </button>
                          ) : (
                            <button
                              className="btn btn-success"
                              onClick={() => alert("Zaloguj się by kupić bilet!")}
                            >
                              Kup bilet
                            </button>
                          )}
                          {isAuthenticated ? (
                            <button
                              className="btn btn-outline-danger"
                              onClick={async () => {
                                const token = localStorage.getItem('token');
                                try {
                                  const response = await fetch(`http://localhost:8085/api/events/${evt.id}/like`, {
                                    method: 'POST',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      'Authorization': `Bearer ${token}`,
                                    },
                                  });

                                  if (response.ok) {
                                    alert('Dodano do ulubionych!');
                                    navigate('/MyEvents');
                                  } else {
                                    throw new Error('Błąd dodawania do ulubionych');
                                  }
                                } catch (error) {
                                  console.error('Błąd:', error);
                                  alert('To wydarzenie jest już na liście Twoich polubień 😊');
                                }
                              }}
                              title="Dodaj do ulubionych"
                            >
                              ♡
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => alert("Zaloguj się by dodać wydarzenie do ulubionych!")}
                              title="Dodaj do ulubionych"
                            >
                              ♡
                            </button>
                          )}
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
      <footer className="bg-dark py-4 mt-auto text-white">
        <div className="container text-center">
          &copy; Eventify 2025
        </div>
      </footer>
    </div>
  );
}

export default EventsList;
