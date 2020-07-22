import Symbol from "./Symbol.js";
import {DIMENSION, WIN_EFFECT} from "../shared/constants";

export default class Reel {

    constructor(reelContainer, id, currentSymbols) {
        this.reelContainer = reelContainer;
        this.symbolContainer = document.createElement("div");
        this.symbolContainer.classList.add("icons");
        this.reelContainer.appendChild(this.symbolContainer);
        currentSymbols.forEach(symbol => this.symbolContainer.appendChild(new Symbol(symbol.symbol).symbol));
    }

    animation(isFirstIconScored) {
        setTimeout(() => {
            const centralize = isFirstIconScored?
                (DIMENSION.HEIGHT_IMG.NUMBER+DIMENSION.GAP.NUMBER)*2+(DIMENSION.HEIGHT_IMG.NUMBER+DIMENSION.GAP.NUMBER)/2
                :(DIMENSION.HEIGHT_IMG.NUMBER+DIMENSION.GAP.NUMBER)*2;
            this.translateY = this.symbolContainer.clientHeight - centralize;
            this.symbolContainer.style.transform = `translateY(${-(this.translateY)}px)`;
        }, 100)
    }

    renderBeforeSpin(startFrom = 0, finishAfter = Number.POSITIVE_INFINITY, newSymbols) {

        Symbol.symbolOrder.forEach((symbol, i) => {
            finishAfter = finishAfter === undefined ? Number.POSITIVE_INFINITY : finishAfter;

            if (i >= startFrom - 1 && i <= finishAfter) {
                const newSymbol = new Symbol(symbol).symbol;
                if(symbol.effect) newSymbol.className = WIN_EFFECT;
                return this.symbolContainer.appendChild(newSymbol)
            }
        })


    }
    static startFrom(currentSlot) {
        const lastSlotSymbol = this.findLastSlotSymbol(currentSlot);
        let lastIndexInOrder = Symbol.symbolOrder.lastIndexOf(lastSlotSymbol) + 2;
        if (!Symbol.symbolOrder[lastIndexInOrder]) {
            lastIndexInOrder = (Symbol.symbolOrder.lastIndexOf(lastSlotSymbol) + 2) - Symbol.symbolOrder.lastIndexOf(lastSlotSymbol);
        }
        return lastIndexInOrder;
    }

    static finishAfter(newSlot) {
        const lastSlotSymbol = this.findLastSlotSymbol(newSlot);
        const idx = Symbol.symbolOrder.lastIndexOf(lastSlotSymbol)
        return idx;
    }

    static findLastSlotSymbol(slot) {
        const lastIdx = slot.length - 1;
        return slot[lastIdx].symbol;
    }

}
