import {nanoid} from "nanoid"
import Waiter from "./Waiter";

const waiters = [
    "Олег",
    "Артем",
    "Лера",
    "Дима Ш.",
    "Носир",
    "Никита А.",
    "Кристина",
    "Рома",
    "Данила",
    "Саша",
    "Люда",
    "Настя",
    "Костя",
    "Нина",
    "Дима К.",
    "Кирилл C.",
    "Андрей",
    "Никита В.",
    "Кирилл Ш.",
    "Марсель"
]

// const data = waiters.map(waiter => ({
//     id: nanoid(),
//     name: waiter,
//     isChosen: false,
//     hours: 12,
//     hasMoney: 0,
//     toReceive: 0
// }))

const data = waiters.map(waiter => new Waiter(waiter));

export {data}
