// AddEvent.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import React from 'react';
import HomeUser from './HomeUser'
import EventsList from './EventsList';

function AddEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      description,
      event_date: eventDate,
      city,
      street,
      house_number: houseNumber,
      apartment_number: apartmentNumber,
      postal_code: postalCode
    };

    fetch('http://localhost:8085/api/events/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Błąd dodawania wydarzenia');
      }
      return response.json();
    })
    .then(data => {
      console.log('Dodano wydarzenie:', data);
      setSuccess('Wydarzenie zostało dodane!');
      setTimeout(() => {
        navigate('/eventslist'); // Przeniesienie na listę wydarzeń po sukcesie
      }, 2000);
    })
    .catch(err => {
      console.error(err);
      setError('Nie udało się dodać wydarzenia.');
    });
  };

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
                  <Link className="nav-link" to="/HomeUser">Strona główna</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/eventslist">Lista wydarzeń</Link>
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
                  <h1 className="display-5 fw-bolder text-white mb-2">Dodaj nowe wydarzenie</h1>
                  <p className="lead fw-normal text-white-50 mb-4">
                    Uzupełnij dane poniżej, aby dodać nowe wydarzenie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Form */}
        <section className="py-5">
          <div className="container px-5">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Nazwa wydarzenia</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Opis</label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="eventDate" className="form-label">Data i godzina rozpoczęcia</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="eventDate"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                    />
                  </div>

                  {/* Nowe pola adresowe */}
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">Miasto</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="street" className="form-label">Ulica</label>
                    <input
                      type="text"
                      className="form-control"
                      id="street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="houseNumber" className="form-label">Numer domu</label>
                    <input
                      type="text"
                      className="form-control"
                      id="houseNumber"
                      value={houseNumber}
                      onChange={(e) => setHouseNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="apartmentNumber" className="form-label">Numer mieszkania (opcjonalnie)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="apartmentNumber"
                      value={apartmentNumber}
                      onChange={(e) => setApartmentNumber(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="postalCode" className="form-label">Kod pocztowy</label>
                    <input
                      type="text"
                      className="form-control"
                      id="postalCode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">Dodaj wydarzenie</button>

                  {success && <div className="alert alert-success mt-3">{success}</div>}
                  {error && <div className="alert alert-danger mt-3">{error}</div>}
                </form>
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

export default AddEvent;
