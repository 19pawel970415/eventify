import React from 'react';
import Footer from '../components/Footer';
import NavbarWithAuth from '../components/NavbarWithAuth'
import useEvents from '../hooks/useEvents';

function Home() {

  const { events } = useEvents();

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

       <NavbarWithAuth />

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

     <Footer/>
    </div>
  );
}

export default Home;