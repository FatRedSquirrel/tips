import {nanoid} from "nanoid"

export default class Waiter {
    id = nanoid();
    isChosen = false;
    hours = 12;
    hasMoney = 0;
    toReceive = 0;
    comment = '';

    constructor(name) {
        this.name = name;
    }
}
