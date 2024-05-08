import { Fragment, useState } from "react"
import { Link, NavLink } from "react-router-dom";
import classes from './Support.module.css'
import i from './i.png'


const Support = () => {
    const [text, setText] = useState('');
    const [isError, setIsError] = useState(false);
    const [succes, setSucces] = useState(false);

    const textHandler = (event) => {
        setText(event.target.value);
    }
    const formHandler = (event) => {
        event.preventDefault();
        submitDataHandler(text);
    }

    const submitDataHandler = async (text) => {
        try {
            await fetch('https://react-http-d2dc0-default-rtdb.firebaseio.com/support.json', {
                method: 'POST',
                body: JSON.stringify({ text }),
            }
            );
            setIsError(false);
            setText('');
            setSucces(true);
        }
        catch (error) {
            setIsError(true);
        }

    }
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
        <section className={classes.supportBox}>
            <p className={classes.text}>If you have encountered difficulties of any kind on our page, please write to us to improve the interaction with our customers, thank you!</p>
            <form onSubmit={formHandler}>
                <textarea id='text' type='text' className={classes.input} value={text} wrap='HARD' onChange={textHandler} ></textarea>
                {text ? <button type='submit' className={classes.validButton}>SUBMIT</button> : <button type='submit' disabled className={classes.invalidButton}>SUBMIT</button>}
            </form>
        </section>
        {isError === true ? <p className={classes.errorPara}>Something went wrong!Please try to submit again.</p> : ''}
        {succes === true ? <p className={classes.succesPara}>Data was successfully sent!</p> : ''}
    </Fragment>
}

export default Support;