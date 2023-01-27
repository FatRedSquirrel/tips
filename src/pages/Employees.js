import React from 'react';
import {Link, Navigate} from "react-router-dom";
import Employee from "../components/minor/waiter/Employee";
import {useDispatch, useSelector} from "react-redux";
import NewEmployee from "../components/major/NewEmployee";
import Modal from "../components/minor/Modal";
import axios from "../axios";
import {fetchWaiters} from "../redux/slices/waiters";
import Loading from "../components/minor/Loading";
import {capitalizeWord} from "../utils";
import {EmployeeMessage} from "../const";

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
                showMessage(EmployeeMessage.body.adding.ERROR, EmployeeMessage.status.ERROR);
            }
        } catch (e) {
            showMessage(EmployeeMessage.body.adding.ERROR, EmployeeMessage.status.ERROR);
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

    return !isWaitersLoaded ? <Loading/> : (
        <div className="employees-list-container">
            <Link className='home-link' to='/tips'>На главную</Link>
            <div className="employees-list">
                <div className="employees-list-inner-container">
                    {employeesItems}
                </div>
            </div>
            <div style={{width: "260px"}}>
                <NewEmployee
                    showConfirm={() => setAddConfirmationShown(true)}
                    onNameChange={(event) => setNameToCreate(event.target.value)}
                    name={nameToCreate}
                />
                <p
                    className={`employees-list-message ${message.status === EmployeeMessage.status.ERROR ? 'error' : ''}`}
                >
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