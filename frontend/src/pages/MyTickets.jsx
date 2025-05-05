import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

function MyTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const alerted = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && !alerted.current) {
      alerted.current = true;
      alert(
        'Dostęp do tej strony posiadają tylko zalogowani użytkownicy. ' +
        'Zaloguj się, by otrzymać dostęp do swoich biletów!'
      );
      navigate('/Login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchWithAuth = async (url) => {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`Błąd: ${response.status}`);
      }
      return response.json();
    };

    const fetchTickets = async () => {
      try {
        const data = await fetchWithAuth('http://localhost:8085/api/events/bought_events');
        setTickets(data);
      } catch (err) {
        console.error('Błąd pobierania biletów:', err);
        setError('Nie udało się załadować biletów.');
      }
    };

    fetchTickets();
  }, []);

  const now = new Date();
  // Nadchodzące wydarzenia (data >= teraz)
  const upcomingEvents = tickets
    .filter(event => new Date(event.eventDate) >= now)
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
  // Przeszłe wydarzenia (data < teraz)
  const pastEvents = tickets
    .filter(event => new Date(event.eventDate) < now)
    .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

  const handleLogout = () => {
    alert('Nastąpiło wylogowanie z konta.');
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  return (
    <div className="d-flex flex-column h-100">
      <main className="flex-shrink-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container px-5">
            <Link className="navbar-brand" to="/">Eventify</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><Link className="nav-link" to="/">Strona główna</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/EventsList">Lista wydarzeń</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/MyTickets">Moje bilety</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/MyEvents">Polubione wydarzenia</Link></li>
                <li className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle btn btn-link" id="userDropdown" data-bs-toggle="dropdown">
                    Konto
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><button className="dropdown-item" onClick={handleLogout}>Wyloguj się</button></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header className="bg-dark py-5">
          <div className="container px-5">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center text-white">
                <h1 className="display-5 fw-bolder">Twoje bilety</h1>
                <p className="lead text-white-50">Poniżej znajdują się wszystkie zakupione bilety podzielone na nadchodzące i przeszłe wydarzenia.</p>
              </div>
            </div>
          </div>
        </header>

        <section className="py-5">
          <div className="container px-5">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                {error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : tickets.length === 0 ? (
                  <div className="alert alert-info text-center">Brak zakupionych biletów.</div>
                ) : (
                  <>
                    {/* Nadchodzące wydarzenia */}
                    {upcomingEvents.length > 0 ? (
                      <>
                        <h3 className="mb-3">Nadchodzące wydarzenia</h3>
                        <ul className="list-group">
                          {upcomingEvents.map(ticket => (
                            <li key={ticket.id} className="list-group-item p-4 mb-3 shadow rounded">
                              <h4 className="text-primary">{ticket.title}</h4>
                              <p className="mb-2">
                                <strong>Data:</strong> {new Date(ticket.eventDate).toLocaleString()}<br />
                                <strong>Miasto:</strong> {ticket.cityName}<br />
                                <strong>Adres:</strong> {ticket.street} {ticket.buildingNumber}
                                {ticket.apartmentNumber ? `/${ticket.apartmentNumber}` : ''}<br />
                                <strong>Liczba biletów:</strong> {ticket.amount}<br />
                                <strong>Łączna cena:</strong> {ticket.priceAll.toFixed(2)} zł
                              </p>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <div className="alert alert-info text-center">Brak nadchodzących wydarzeń.</div>
                    )}

                    {/* Historia wydarzeń */}
                    {pastEvents.length > 0 && (
                      <>
                        <h3 className="mt-5 mb-3">Historia wydarzeń</h3>
                        <ul className="list-group">
                          {pastEvents.map(ticket => (
                            <li key={ticket.id} className="list-group-item p-4 mb-3 shadow rounded bg-light">
                              <h4 className="text-secondary">{ticket.title}</h4>
                              <p className="mb-2">
                                <strong>Data:</strong> {new Date(ticket.eventDate).toLocaleString()}<br />
                                <strong>Miasto:</strong> {ticket.cityName}<br />
                                <strong>Adres:</strong> {ticket.street} {ticket.buildingNumber}
                                {ticket.apartmentNumber ? `/${ticket.apartmentNumber}` : ''}<br />
                                <strong>Liczba biletów:</strong> {ticket.amount}<br />
                                <strong>Łączna cena:</strong> {ticket.priceAll.toFixed(2)} zł
                              </p>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-dark py-4 mt-auto text-white">
        <div className="container text-center">
          &copy; Eventify 2025
        </div>
      </footer>
    </div>
  );
}

export default MyTickets;