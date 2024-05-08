import { Fragment } from 'react'
import { NavLink, Link } from 'react-router-dom'
import classes from './TermsOfUse.module.css'
import i from './i.png'


const TermsOfUse = () => {
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
            <h1 className={classes.title}>PLEASE READ CAREFULLY!</h1>
        </section>
        <p className={classes.introPara}>PLEASE READ THESE WEBSITE TERMS OF USE CAREFULLY BEFORE USING THIS WEBSITE (HEREINAFTER 'WEBSITE'). THESE WEBSITE TERMS OF USE (HEREINAFTER 'TERMS OF USE') GOVERN YOUR ACCESS TO AND USE OF THE WEBSITE. THE WEBSITE IS AVAILABLE FOR YOUR USE ONLY ON THE CONDITION THAT YOU AGREE TO THE TERMS OF USE SET FORTH BELOW. IF YOU DO NOT AGREE TO ALL OF THE TERMS OF USE, DO NOT ACCESS OR USE THE WEBSITE. BY ACCESSING OR USING THE WEBSITE, YOU AND THE ENTITY YOU ARE AUTHORISED TO REPRESENT (HEREINAFTER 'YOU' OR 'YOUR') SIGNIFY YOUR AGREEMENT TO BE BOUND BY THE TERMS OF USE.</p>
        <h2 className={classes.title2}>Disclaimer</h2>
        <p className={classes.para}>While we are proud of the services we provide to the world for free and try to make them reliable and useful, we make no promises about them. All web services are certain to fail some of the time. We adapt and change our services from time to time, so you may find that something that worked for you may cease to work. We may also stop supplying any service, temporarily or permanently or block access to our services to anyone for any reason.If you need some guarantee of a particular service level, then please do not hesitate to contact us to discuss whether we could offer you a commercial version of any of our services (assuming one is not already available).</p>
        <h3 className={classes.title2}>What you agree</h3>
        <p className={classes.para}>You agree NOT to use our websites to do any of the following:<br /><br />Anything which is illegal either where you are in the world, or where we are.
            <br />Cause nuisance to other users of our services.
            <br />Interfere with the normal running of our services.
            <br />Try to access our systems in a way other than those advertised by us and, in particular, to use a web crawler that does not respect the robots exclusion policy.You agree not to use our websites to do any of the following:
        </p>
        <h4 className={classes.title2}>Our content</h4>
        <p className={classes.para}>Unless otherwise stated all our services are offered under open content or data licences and you should refer to the provisions of the licence in question to find out what you are allowed to do. Some of our content belongs to third parties. Most third party data is subject to an open licence, but we cannot guarantee it. You should refer to the third party if you are in doubt.</p>
        <h2 className={classes.specialTitle}>General conditions</h2>
        <h3 className={classes.title2}>This agreement</h3>
        <p className={classes.para}>We may update these terms and conditions at any time. If we do so, we will announce the change on our blog. Any changes will be binding on you from the moment we announce them.<br />This agreement is made under the laws of England and Wales.</p>
        <h2 className={classes.title2}>Boilerplate</h2>
        <p className={classes.para}>These final “boilerplate” terms of should go without saying, but we are saying them anyway just to be clear.<br />If any part of this agreement is ineffective (for example because it is unlawful) then the rest of the agreement should be read without it.<br />This agreement is between you and us and is not intended to give anyone else any rights.<br />We may sometimes fail to enforce our rights under this agreement (for example because we decide not to, or we did not realise you were in breach of contract). Just because we have not enforced any of our rights, does not stop us from doing so in the future.<br />Neither party is liable for anything which is beyond their reasonable control.<br />If for some reason beyond Open Knowledge Foundation's reasonable control, we are unable to or it would not be commercially viable for us to, continue to supply any of our services, we may cease to supply that service, ending any agreement between us for its supply. If we do so, we will return to you a fair proportion of any sum you have paid us in advance for the supply of that service, taking into account the service we have already supplied to you.</p>
    </Fragment>
}

export default TermsOfUse;