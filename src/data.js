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

const data = waiters.map(waiter => new Waiter(waiter));

export {data}
