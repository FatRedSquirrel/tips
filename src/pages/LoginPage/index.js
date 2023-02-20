import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchAdminData} from "redux/slices/auth";
import {Link, Navigate} from "react-router-dom";
import {clearError, setError} from "redux/slices/auth";

import style from './index.module.scss';

const Login = () => {

    const dispatch = useDispatch();
    const {data: isAuth, error: authError} = useSelector(store => store.auth);

    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onChange'});

    const submitButtonRef = React.useRef();
    async function formSubmitHandler(values) {
        dispatch(fetchAdminData(values))
            .then(data => {
                if (data.error) {
                    dispatch(setError('Не удалось авторизоваться'));
                }
                if (submitButtonRef.current) {
                    submitButtonRef.current.textContent = 'Войти';
                }
            });
        submitButtonRef.current.disabled = true;
        submitButtonRef.current.textContent = 'Авторизация...';
    }

    return isAuth ? <Navigate to='/waiters'/> : (
        <>
            <Link className='home-link' to='/tips'>На главную</Link>
            <form className={style.loginForm} onSubmit={handleSubmit(formSubmitHandler)}>
                <h1>Войти как админ</h1>
                <div className={style.loginForm__fields}>
                    <input
                        className={authError ? style.inputError : ''}
                        type="text"
                        placeholder="Логин"
                        {...register('login', {required: 'Введите логин'})}
                        onChange={() => dispatch(clearError())}
                    />
                    <input
                        className={authError ? style.inputError : ''}
                        type="text"
                        placeholder="Пароль"
                        {...register('password', {required: 'Введите пароль'})}
                        onChange={() => dispatch(clearError())}
                    />
                </div>
                <button
                    onClick={() => dispatch(clearError())}
                    ref={submitButtonRef}
                    className={`${authError ? style.error : ''}`}
                    type="submit"
                    disabled={!!authError}
                >Войти</button>
                {(errors.login?.message || errors.password?.message) &&
                    <p className={style.helperText}>Введите логин и пароль</p>
                }
                <p className={style.helperText}>{authError}</p>
            </form>
        </>
    );
};

export default Login;