import React from 'react';
import {Link} from "react-router-dom";
import Employee from "../components/minor/waiter/Employee";
import {useSelector} from "react-redux";
import NewEmployee from "../components/major/NewEmployee";
import Modal from "../components/minor/Modal";
import axios from "../axios";

const Employees = () => {

    const {waiters} = useSelector(store => store.waiters)

    const [nameToCreate, setNameToCreate] = React.useState('');
    const [dataToRemove, setDataToRemove] = React.useState({});

    const [addConfirmationShown, setAddConfirmationShown] = React.useState(false);
    const [removeConfirmationShown, setRemoveConfirmationShown] = React.useState(false);

    const employeesItems = waiters.map(waiter =>
        <Employee
            key={waiter.id}
            id={waiter.id}
            name={waiter.name}
            showConfirmation={() => setRemoveConfirmationShown(true)}
            setData={(id, name) => setDataToRemove({id, name})}
        />
    );

    function createEmployee() {
        axios.post('/waiters', {name: nameToCreate});
        setAddConfirmationShown(false);
        document.location.reload();
        setNameToCreate('');
    }

    function removeEmployee() {
        axios.delete(`/waiters/${dataToRemove.id}`);
        setRemoveConfirmationShown(false);
    }

    return (
        <div className="employees-list-container">
            <Link className='home-link' to='/tips'>На главную</Link>
            <div className="employees-list">
                <div className="employees-list-inner-container">
                    {employeesItems}
                </div>
            </div>
            <NewEmployee
                showConfirm={() => setAddConfirmationShown(true)}
                onNameChange={(event) => setNameToCreate(event.target.value)}
                name={nameToCreate}
            />
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