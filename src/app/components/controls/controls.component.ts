import { Component, OnInit, Renderer2 } from '@angular/core';
import { CalculationService } from 'src/app/shared/services/calculation.service';
import { CalculationModel } from 'src/app/shared/models/calulation.model';
import { ToastrService } from 'ngx-toastr';
import { Confirmable } from 'src/app/shared/decorators/confimable.decorator';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  constructor(
    private calculationService: CalculationService,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.load();
  }

  @Confirmable('Are you sure you want to clear all data ?')
  clear() {
    this.calculationService.Clear();
  }

  @Confirmable('Confirm Save ?')
  save(): boolean {
    const data = this.calculationService.GetBudget();
    localStorage.setItem('budget', JSON.stringify(data));

    const budget = JSON.parse(localStorage.getItem('budget')) as CalculationModel;
    if (budget) {
      this.toastr.success('Budget Saved', 'Saved');
      return true;
    }

    this.toastr.error('Budget Save Failed', 'Failed');
    return false;
  }

  load() {
    const data = localStorage.getItem('budget');
    if (data) {
      this.toastr.info('Budget Loaded', 'Loaded');
      this.calculationService.SetBudget(JSON.parse(data) as CalculationModel);
    }
  }

  createFile() {
    if (this.save()) {
      let text: string;
      let incTotal = 0;
      let expTotal = 0;

      const data = localStorage.getItem('budget');
      const budget = JSON.parse(data) as CalculationModel;
      if (!budget) {
        return;
      }

      text = '<h3>INCOME:</h3>';
      incTotal = budget.Salary;
      text += '<p><b>Salary</b>: ' + this.calculationService.CurrencySymbol + ' ' + budget.Salary + '</p>';
      budget.Income.forEach(I => {
        text += '<p><b>' + I.Name + '</b>: '
              + (this.calculationService.CurrencySymbol + ' ' + (I.Amount || 0))
              + ' - ' + I.Description + '</p>';
        incTotal += (I.Amount || 0);
      });
      text += '<h3>Total: ' + incTotal.toFixed(2) + '</h3>';


      text += '<br>';
      text += '<h3>EXPENSES:</h3>';
      budget.Expenses.forEach(I => {
        text += '<p><b>' + I.Name + '</b>: '
              + (this.calculationService.CurrencySymbol + ' ' + (I.Amount || 0))
              + ' - ' + I.Description + '</p>';
        expTotal += (I.Amount || 0);
      });
      text += '<h3>Total: ' + expTotal.toFixed(2) + '</h3>';

      text += '<br>';
      text += '<h2>BALANCE:' + this.calculationService.CurrencySymbol + ' ' + (incTotal - expTotal).toFixed(2) + '<h2>';

      this.downloadFile(text, '.html');
    }
  }

  downloadFile(pString: string, pExtention: string) {

    // TODO: change this methods code.

    const a = document.createElement('a');
    window.document.body.appendChild(a);

    this.renderer.setStyle(a, 'display', 'none');

    const date = new Date();
    const fileName = 'Budget_' + date.getMonth() + '_' + date.getFullYear() + pExtention;
    const blob = new Blob([pString], { type: 'application/text' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = fileName;
    a.click();

    // manually revoke the object URL to avoid memory leaks.
    window.URL.revokeObjectURL(url);
  }

}
