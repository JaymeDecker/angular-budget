import { Component, Input } from '@angular/core';
import { CalculationService } from 'src/app/shared/services/calculation.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {

  @Input() IsIncome: boolean;
  constructor(private calculationService: CalculationService) {
  }

  onAdditem() {
    this.calculationService.AddItem(this.IsIncome);
  }

}
