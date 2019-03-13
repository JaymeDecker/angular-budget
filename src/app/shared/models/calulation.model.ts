import { LineItem } from '../interfaces/line-items.interface';

export class CalculationModel {
    public Salary: number;
    public Income: LineItem[];
    public Expenses: LineItem[];

    public get TotalIncome(): number {
        let total = this.Salary || 0;
        this.Income.forEach((i) => { total += i.Amount; });
        return total;
    }

    public get TotalExpenses(): number {
        let total = 0;
        this.Expenses.forEach((i) => { total += i.Amount; });
        return total;
    }

    constructor(pSalary: number) {
        this.Salary = pSalary;
        this.Income = [];
        this.Expenses = [];
    }
}
