import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import Footer from '../components/Footer';
import NavbarWithAuth from '../components/NavbarWithAuth'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
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

    if (!validateEmail(email)) {
      newErrors.email = 'Nieprawidłowy email';
      valid = false;
    }
    if (!validatePassword(password)) {
      newErrors.password = 'Hasło musi mieć co najmniej 8 znaków i zawierać cyfrę';
      valid = false;
    }

    setErrors(newErrors);
    setServerError('');

    if (valid) {
      try {
        const response = await fetch('http://localhost:8085/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Nieprawidłowe dane logowania');
        }

        const data = await response.json();
        console.log('Otrzymany token:', data.token);

        localStorage.setItem('token', data.token);

        setSuccess(true);

        setTimeout(() => {
          navigate('/');
        }, 1000);

      } catch (error) {
        console.error('Błąd logowania:', error);
        setServerError(error.message || 'Wystąpił błąd logowania');
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
                    <h3 className="text-center font-weight-light my-4">Logowanie</h3>
                  </div>
                  <div className="card-body">
                    {success ? (
                      <div className="alert alert-success" role="alert">
                        Logowanie zakończone sukcesem!
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        {serverError && (
                          <div className="alert alert-danger" role="alert">
                            {serverError}
                          </div>
                        )}
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

                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <button className="btn btn-primary w-100" type="submit">Zaloguj się</button>
                        </div>
                      </form>
                    )}
                  </div>
                  <div className="card-footer text-center py-3">
                    <div className="small">
                      <Link to="/Register">Nie masz konta? Zarejestruj się</Link>
                    </div>
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

export default Login;
