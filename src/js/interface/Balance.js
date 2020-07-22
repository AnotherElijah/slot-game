class Balance {
    constructor(container, initialDeposit) {
        this.container = container;
        this.deposit = initialDeposit;
        this.container.addEventListener('input', (e)=>this.changeDeposit(e))
    }
    changeDeposit(newSum = 5000){
        this.deposit = newSum.target?Number(newSum.target.value): Number(this.deposit) + newSum;
        this.container.value = this.deposit;
    }
}
export default Balance;
