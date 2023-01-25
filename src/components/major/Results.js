import React from "react";
import {checkIfThereIsDivisionsData} from "../../utils";
import {hideWarning, showWarning} from "../../redux/slices/warning";
import {useDispatch} from "react-redux";

export default function Results({fete, mainFields, isManagerRich}) {

    const dispatch = useDispatch();

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

        if (!checkIfThereIsDivisionsData(fete, mainFields)) {
            setResultsShown(false);
            dispatch(showWarning());
            setTimeout(() => {
                dispatch(hideWarning())
            }, 2000);
            return;
        }

        setResultsShown(true);
        let sumPreorders = 0;
        let sumOrders = 0;
        for (let i = 0; i < fete.length; i++) {
            sumPreorders += Number(fete[i].preorder);
            sumOrders += Number(fete[i].order);
        }
        setResults(prevResults => ({
                ...prevResults,
                kitchen: Math.floor(sumPreorders / 50),
                bar: Math.floor((sumPreorders / 100 + sumOrders / 100) + Number(mainFields.tables / 10)),
                manager: isManagerRich ? Math.floor(Number(mainFields.money / 10)) : Math.floor(sumPreorders / 100 + sumOrders / 100)
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
