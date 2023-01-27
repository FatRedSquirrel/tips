import React from "react";
import {checkIfThereIsDivisionsData} from "../../utils";
import {hideWarning, showWarning} from "../../redux/slices/warning";
import {useDispatch, useSelector} from "react-redux";
import Close from "../../icons/Close";

export default function Results() {

    const dispatch = useDispatch();

    const {isManagerRich} = useSelector(store => store.mainFields.mainFields);
    const {mainFields} = useSelector(store => store.mainFields);
    const {fete} = useSelector(store => store.fete);

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

        let sumPreorders = fete.reduce((a, b) => a + +b.preorder, 0);
        let sumOrders = fete.reduce((a, b) => a + +b.order, 0);

        setResultsShown(true);
        setResults({
                kitchen: Math.floor(sumPreorders / 50),
                bar: Math.floor((sumPreorders / 100 + sumOrders / 100) + Number(mainFields.tables / 10)),
                manager: isManagerRich ? Math.floor(Number(mainFields.money / 10)) : Math.floor(sumPreorders / 100 + sumOrders / 100)
            }
        )
    }

    return (
        <>
            <button onClick={countDivisions} className="button count">Показать результаты</button>
            {resultsShown &&
                <div className="modal">
                    <div className="results">
                        <p><span className="division">кухня:</span> <span
                            className="division-tips">{results.kitchen}</span></p>
                        <p><span className="division">бар:</span> <span className="division-tips">{results.bar}</span>
                        </p>
                        <p><span className="division">менеджер:</span> <span
                            className="division-tips">{results.manager}</span>
                        </p>
                        <button onClick={() => setResultsShown(false)}><Close/></button>
                    </div>
                </div>
            }
        </>

    )
}
