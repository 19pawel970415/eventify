import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import Footer from '../components/Footer';
import NavbarWithAuth from '../components/NavbarWithAuth';

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
    const re = /^(?=.*\d).{8,}$/; 
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
        <NavbarWithAuth />

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

       <Footer/>
    </div>
  );
}

export default Register;
