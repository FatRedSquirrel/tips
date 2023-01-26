import React, {useRef} from 'react';
import Trash from "../../../icons/Trash";
import axios from "../../../axios";

const Employee = ({id, name, showConfirmation, setData}) => {

    const ref = useRef();
    let downX;

    const onPointerMove = (e) => {
        const newX = e.clientX;
        if (newX - downX < -6) {
            ref.current.style.transform = "translate(-55px)";
            setTimeout(() => {
                ref.current.style.transform = "translate(0)";
            }, 2000);
        } else {
            ref.current.style.transform = "translate(0)";
        }
    }

    const onPointerDown = (e) => {
        downX = e.clientX;
        ref.current.addEventListener('pointermove', onPointerMove);
    }

    const onPointerUp = () => ref.current.removeEventListener('pointermove', onPointerMove);

    function deleteClickHandler() {
        showConfirmation();
        setData(id, name);
    }

    return (
        <div
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            ref={ref}
            className="employee"
        >
            <p>{name}</p>
            <button onClick={deleteClickHandler}><Trash/></button>
        </div>
    );
};

export default Employee;