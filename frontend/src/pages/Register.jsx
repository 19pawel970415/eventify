import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import React from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d).{8,}$/; // Minimum 8 znaków i przynajmniej jedna cyfra
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Imię jest wymagane';
      valid = false;
    }

    if (!validateEmail(email)) {
      newErrors.email = 'Nieprawidłowy email';
      valid = false;
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Hasło musi mieć co najmniej 8 znaków i zawierać cyfrę';
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Hasła nie są takie same';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const response = await fetch('http://localhost:8085/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
          const errorBody = await response.json();
          setErrors({ api: errorBody.message || 'Błąd rejestracji' });
        } else {
          setSuccess(true);
          // opcjonalnie zapis userDto, np. const userDto = await response.json();
          setTimeout(() => navigate('/login'), 2000);
        }
      } catch (err) {
        setErrors({ api: err.message });
      }
    }
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
                  <Link className="nav-link" to="/">Strona główna</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Eventslist">Lista wydarzeń</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Konto</a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/Login">Logowanie</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Rejestracja */}
        <section className="py-5">
          <div className="container px-5">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">Rejestracja</h3>
                  </div>
                  <div className="card-body">
                    {success ? (
                      <div className="alert alert-success" role="alert">
                        Rejestracja zakończona sukcesem! Za chwilę nastąpi przekierowanie.
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                          <input
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="name"
                            type="text"
                            placeholder="Imię"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <label htmlFor="name">Imię</label>
                          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label htmlFor="email">Email</label>
                          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password"
                            type="password"
                            placeholder="Hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label htmlFor="password">Hasło</label>
                          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            id="confirmPassword"
                            type="password"
                            placeholder="Potwierdź hasło"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <label htmlFor="confirmPassword">Potwierdź hasło</label>
                          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                        </div>

                        {errors.api && (
                          <div className="alert alert-danger mt-3" role="alert">
                            {errors.api}
                          </div>
                        )}

                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <button className="btn btn-primary w-100" type="submit">Zarejestruj się</button>
                        </div>
                      </form>
                    )}
                  </div>
                  <div className="card-footer text-center py-3">
                    <div className="small"><Link to="/Login">Masz już konto? Zaloguj się</Link></div>
                  </div>
                </div>
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

export default Register;
