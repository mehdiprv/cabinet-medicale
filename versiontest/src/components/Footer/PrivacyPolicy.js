import { Fragment } from "react";
import i from './i.png';
import { Link, NavLink } from "react-router-dom";
import classes from './PrivacyPolicy.module.css'



const PrivacyPolicy = () => {
    return <Fragment>
        <header className={classes.header}>
            <div className={classes.logo} >
                <Link to='/home'>
                    <img src={i} alt='Tooth' />
                </Link>
            </div>
            <nav className={classes.nav}>
                <ul>
                    <li> <NavLink to='/desprenoi' className={classes.link}>ABOUT US</NavLink></li>
                    <li> <NavLink to='/tarife' className={classes.link}>PRICES</NavLink></li>
                </ul>
            </nav>
        </header>
        <section className={classes.container}>
            <h1 className={classes.title}>Privacy Policy</h1>
            <h2 className={classes.title2}>Data protection declaration</h2>
            <p className={classes.para}>Unless stated otherwise below, the provision of your personal data is neither legally nor contractually obligatory, nor required for conclusion of a contract. You are not obliged to provide your data. Not providing it will have no consequences. This only applies as long as the processing procedures below do not state otherwise.“Personal data” is any information relating to an identified or identifiable natural person.</p>
            <h2 className={classes.title2}>Server log files</h2>
            <p className={classes.para}>You can use our websites without submitting personal data.<br /> Every time our website is accessed, user data is transferred to us or our web hosts/IT service providers by your internet browser and stored in server log files. This stored data includes for example the name of the site called up, date and time of the request, the IP address, amount of data transferred and the provider making the request. The processing is carried out on the basis of Article 6(1) f) GDPR due to our legitimate interests in ensuring the smooth operation of our website as well as improving our services.</p>
            <h2 className={classes.title2}>Responsible person</h2>
            <p className={classes.para}>Contact us at any time. The contact details of the person responsible for data processing can be found in our legal notice.</p>
            <h2 className={classes.title2}>Proactive contact of the customer by e-mail</h2>
            <p className={classes.para}>If you make contact with us proactively via email, we shall collect your personal data (name, email address, message text) only to the extent provided by you. The purpose of the data processing is to handle and respond to your contact request.<br />If the initial contact serves to implement pre-contractual measures (e.g. consultation in the case of purchase interest, order creation) or concerns an agreement already concluded between you and us, this data processing takes place on the basis of Article 6(1)(b) GDPR.<br />If the initial contact occurs for other reasons, this data processing takes place on the basis of Article 6(1)(f) GDPR for the purposes of our overriding, legitimate interest in handling and responding to your request. In this case, on grounds relating to your particular situation, you have the right to object at any time to this processing of personal data concerning you and carried out on the basis of Article 6(1)(f) GDPR.<br />We will only use your email address to process your request. Your data will subsequently be deleted in compliance with statutory retention periods, unless you have agreed to further processing and use.</p>
        </section>
    </Fragment>
}

export default PrivacyPolicy;
