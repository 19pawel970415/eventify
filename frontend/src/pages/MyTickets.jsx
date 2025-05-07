import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import NavbarWithAuth from '../components/NavbarWithAuth';
import { useAuthRedirect } from '../hooks/useAuthRedirect';

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');

  // Sprawdzenie, czy użytkownik jest zalogowany
   useAuthRedirect(() => {});

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

  

  return (
    <div className="d-flex flex-column h-100">
      <main className="flex-shrink-0">
        <NavbarWithAuth />

        <header className="bg-dark py-5">
          <div className="container px-5">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center text-white">
                <h1 className="display-5 fw-bolder">Twoje bilety</h1>
                <p className="lead text-white-50">Poniżej znajdują się wszystkie zakupione pzrez Ciebie bilety na wydarzenia.</p>
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

      <Footer/>
    </div>
  );
}

export default MyTickets;