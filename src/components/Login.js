import React, { useState, useEffect } from 'react';
import styles from './SignUp.module.css';
import { Validate } from './Validate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from './Toastify';
import { Link } from 'react-router-dom';

const SignUp = () => {
    let [data, setData] = useState({
        email: '',
        password: ''
    });

    let [errors, setErrors] = useState({});
    let [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(Validate(data, "Login"));
    }, [data]);

    let changeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    let focusHandler = (e) => {
        setTouched({
            ...touched,
            [e.target.name]: true
        });
    };

    let submitHandler = (e) => {
        e.preventDefault();
        if (!Object.keys(errors).length) {
            notify('success', 'You Loged in sucssesfuly');
        } else {
            notify('error', 'Invalid data');
            setTouched({
                email: true,
                password: true,    
            });
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={submitHandler}>
                <h2>Login</h2>

                <div className={styles.formField}>
                    <label>Email</label>
                    <input
                        className={
                            errors.email && touched.email
                                ? styles.invalid
                                : styles.formInput
                        }
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                    />
                    {errors.email && touched.email && (
                        <span>{errors.email}</span>
                    )}
                </div>
                <div className={styles.formField}>
                    <label>Password</label>
                    <input
                        className={
                            errors.password && touched.password
                                ? styles.invalid
                                : styles.formInput
                        }
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                    />
                    {errors.password && touched.password && (
                        <span>{errors.password}</span>
                    )}
                </div>
                <div className={styles.Buttons}>
                    <Link to="/signup">Sign up</Link>
                    <button type="submit">Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
