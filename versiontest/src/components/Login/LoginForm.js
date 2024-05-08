import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/LoginForm.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      Email: email,
      Password: password,
    };

    try {
      const response = await fetch('https://localhost:44324/api/Users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Response status:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        const { token, role } = data;

        localStorage.setItem('userRole', role);
        setResult(`Login successful. Token: ${token}`);

        if (role === 'admin') {
          navigate('/principale');
        } else {
          navigate('/home');
        }
      } else {
        const errorBody = await response.json();
        console.error('Error body:', errorBody);

        if (response.status === 401) {
          setResult('Login failed. Incorrect email or password.');
        } else {
          setResult(`Login failed. ${errorBody.message || 'An error occurred with the request.'}`);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setResult(`Login failed. ${error.toString()}`);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <section
    style={{
      backgroundImage: `url('./mehdi.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
      <div className="login-container">
        <div className="circle circle-one"></div>
        <div className="form-container">
          <h1 className="opacity">LOGIN</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="opacity" type="submit">
            SIGN IN
            </button>
          </form>
          <div className="register-forget opacity">
            <a href="#" onClick={handleRegisterClick}>
              REGISTER
            </a>
          </div>
          <div>{result}</div> {/* Display the result message here */}
        </div>
        <div className="circle circle-two"></div>
      </div>
      <div className="theme-btn-container"></div>
    </section>
  );
};

export default Login;
