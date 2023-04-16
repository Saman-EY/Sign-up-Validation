import React, { useState, useEffect } from 'react';
import styles from './SignUp.module.css';
import { Validate } from './Validate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from './Toastify';
import { Link } from 'react-router-dom';

const Login = () => {
    let [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAccepted: false
    });

    let [errors, setErrors] = useState({});
    let [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(Validate(data, 'Register'));
    }, [data]);

    let changeHandler = (e) => {
        if (e.target.name === 'isAccepted') {
            setData({ ...data, [e.target.name]: e.target.checked });
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            });
        }
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
            notify('success', 'You registered sucssesfuly');
        } else {
            notify('error', 'Invalid data');
            setTouched({
                name: true,
                email: true,
                password: true,
                confirmPassword: true,
                isAccepted: true
            });
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={submitHandler}>
                <h2>Sign Up</h2>
                <div className={styles.formField}>
                    <label>Name</label>
                    <input
                        className={
                            errors.name && touched.name
                                ? styles.invalid
                                : styles.formInput
                        }
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                    />
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
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
                <div className={styles.formField}>
                    <label>Confirm Password</label>
                    <input
                        className={
                            errors.confirmPassword && touched.confirmPassword
                                ? styles.invalid
                                : styles.formInput
                        }
                        type="password"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                        <span>{errors.confirmPassword}</span>
                    )}
                </div>
                <div className={styles.formField}>
                    <div className={styles.checkbox}>
                        <label>I accept terms of privacy policy</label>
                        <input
                            type="checkbox"
                            name="isAccepted"
                            value={data.isAccepted}
                            onChange={changeHandler}
                            onFocus={focusHandler}
                        />
                    </div>
                    {errors.isAccepted && touched.isAccepted && (
                        <span>{errors.isAccepted}</span>
                    )}
                </div>

                <div className={styles.Buttons}>
                    <Link to="/login">Login</Link>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
