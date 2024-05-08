import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Addrdv from '../RDV/Addrdv';
import classes from './Rendezvous.module.css'; // Chemin correct vers votre module CSS
import a from './a.jpg'; // Chemin correct vers votre image
import i from './i.png'
const RendezVous = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.logo}>
          <Link to="/home">
            <img src={i} alt="Tooth" />
          </Link>
        </div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Link to="/Consultation" className={classes.link}>
                Rendez-Vous
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className={classes.main}>
        <section
          style={{
            background: `url(${a})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <div className={classes.medcinContainer}>
            <h2> Saisir les informations pour prendre un rendez-vous </h2>
            <Addrdv />
          </div>
        </section>
      </main>

      <footer className={classes.footerDiv}>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default RendezVous;
