import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem('token')));
  }, []);

  React.useEffect(() => {
    fetch('/api/events') // Zmień na rzeczywisty endpoint
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Błąd podczas pobierania wydarzeń:', error));
  }, []);

  const handleLogout = () => {
    alert('Nastąpiło wylogowanie z konta.');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/', { replace: true });
  };

  const now = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(now.getDate() + 7);
  const upcomingEvents = events
    .filter(evt => {
      const eventDate = new Date(evt.eventDate);
      return eventDate >= now && eventDate <= sevenDaysLater;
    })
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

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

        {/* Header */}
        <header className="bg-dark py-5">
          <div className="container px-5">
            <div className="row gx-5 align-items-center justify-content-center">
              <div className="col-lg-8 col-xl-7 col-xxl-6">
                <div className="my-5 text-center text-xl-start">
                  <h1 className="display-5 fw-bolder text-white mb-2">Witaj w Eventify!</h1>
                  <p className="lead fw-normal text-white-50 mb-4">
                    Największe wydarzenia kulturowe w całej Polsce. Kupowanie biletów, dodawanie wydarzeń do ulubionych i wiele więcej. Zarejestruj się aby rozpocząć!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
      </main>

      {/* Upcoming Events Section */}
      <section className="py-5 bg-light">
        <div className="container px-5">
          <h2 className="mb-4 text-center">Wydarzenia w ciągu najbliższych 7 dni</h2>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8">
              <ul className="list-group">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map(evt => (
                    <li key={evt.id} className="list-group-item p-4 mb-3 shadow rounded">
                      <h5 className="text-primary">{evt.title}</h5>
                      <p>
                        <strong>Data:</strong> {new Date(evt.eventDate).toLocaleString()}<br />
                        <strong>Miasto:</strong> {evt.cityName}<br />
                        <strong>Adres:</strong> {evt.street} {evt.buildingNumber}{evt.apartmentNumber ? `/${evt.apartmentNumber}` : ''}<br />
                        <strong>Cena:</strong> {evt.price} zł
                      </p>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-center">Brak wydarzeń w ciągu najbliższych 7 dni.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark py-4 mt-auto text-white">
        <div className="container text-center">
          &copy; Eventify 2025
        </div>
      </footer>
    </div>
  );
}

export default Home;
