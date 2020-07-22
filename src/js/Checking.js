import {POSITION, SYMBOLS, WIN_EFFECT} from "./shared/constants";
import balance from "./index";
import Slot from "./interface/Slot";

export function checkForWins(nextSlots) {
    const checkResult = symbolsMatches(nextSlots, lanesMatches(nextSlots));
    if(checkResult.length!==0) Slot.balanceWinAnimation();
    if(checkResult.length===2){
        centralLineWin(checkResult[0].symbol)
    }else if(checkResult.length===4){
        topLineWin(checkResult[0].symbol)
        bottomLineWin(checkResult[2].symbol)
    }
}

function centralLineWin(symbol){
    let payment = 0;
    switch(symbol){
        case SYMBOLS.ONE_BAR:
            payment = 10;
            break
        case SYMBOLS.TWO_BAR:
            payment = 20;
            break
        case SYMBOLS.THREE_BAR:
            payment = 50;
            break
        case SYMBOLS.SEVEN:
            payment = 150;
            break
        case SYMBOLS.CHERRY:
            payment = 1000;
            break
    }
    balance.changeDeposit(payment)
}
function topLineWin(symbol){
    let payment = 0;
    switch(symbol){
        case SYMBOLS.ONE_BAR:
            payment = 10;
            break
        case SYMBOLS.TWO_BAR:
            payment = 20;
            break
        case SYMBOLS.THREE_BAR:
            payment = 50;
            break
        case SYMBOLS.SEVEN:
            payment = 150;
            break
        case SYMBOLS.CHERRY:
            payment = 2000;
            break
    }
    balance.changeDeposit(payment)
}
function bottomLineWin(symbol){
    let payment = 0;
    switch(symbol){
        case SYMBOLS.ONE_BAR:
            payment = 10;
            break
        case SYMBOLS.TWO_BAR:
            payment = 20;
            break
        case SYMBOLS.THREE_BAR:
            payment = 50;
            break
        case SYMBOLS.SEVEN:
            payment = 150;
            break
        case SYMBOLS.CHERRY:
            payment = 4000;
            break
    }
    balance.changeDeposit(payment)
}
function lanesMatches(nextSlots){
    const isLaneMatch = nextSlots[0][0].score === nextSlots[1][0].score && nextSlots[0][0].score === nextSlots[2][0].score;
    return isLaneMatch? nextSlots[0][0].score? POSITION.CENTER: POSITION.SIDE: false;
}

function symbolsMatches (nextSlots, position){
    let match = [];
    let matches = 0;
    if(position===POSITION.CENTER){
        nextSlots.reduce((acc, curr) => {
            if(curr[1].symbol === acc[1].symbol){
                matches++;
                match.push(
                    {
                        isMatch: true,
                        symbol: curr[1].symbol
                    });
                if(matches===2) addWinEffect(nextSlots, 1)
                return curr
            }else{
                match=false;

                return curr
            }
        })
    }else if(position===POSITION.SIDE){
        nextSlots.reduce((acc, curr) => {
            if(curr[1].symbol === acc[1].symbol){
                matches++;
                match.push(
                    {
                        isMatch: true,
                        symbol: curr[1].symbol
                    });
                if(matches===2) addWinEffect(nextSlots, 1)
                return curr
            }else{
                match=false;

                return curr
            }
        })
        nextSlots.reduce((acc, curr, i) => {
            if(curr[2].symbol === acc[2].symbol){
                matches++;
                match.push(
                    {
                        isMatch: true,
                        symbol: curr[2].symbol
                    });
                if(matches===4) addWinEffect(nextSlots, 2)
                return curr
            }else{
                match=false;

                return curr
            }
        })
    }
    return match
}

function addWinEffect(slots, idx){
    slots.forEach(item=>item[idx].effect = WIN_EFFECT)
}
