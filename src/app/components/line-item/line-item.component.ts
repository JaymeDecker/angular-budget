import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LineItem } from 'src/app/shared/interfaces/line-items.interface';
import { CalculationService } from 'src/app/shared/services/calculation.service';
import { CalculationModel } from 'src/app/shared/models/calulation.model';
import { Confirmable } from 'src/app/shared/decorators/confimable.decorator';

@Component({
  selector: 'app-line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.css']
})
export class LineItemComponent implements OnInit, OnDestroy {

  private onDestroy$ = new Subject();
  private mCalculation: CalculationModel;

  LineItems: LineItem[];

  @Input() IsIncome: boolean;
  constructor(private calculationService: CalculationService) {
  }

  ngOnInit() {
    this.calculationService.Calculation$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((pData: CalculationModel) => {
        this.mCalculation = pData;
        this.LineItems = (this.IsIncome ? pData.Income.slice() : pData.Expenses.slice());
      });
  }

  getPercentage(pAmount: number) {
    return ((pAmount / this.mCalculation.TotalIncome) * 100).toFixed(3) + '%';
  }

  // @Confirmable('Are you sure you want to delete this item ?')
  onDelete(pIndex: number) {
    this.calculationService.RemoveItem(pIndex, this.IsIncome);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
