import {nanoid} from "nanoid"

export default class Waiter {
    #name = null;
    #id = nanoid();
    #isChosen = false;
    #hours = 12;
    #hasMoney = 0;
    #toReceive = 0;
    #comment = '';

    constructor(name) {
        this.#name = name;
    }

    get name() {
        return this.#name;
    }
    get id() {
        return this.#id;
    }
    get isChosen() {
        return this.#isChosen;
    }
    get hours() {
        return this.#hours;
    }
    get hasMoney() {
        return this.#hasMoney;
    }
    get toReceive() {
        return this.#toReceive;
    }
    get comment() {
        return this.#comment;
    }

}
