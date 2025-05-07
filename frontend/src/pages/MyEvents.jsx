import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import NavbarWihtAuth from '../components/NavbarWithAuth';
import { useAuthRedirect } from '../hooks/useAuthRedirect';

function MyEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventsError, setEventsError] = useState('');


  // Sprawdzenie, czy użytkownik jest zalogowany
  useAuthRedirect(() => {});

  // Funkcja obsługi wylogowania


  // Pobranie ulubionych wydarzeń
  useEffect(() => {
    const fetchWithAuth = async (url) => {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
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

  // Filtrowanie wydarzeń
  const now = new Date();
  const upcomingEvents = events
    .filter(event => new Date(event.eventDate) >= now)
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
  const pastEvents = events
    .filter(event => new Date(event.eventDate) < now)
    .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

  return (
    <div className="d-flex flex-column h-100">
      <main className="flex-shrink-0">
        {/* Navbar */}
       <NavbarWihtAuth />

        {/* Header */}
        <header className="bg-dark py-5">
          <div className="container px-5">
            <div className="row gx-5 align-items-center justify-content-center">
              <div className="col-lg-8 col-xl-7 col-xxl-6 text-center text-white">
                <h1 className="display-5 fw-bolder">Twoje ulubione wydarzenia</h1>
                <p className="lead text-white-50">Poniżej znajdziesz listę swoich ulubionych wydarzeń</p>
              </div>
            </div>
          </div>
        </header>

        {/* Events List */}
        <section className="py-5">
          <div className="container px-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-8">
                {events.length === 0 ? (
                  <div className="alert alert-info text-center">Brak ulubionych wydarzeń.</div>
                ) : (
                  <>
                    {/* Nadchodzące wydarzenia */}
                    <h3 className="mb-3">Nadchodzące wydarzenia</h3>
                    {upcomingEvents.length > 0 ? (
                      upcomingEvents.map(evt => (
                        <li key={evt.id} className="list-group-item p-4 mb-3 shadow rounded">
                          <h4 className="text-primary">{evt.title}</h4>
                          <p className="mb-1">
                            <strong>Data:</strong> {new Date(evt.eventDate).toLocaleString()}<br />
                            <strong>Miasto:</strong> {evt.cityName}<br />
                            <strong>Adres:</strong> {evt.street} {evt.buildingNumber}
                            {evt.apartmentNumber ? `/${evt.apartmentNumber}` : ''}<br />
                            <strong>Cena:</strong> {evt.price} zł
                          </p>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <button
                              className="btn btn-success"
                              onClick={() => navigate('/BoughtEvents', { state: { event: evt } })}
                            >
                              Kup bilet
                            </button>
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
                                    setEvents(prev => prev.filter(e => e.id !== evt.id));
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
                      <div className="alert alert-info">Brak nadchodzących wydarzeń.</div>
                    )}

                    {/* Historia wydarzeń */}
                    {pastEvents.length > 0 && (
                      <>
                        <h3 className="mt-5 mb-3">Historia wydarzeń</h3>
                        <ul className="list-group">
                          {pastEvents.map(evt => (
                            <li key={evt.id} className="list-group-item p-4 mb-3 shadow rounded bg-light">
                              <h4 className="text-secondary">{evt.title}</h4>
                              <p className="mb-2">
                                <strong>Data:</strong> {new Date(evt.eventDate).toLocaleString()}<br />
                                <strong>Miasto:</strong> {evt.cityName}<br />
                                <strong>Adres:</strong> {evt.street} {evt.buildingNumber}
                                {evt.apartmentNumber ? `/${evt.apartmentNumber}` : ''}<br />
                                <strong>Cena:</strong> {evt.price} zł
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

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default MyEvents;
