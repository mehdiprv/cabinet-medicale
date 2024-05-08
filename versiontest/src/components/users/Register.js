import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../users/RegisterForm.css';
import "bootstrap/dist/css/bootstrap.min.css"
const Register = () => {
   const navigate = useNavigate(); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [result, setResult] = useState('');
  const handleLoginClick = () => {
    navigate('/login');
    console.log("Clic sur le lien de connexion");
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName) {
      setResult("Veuillez remplir tous les champs.");
      return;
    }

    const userData = {
        nom: lastName,
        prenom: firstName,
        Email: email,
        Password: password,
        UserType: role,
      };

    try {
      const response = await fetch('https://localhost:44324/api/Users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        setResult("Done");
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody || 'Une erreur s\'est produite avec la requête.');
      }
    } catch (error) {
      setResult(error.toString());
    }
  };

  return (
    <body>
  <section
    
    style={{
      backgroundImage: `url(./mehdi.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh', // Set the height to 100% of the viewport height
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div className="login-container">
      <div className="circle circle-one"></div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h1 className="opacity mt-2">REGISTER</h1>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">
              Nom
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Votre nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">
              Prénom
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Votre prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary-color hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Créer un compte
          </button>
          <h2 className="result-message">{result}</h2>
        </form>
        <div className="register-forget opacity">
          <p>Déjà un compte ? <a href="#" onClick={handleLoginClick}>Connectez-vous ici</a></p>
        </div>
      </div>
      <div className="circle circle-two"></div>
    </div>
    <div className="theme-btn-container"></div>
  </section>
</body>

  );
};

export default Register;