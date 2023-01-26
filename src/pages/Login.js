import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchAdminData} from "../redux/slices/auth";
import {Link, Navigate} from "react-router-dom";
import {clearError} from "../redux/slices/auth";

const Login = () => {

    const dispatch = useDispatch();
    const {data: isAuth, error: authError} = useSelector(store => store.auth);

    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onChange'});

    function formSubmitHandler(values) {
        dispatch(fetchAdminData(values));
    }

    React.useEffect(() => {
        localStorage.setItem('isAuth', JSON.stringify(isAuth))
    }, [isAuth]);

    return isAuth ? <Navigate to='/waiters'/> : (
        <>
            <Link className='home-link' to='/tips'>На главную</Link>
            <form className="login-form" onSubmit={handleSubmit(formSubmitHandler)}>
                <h1>Войти как админ</h1>
                <div className="login-form-fields">
                    <input
                        className={authError ? 'input-error' : ''}
                        type="text"
                        placeholder="Логин"
                        {...register('login', {required: 'Введите логин'})}
                        onChange={() => dispatch(clearError())}
                    />
                    <input
                        className={authError ? 'input-error' : ''}
                        type="text"
                        placeholder="Пароль"
                        {...register('password', {required: 'Введите пароль'})}
                        onChange={() => dispatch(clearError())}
                    />
                </div>
                <button className={`${authError ? 'error' : ''}`} type="submit">Войти</button>
                {(errors.login?.message || errors.password?.message) &&
                    <p className="helper-text">Введите логин и пароль</p>
                }
                <p className="helper-text">{authError}</p>
            </form>
        </>
    );
};

export default Login;