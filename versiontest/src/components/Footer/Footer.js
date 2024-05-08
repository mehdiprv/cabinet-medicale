import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <nav className={classes.nav}>
        <ul>
          <li><NavLink to='/home/support' className={classes.link}>SUPPORT</NavLink></li>
          <li><NavLink to='/home/termsofuse' className={classes.link}>TERMS OF USE</NavLink></li>
          <li><NavLink to='/home/privacypolicy' className={classes.link}>PRIVACY POLICY</NavLink></li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
