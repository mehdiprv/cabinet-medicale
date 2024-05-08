// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/users/Register';
import LoginForm from './components/Login/LoginForm';
import AboutUs from "./components/AboutUs/AboutUs";
import Support from "./components/Footer/Support";
import TermsOfUse from "./components/Footer/TermsOfUse";
import PrivacyPolicy from "./components/Footer/PrivacyPolicy";
import RendezVous from "./components/Consultation/RendezVous";
import MainPage from "./components/PaginalPrincipala/MainPage";
import Principale from './components/Cabinet/Principale';
import AddPatient from './components/Patient/AddPatient';
import PatientList from './components/Patient/Patientlist';
import AddMedcin from './components/Medcin/AddMedcin';
import Addrdv from './components/RDV/Addrdv';
import Adddossier from './components/DossierM/Adddossier';
import Dashboard from './components/Cabinet/Principale';
import MedcinList from './components/Medcin/MedcinList';
import Listdossier from './components/DossierM/Listdossier';
import RendezVousList from './components/RDV/Listrdv';
const App = () => {
  const userRole = localStorage.getItem('userRole');
  console.log('User Role:', userRole);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Utilisez le préfixe /principale/ pour les routes liées à Principale */}
        <Route path="/principale/*" element={<Dashboard />} />
        <Route path="/principale/addpatient" element={<AddPatient />} />
        <Route path="/principale/MedcinList" element={<MedcinList/>} />
        <Route path="/principale/patientlist" element={<PatientList />} />
        <Route path="/principale/DossierMedicauxList" element={<Listdossier />} />
        <Route path="/principale/Rendez-vous" element={<RendezVousList />} />
        <Route path="/principale/addmedcins" element={<AddMedcin />} />
        <Route path="/principale/addrdv" element={<Addrdv />} />
        <Route path="/principale/adddossier" element={<Adddossier />} />
        <Route path="/home/*" element={<MainPage />} />
        <Route path="/home/desprenoi" element={<AboutUs />} />
        <Route path="/home/rendezvous" element={<RendezVous />} />
        <Route path="/home/support" element={<Support />} />
        <Route path="/home/termsofuse" element={<TermsOfUse />} />
        <Route path="/home/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;
