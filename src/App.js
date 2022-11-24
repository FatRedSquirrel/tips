import React from 'react';
import './App.css';

function Order(props) {
  return (
      <div className="fete">
        <span>{props.id}</span>
        <input
            type="number"
            min="0"
            id={props.id}
            name="order"
            onChange={props.action}
            value={props.value}/>
      </div>
  )
}

function Preorder(props) {
  return (
      <div className="fete">
        <span>{props.id}</span>
        <input
            type="number"
            min="0"
            id={props.id}
            name="preorder"
            onChange={props.action}
            value={props.value}/>
      </div>
  )
}


function App() {

  const [feteData, setFeteData] = React.useState([{id: 1, preorder: 0, order: 0}])
  const preorders = feteData.map((fete) => <Preorder action={handleFeteChange} key={fete.id} id={fete.id} value={feteData.preorder}/>)
  const orders = feteData.map((fete) => <Order action={handleFeteChange} key={fete.id} id={fete.id} value={feteData.order}/>)

  const add = () => {setFeteData((prevFeteData) => [...prevFeteData, {id: prevFeteData.length + 1, preorder: 0, order: 0}])}

  function handleFeteChange(evt) {
    const {id, value, name} = evt.target;
    setFeteData(prevFeteData => {
      let newFeteData = [];
      for (let i = 0; i < prevFeteData.length; i++) {
        let currentFete = prevFeteData[i];
        if (Number(id) === currentFete.id) {
          currentFete[name] = Number(value);
        }
        newFeteData.push(currentFete);
      }
      return newFeteData;
    })
  }

  const [results, setResults] = React.useState({
    kitchen: 0,
    bar: 0,
    manager: 0,
    tables: 0,
    money: 0,
    isManagerRich: false
  })

  const handleTablesChange = (evt) => setResults(prevResults => ({...prevResults, tables: evt.target.value}))

  function count() {
    let sumPreorders = 0;
    let sumOrders = 0;
    for (let i = 0; i < feteData.length; i++) {
      sumPreorders += feteData[i].preorder;
      sumOrders += feteData[i].order;
    }
    setResults(prevResults => ({
      ...prevResults,
      kitchen: Math.floor(sumPreorders / 50),
      bar: Math.floor((sumPreorders / 100 + sumOrders / 100) + results.tables / 10),
      manager: results.isManagerRich ? Math.floor(results.money / 10) : Math.floor(sumPreorders / 100 + sumOrders / 100)
    }))
  }

  const remove = () => setFeteData(prevFeteData => prevFeteData.slice(0, prevFeteData.length - 1))
  const handleMoneyChange = (evt) => setResults(prevResulst => ({...prevResulst, money: evt.target.value}))
  const onIsManagerRichChange = (evt) => setResults(prevResults => ({...prevResults, isManagerRich: evt.target.checked}))

  return (
      <div className="main">
        <div className="main-top">
          <div className="wrapper">
            <h1>Конверт</h1>
            <input type="number" onChange={handleMoneyChange}/>
          </div>
          <div className="wrapper">
            <h1>Посадка</h1>
            <input type="number" onChange={handleTablesChange}/>
          </div>
        </div>
        <div className="container">
          <div className="inputs-container">
            <h1>Предзаказы</h1>
            <ul>
              {preorders}
            </ul>
          </div>
          <div className="inputs-container">
            <h1>Дозаказы</h1>
            {orders}
          </div>
        </div>
        <button onClick={add} className="button" >+</button>
        <button onClick={remove} className="button minus" >-</button>
        <label>
          <input type="checkbox" checked={results.isManagerRich} onChange={onIsManagerRichChange}/>
          Менеджер с верхами
        </label>
        <button onClick={count} className="button">Посчитать</button>
        <p>кухня {results.kitchen}</p>
        <p>бар {results.bar}</p>
        <p>менеджер {results.manager}</p>
      </div>
  )
}

export default App;
