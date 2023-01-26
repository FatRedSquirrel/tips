import React, {useRef} from 'react';
import Trash from "../../../icons/Trash";

const Employee = ({id, name, showConfirmation, setData}) => {

    const ref = useRef();


    function deleteClickHandler() {
        showConfirmation();
        setData(id, name);
    }

    function employeeClickHandler() {
        if (ref.current.style.transform !== "translate(-55px)") {
            ref.current.style.transform = "translate(-55px)";
        } else {
            ref.current.style.transform = "translate(0)";
        }
    }

    return (
        <div
            onClick={employeeClickHandler}
            ref={ref}
            className="employee"
        >
            <p>{name}</p>
            <button onClick={deleteClickHandler}><Trash/></button>
        </div>
    );
};

export default Employee;