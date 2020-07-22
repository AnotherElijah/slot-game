import Reel from "./Reel.js";
import {TIMEOUT, WIN_EFFECT, WIN_EFFECT_2} from "../shared/constants";
import {currentSymbols, generateNewSlots} from "../shared/combinations";
import {checkForWins} from "../Checking";
import {winCombinations} from "../shared/Win-combinations";
import balance, {balanceElem, spinBtn} from "../index";

export default class Slot {
    constructor(domElement) {
        this.debugMode = false;
        this.speed = 5;
        this.container = domElement;
        this.currentSymbols = currentSymbols;
        this.newSymbols = generateNewSlots(debug);
        this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
            (reelContainer, i) =>
                new Reel(reelContainer, i, this.currentSymbols[i])
        );
        this.spinButton = document.getElementById("spin");
        this.spinButton.addEventListener("click", () => this.spin());
    }

    applyDebug(e) {
        this.debugMode = true;
        const combination = e.target.value;

        if (combination !== undefined) this.newSymbols = winCombinations.get(combination);
    }

    renderSymbols(reel, i) {
        return new Promise(resolve => {
                for (let n = 0; n < this.speed; n++) {
                    reel.renderBeforeSpin(
                        n === 0 ?
                            Reel.startFrom(currentSymbols[i]) : 0,
                        n === this.speed - 1 ?
                            Reel.finishAfter(this.newSymbols[i]) : undefined,
                        this.newSymbols
                    );
                }
                setTimeout(() => {
                    this.animateElems(this.newSymbols[i], reel.symbolContainer.childNodes)
                }, TIMEOUT)
                setTimeout(() => {
                    spinBtn.disabled = false;
                }, TIMEOUT*2)
                resolve()
            }
        )
    }

    spin() {
        balance.changeDeposit(-1)
        this.newSymbols = !this.debugMode ? generateNewSlots() : this.newSymbols;
        setTimeout(() => {
            checkForWins(this.newSymbols)
        }, TIMEOUT)

        spinBtn.disabled = true;
        return (
            this.reels.map((reel, i) => {
                this.renderSymbols(reel, i).then(() => reel.animation(this.newSymbols[i][0].score))
            })
        )

    }

    animateElems(newSlot, imgs) {
        for (let i = imgs.length - 4, n = 0; i < imgs.length - 1; i++, n++) {

            if (newSlot[n].effect) {
                imgs[i + 1].classList.add(WIN_EFFECT)
                setTimeout(() => {
                    imgs[i + 1].classList.remove(WIN_EFFECT)
                }, TIMEOUT - 1000)
            }
        }
    }

    static balanceWinAnimation() {
        balanceElem.classList.add(WIN_EFFECT_2);
        setTimeout(() => {
            balanceElem.classList.remove(WIN_EFFECT_2);
        }, TIMEOUT)
    }
}
