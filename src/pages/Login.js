import React from 'react';
import Modal from "../components/minor/Modal";
import {useDispatch, useSelector} from "react-redux";
import {openModal, closeModal} from "../redux/slices/modal";

const Login = () => {

    const {isOpen} = useSelector(state => state.modal);
    const dispatch = useDispatch();

    return (
        <div>
            {isOpen && <Modal text='это модалка логина' onCancel={() => dispatch(closeModal())} onConfirm={() => dispatch(closeModal())}/>}
            <button onClick={() => dispatch(openModal())}>открыть</button>
        </div>
    );
};

export default Login;