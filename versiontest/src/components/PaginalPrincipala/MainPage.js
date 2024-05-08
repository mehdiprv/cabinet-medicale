import React from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import AboutUs from '../AboutUs/AboutUs';
import Support from '../Footer/Support';
import TermsOfUse from '../Footer/TermsOfUse';
import PrivacyPolicy from '../Footer/PrivacyPolicy';
import RendezVous from '../Consultation/RendezVous';
import i from './i.png';
import classes from './MainPage.module.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
const MainPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here, for example, redirecting to the sign-in page.
    navigate('/Login');
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          <NavLink to='/home'>
            <img src={i} alt='Tooth' />
          </NavLink>
        </div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to='/home/desprenoi' className={`${classes.link} ${classes.transparentBorder}`}>
                ABOUT US
              </NavLink>
            </li>
            <li>
              <NavLink to='/home/rendezvous' className={`${classes.link} ${classes.transparentBorder}`}>
                Rendez-Vous
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className={`${classes.link} ${classes.transparentBorder}`}>
              <ExitToAppIcon />
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <section className={classes.overview}>
        <h1 className={classes.mainTitle}>Cabinet Medicale</h1>
      </section>

      <Routes>
        <Route path='/home/desprenoi' element={<AboutUs />} />
        <Route path='/home/rendezvous' element={<RendezVous />} />
        <Route path='/home/support' element={<Support />} />
        <Route path='/home/termsofuse' element={<TermsOfUse />} />
        <Route path='/home/privacypolicy' element={<PrivacyPolicy />} />
      </Routes>

      <Footer />
    </>
  );
};

export default MainPage;
