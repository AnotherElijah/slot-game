import {SYMBOLS, SYMBOLS_STEP} from "./constants";

export const currentSymbols = [
    [
        { symbol: SYMBOLS.ONE_BAR, score: false },
        { symbol: SYMBOLS.ONE_BAR, score: false },
        { symbol: SYMBOLS.ONE_BAR, score: false },
    ],
    [
        { symbol: SYMBOLS.ONE_BAR, score: false },
        { symbol: SYMBOLS.ONE_BAR, score: false },
        { symbol: SYMBOLS.ONE_BAR, score: false },
    ],
    [
        { symbol: SYMBOLS.ONE_BAR, score: false },
        { symbol: SYMBOLS.ONE_BAR, score: false },
        { symbol: SYMBOLS.ONE_BAR, score: false },
    ],
];

export function randomNum(min = 0, max = 5) {
    return Math.floor(Math.random() * (max - min) + min)
}

function isScoreOnSide(){
    return randomNum(1, 5)%2===0?true:false;
}

function consumRandomScore(i, scoreOnSide){
    return (i===1||i===2) === scoreOnSide
}

export function generateCombination(num = 3) {
    const symbols = [];
    let randIdx = randomNum();
    const scoreOnSide = isScoreOnSide();

    for (let i = 0; i < num; i++) {
        symbols.push({symbol: SYMBOLS_STEP[randIdx], score: consumRandomScore(i, scoreOnSide)});
        randIdx += 1;
        if (randIdx > SYMBOLS_STEP.length - 1) randIdx = 0;
    }
    return symbols
}

export function generateNewSlots(debug, reels = 3) {
    let slots = [];
    for (let i = 0; i < reels; i++) {
        slots[i] = [];
        slots[i].push(...generateCombination());
    }
    return slots;
}
