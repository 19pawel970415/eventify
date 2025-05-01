import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

function Ticket() {
  const { id } = useParams(); // zakładamy trasę: /BuyTicket/:id
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:8085/api/events/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Nie udało się pobrać wydarzenia.');
        return res.json();
      })
      .then(data => setEvent(data))
      .catch(err => setError(err.message));
  }, [id]);

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handlePayment = () => {
    // W prawdziwej aplikacji tutaj przekierowujesz do płatności i zapisujesz dane
    alert(`Kupujesz ${quantity} bilet(ów) na "${event.title}"`);
    navigate('/Payment'); // lub inna ścieżka do płatności
  };

  if (error) {
    return <div className="alert alert-danger m-5">{error}</div>;
  }

  if (!event) {
    return <div className="container mt-5"><h3>Ładowanie danych wydarzenia...</h3></div>;
  }

  return (
    <div className="d-flex flex-column h-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
          <Link className="navbar-brand" to="/">Eventify</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Strona główna</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/EventsList">Wydarzenia</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-shrink-0">
        <header className="bg-dark py-5">
          <div className="container px-5">
            <div className="row justify-content-center text-center text-white">
              <div className="col-lg-8">
                <h1 className="display-5 fw-bold">Kup bilet</h1>
                <p className="lead">Wybierz liczbę biletów i przejdź do płatności</p>
              </div>
            </div>
          </div>
        </header>

        <section className="py-5">
          <div className="container px-5">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card shadow-lg p-4">
                  <h3 className="mb-3">{event.title}</h3>
                  <p><strong>Data:</strong> {new Date(event.eventDate).toLocaleString()}</p>
                  <p><strong>Miasto:</strong> {event.cityName}</p>
                  <p><strong>Adres:</strong> {event.street} {event.buildingNumber}{event.apartmentNumber ? `/${event.apartmentNumber}` : ''}</p>

                  <hr />

                  <div className="d-flex align-items-center mb-3">
                    <strong className="me-3">Ilość biletów:</strong>
                    <button className="btn btn-outline-secondary me-2" onClick={decreaseQuantity}>-</button>
                    <span className="px-3">{quantity}</span>
                    <button className="btn btn-outline-secondary ms-2" onClick={increaseQuantity}>+</button>
                  </div>

                  <button className="btn btn-success mt-3" onClick={handlePayment}>
                    Przejdź do płatności
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark py-4 mt-auto">
        <div className="container px-5 text-white text-center">
          &copy; Eventify 2025
        </div>
      </footer>
    </div>
  );
}

export default Ticket;
