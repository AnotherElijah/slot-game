import {DIMENSION, SYMBOLS_STEP} from "../shared/constants";

const cache = {};

export default class Symbol {
    constructor(name) {
        this.name = name;
        this.createImg(name);
        cache[name] = this.symbol;
    }

    createImg(name) {
        if (cache[name]) {
            return this.symbol = cache[name].cloneNode();
        }
        this.symbol = new Image();
        this.symbol.height = DIMENSION.HEIGHT_IMG.NUMBER;
        return this.symbol.src = require(`../../assets/symbols/${name}.png`).default;
    }

    static get symbolOrder() {
        return [
            ...SYMBOLS_STEP
        ];
    }
}
