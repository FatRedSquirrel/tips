import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchAdminData} from "../redux/slices/auth";
import {Link, Navigate} from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch();
    const {data: isAuth} = useSelector(store => store.auth);

    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onChange'});

    function formSubmitHandler(values) {
        dispatch(fetchAdminData(values));
    }

    return isAuth ? <Navigate to='/waiters'/> : (
        <>
            <Link className='home-link' to='/tips'>На главную</Link>
            <form className="login-form" onSubmit={handleSubmit(formSubmitHandler)}>
                <h1>Войти как админ</h1>
                <div className="login-form-fields">
                    <input
                        className={errors.login?.message ? 'input-error' : ''}
                        type="text"
                        placeholder="Логин"
                        {...register('login', {required: 'Введите логин'})}
                    />
                    <input
                        className={errors.password?.message ? 'input-error' : ''}
                        type="text"
                        placeholder="Пароль"
                        {...register('password', {required: 'Введите пароль'})}
                    />
                    {(errors.login?.message || errors.password?.message) &&
                        <p className="helper-text">Введите логин и пароль</p>
                    }
                </div>
                <button type="submit">Войти</button>
            </form>
        </>
    );
};

export default Login;