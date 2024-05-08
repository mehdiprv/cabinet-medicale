import React, { Fragment } from 'react';
import classes from './AboutUs.module.css';
import { Link, NavLink } from 'react-router-dom';
import i from './i.png';
import Footer from '../Footer/Footer';
import MedcinList from '../Medcin/MedcinList'; // Import the MedcinList component

const AboutUs = () => {
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
              <NavLink to="/desprenoi" className={classes.link}>
                ABOUT US
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <section className={classes.main}>
        <div className={classes.medcinContainer}>
        <MedcinList showDeleteButton={false} />
        </div>
      </section>

      <div className={classes.footerDiv}>
        <Footer />
      </div>
    </Fragment>
  );
};

export default AboutUs;
