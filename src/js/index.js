import Slot from "./interface/Slot.js";
import Balance from "./interface/Balance";



const slot = new Slot(document.getElementById("slot"));
export const balanceElem = document.getElementById("balance")
export const spinBtn = document.getElementById("spin")
const balance = new Balance(balanceElem, balanceElem.value)
const debug = document.getElementById('debug');
debug.onclick= (e)=>slot.applyDebug(e);

export default balance;
