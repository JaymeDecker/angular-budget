import { Injectable } from '@angular/core';
import { CalculationModel } from '../models/calulation.model';
import { LineItem } from '../interfaces/line-items.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  // !NOTE: Calculation$ manages the data for the entire app

  // Private to disable setting values from outside the service
  private mCalculation$ = new BehaviorSubject<CalculationModel>(new CalculationModel(0));

  // Only allow getting of the BehaviorSubject
  public get Calculation$(): Observable<CalculationModel> {
    return this.mCalculation$.asObservable();
  }

  get CurrencySymbol(): string {
    return 'R ';
  }

  constructor() {
  }

  SalaryChanged(pSalary: number) {
    this.mCalculation$.value.Salary = pSalary || 0;
    this.next();
  }

  AddItem(pIsIncome: boolean) {

    const item: LineItem = { Name: '', Amount: null, Description: '' };

    if (pIsIncome) {
      this.mCalculation$.value.Income.push(item);
    } else {
      this.mCalculation$.value.Expenses.push(item);
    }
    this.next();
  }

  RemoveItem(pIndex: number, pIsIncome: boolean) {
    if (pIsIncome) {
      this.mCalculation$.value.Income.splice(pIndex, 1);
    } else {
      this.mCalculation$.value.Expenses.splice(pIndex, 1);
    }
    this.next();
  }

  Clear() {
    this.mCalculation$.next(new CalculationModel(0));
  }

  GetBudget() {
    return this.mCalculation$.getValue();
  }

  SetBudget(pData: CalculationModel) {
    Object.keys(pData).forEach(key => this.mCalculation$.value[key] = pData[key]);
    this.next();
  }

  private next() {
    this.mCalculation$.next(this.mCalculation$.getValue());
  }

}
