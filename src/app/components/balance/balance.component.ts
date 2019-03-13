import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CalculationModel } from 'src/app/shared/models/calulation.model';
import { CalculationService } from 'src/app/shared/services/calculation.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit, OnDestroy {

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

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
