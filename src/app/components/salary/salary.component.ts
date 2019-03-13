import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalculationService } from 'src/app/shared/services/calculation.service';
import { takeUntil } from 'rxjs/operators';
import { CalculationModel } from 'src/app/shared/models/calulation.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit, OnDestroy {

  private onDestroy$ = new Subject();
  Calculation: CalculationModel;
  Currency: string;

  constructor(private calculationService: CalculationService) { }

  ngOnInit() {
    this.Currency = this.calculationService.CurrencySymbol;

    this.calculationService.Calculation$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((pData: CalculationModel) => {
        this.Calculation = pData;
      });
  }

  salaryChanged(pValue: number) {
    this.calculationService.SalaryChanged(pValue);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
