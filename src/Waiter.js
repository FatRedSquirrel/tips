import {nanoid} from "nanoid"

export default class Waiter {
    constructor(name) {
        this.name = name;
    }
    id = nanoid();
    isChosen = false;
    hours = 12;
    hasMoney = 0;
    toReceive = 0;
}
