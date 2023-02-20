import React from 'react';
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "api";

import Employee from "components/minor/waiter/Employee";
import NewEmployee from "components/major/NewEmployee";
import Modal from "components/minor/Modal";
import Loader from "components/UI/Loader";

import capitalizeWord from "helpers/capitalizeWord";
import {fetchWaiters} from "redux/slices/waiters";
import {EmployeeMessage} from "const";

import style from './index.module.scss';
import classNames from "helpers/classNames";

const Employees = () => {

    const {data: isAuth} = useSelector(store => store.auth);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchWaiters());
    }, []);
    const {isLoaded: isWaitersLoaded} = useSelector(store => store.waiters);

    const {waiters} = useSelector(store => store.waiters)

    const [nameToCreate, setNameToCreate] = React.useState('');
    const [dataToRemove, setDataToRemove] = React.useState({});

    const [addConfirmationShown, setAddConfirmationShown] = React.useState(false);
    const [removeConfirmationShown, setRemoveConfirmationShown] = React.useState(false);
    const [message, setMessage] = React.useState({
        message: '',
        status: ''
    });

    function showMessage(message, status) {
        setMessage({message, status});
        setTimeout(() => {
            setMessage({message: '', status: ''});
        }, 2000);
    }

    const employeesItems = waiters.map(waiter =>
        <Employee
            key={waiter.id}
            id={waiter.id}
            name={waiter.name}
            showConfirmation={() => setRemoveConfirmationShown(true)}
            setData={(id, name) => setDataToRemove({id, name})}
        />
    );

    async function createEmployee() {
        setAddConfirmationShown(false);
        setNameToCreate('');
        try {
            const response = await axios.post('/waiters', {name: capitalizeWord(nameToCreate).trim()});
            if (response.status === 200) {
                showMessage(EmployeeMessage.body.adding.SUCCESS, EmployeeMessage.status.SUCCESS);
                dispatch(fetchWaiters());
            } else {
                showMessage(EmployeeMessage.body.adding.ERROR.DEFAULT, EmployeeMessage.status.ERROR);
            }
        } catch (e) {
            if (e.response.data.error.code === 11000) {
                showMessage(EmployeeMessage.body.adding.ERROR.ALREADY_EXISTING, EmployeeMessage.status.ERROR);
            } else {
                showMessage(EmployeeMessage.body.adding.ERROR.DEFAULT, EmployeeMessage.status.ERROR);
            }
        }
    }

    async function removeEmployee() {
        setRemoveConfirmationShown(false);
        try {
            const response = await axios.delete(`/waiters/${dataToRemove.id}`);
            if (response.status === 200) {
                showMessage(EmployeeMessage.body.removing.SUCCESS, EmployeeMessage.status.SUCCESS);
                dispatch(fetchWaiters());
            } else {
                showMessage(EmployeeMessage.body.removing.ERROR, EmployeeMessage.status.ERROR);
            }
        } catch (e) {
            showMessage(EmployeeMessage.body.removing.ERROR, EmployeeMessage.status.ERROR);
        }
    }

    if (!isAuth) {
        return <Navigate to='/login'/>;
    }

    const errorClass = message.status === EmployeeMessage.status.ERROR ? style.error : '';

    return !isWaitersLoaded ? <Loader/> : (
        <div className={style.employeesList__container}>
            <Link className='home-link' to='/tips'>На главную</Link>
            <div className={style.employeesList}>
                <div className={style.employeesList__innerContainer}>
                    {employeesItems}
                </div>
            </div>
            <div style={{width: "260px"}}>
                <NewEmployee
                    showConfirm={() => setAddConfirmationShown(true)}
                    onNameChange={(event) => setNameToCreate(event.target.value)}
                    name={nameToCreate}
                />
                <p className={classNames(style.employeesList__message, errorClass)}>
                    {message.message}
                </p>
            </div>
            {addConfirmationShown &&
                <Modal
                    text={`Добавить ${nameToCreate} в список сотрудников?`}
                    onConfirm={createEmployee}
                    onCancel={() => setAddConfirmationShown(false)}
                />
            }
            {removeConfirmationShown &&
                <Modal
                    text={`Удалить ${dataToRemove.name} из списка сотрудников?`}
                    onConfirm={removeEmployee}
                    onCancel={() => setRemoveConfirmationShown(false)}
                />
            }
        </div>
    );
};

export default Employees;
