import React from "react";
import {checkIfThereIsDivisionsData} from "../../utils";

export default function Results({feteData, additionalFields, isManagerRich, showWarning}) {

    //Объект с результатами вычислений
    const [results, setResults] = React.useState({
        kitchen: 0,
        bar: 0,
        manager: 0
    });

    //Вспомогательное состояние для условного рендера блока с результатами
    const [resultsShown, setResultsShown] = React.useState(false);

    //Функция для получения финальных значений
    function countDivisions() {

        if (!checkIfThereIsDivisionsData(feteData, additionalFields)) {
            setResultsShown(false);
            showWarning();
            return;
        }

        setResultsShown(true);
        let sumPreorders = 0;
        let sumOrders = 0;
        for (let i = 0; i < feteData.length; i++) {
            sumPreorders += Number(feteData[i].preorder);
            sumOrders += Number(feteData[i].order);
        }
        setResults(prevResults => ({
                ...prevResults,
                kitchen: Math.floor(sumPreorders / 50),
                bar: Math.floor((sumPreorders / 100 + sumOrders / 100) + Number(additionalFields.tables / 10)),
                manager: isManagerRich ? Math.floor(Number(additionalFields.money / 10)) : Math.floor(sumPreorders / 100 + sumOrders / 100)
            }
        ))
    }

    return (
        <>
            <button onClick={countDivisions} className="button count">Посчитать отчисления</button>
            {resultsShown && <div className="results">
                <p><span className="division">кухня:</span> <span className="division-tips">{results.kitchen}</span></p>
                <p><span className="division">бар:</span> <span className="division-tips">{results.bar}</span></p>
                <p><span className="division">менеджер:</span> <span className="division-tips">{results.manager}</span>
                </p>
            </div>}
        </>

    )
}
