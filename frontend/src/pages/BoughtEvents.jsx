import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

function BoughtEvents() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const alerted = useRef(false);

  const event = location.state?.event;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuth = Boolean(token);
    setIsAuthenticated(isAuth);

    if (!isAuth && !alerted.current) {
      alerted.current = true;
      alert('Zaloguj się, aby kontynuować zakup biletu.');
      navigate('/Login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    alert('Nastąpiło wylogowanie z konta.');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/', { replace: true });
  };

  if (!event) {
    return <div className="alert alert-danger m-5">Nie wybrano wydarzenia.</div>;
  }

  const {
    title,
    eventDate,
    cityName,
    street,
    buildingNumber,
    apartmentNumber,
    price
  } = event;

  const finalPrice = ticketCount * price;

  const handleIncrease = () => setTicketCount((prev) => prev + 1);
  const handleDecrease = () => setTicketCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handlePurchase = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Musisz być zalogowany, aby kupić bilet.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8085/api/events/${event.id}/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          eventId: event.id,
          eventDate,
          amount: ticketCount,
          priceAll: finalPrice
        })
      });

      if (response.ok) {
        alert(`Zakupiono ${ticketCount} bilet(y) na wydarzenie "${title}" za ${finalPrice.toFixed(2)} zł.`);
        navigate('/MyTickets');
      } else {
        const errorText = await response.text();
        alert(`Błąd przy zakupie: ${errorText}`);
      }
    } catch (error) {
      console.error('Błąd połączenia z API:', error);
      alert('Nie udało się połączyć z serwerem.');
    }
  };


  return (
    <div className="d-flex flex-column min-vh-100">
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
                <li className="nav-item"><Link className="nav-link" to="/">Strona główna</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/EventsList">Lista wydarzeń</Link></li>
                {isAuthenticated ? (
                  <>
                    <li className="nav-item"><Link className="nav-link" to="/MyTickets">Moje bilety</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/MyEvents">Polubione wydarzenia</Link></li>
                    <li className="nav-item dropdown">
                      <button className="nav-link dropdown-toggle btn btn-link" id="navbarDropdown" data-bs-toggle="dropdown">
                        Konto
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><button className="dropdown-item" onClick={handleLogout}>Wyloguj się</button></li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle btn btn-link" id="navbarDropdown" data-bs-toggle="dropdown">
                      Konto
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                      <li><Link className="dropdown-item" to="/Login">Logowanie</Link></li>
                      <li><Link className="dropdown-item" to="/Register">Rejestracja</Link></li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Header */}
        <header className="bg-dark py-5">
          <div className="container px-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-8 text-center text-white">
                <h1 className="display-5 fw-bolder">Zakup biletów</h1>
                <p className="lead text-white-50 mb-4">
                  Dokonaj zakupu biletu na wybrane wydarzenie. Wybierz ilość i przejdź do płatności.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Bilet */}
        <section className="py-5">
          <div className="container">
            <div className="card shadow-lg p-4">

              <h3><strong></strong> {title}</h3>
              <p><strong>Data:</strong> {new Date(eventDate).toLocaleString()}</p>
              <p><strong>Miasto:</strong> {cityName}</p>
              <p><strong>Adres:</strong> {street} {buildingNumber}{apartmentNumber ? `/${apartmentNumber}` : ''}</p>
              <p><strong>Cena za bilet:</strong> {price.toFixed(2)} zł</p>

              <div className="d-flex align-items-center my-3">
                <strong className="me-3">Ilość biletów:</strong>
                <button className="btn btn-outline-secondary me-2" onClick={handleDecrease}>-</button>
                <span>{ticketCount}</span>
                <button className="btn btn-outline-secondary ms-2" onClick={handleIncrease}>+</button>
              </div>

              <h4 className="text-success mt-3">Cena końcowa: {finalPrice.toFixed(2)} zł</h4>

              <button className="btn btn-success" onClick={handlePurchase}>
                Potwierdź zakup
              </button>
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

export default BoughtEvents;
