import React from "react";

export default function Results(props) {
    return (
        <div className="results">
            <p><span className="division">кухня:</span> <span className="division-tips">{props.kitchen}</span></p>
            <p><span className="division">бар:</span> <span className="division-tips">{props.bar}</span></p>
            <p><span className="division">менеджер:</span> <span className="division-tips">{props.manager}</span></p>
        </div>
    )
}
