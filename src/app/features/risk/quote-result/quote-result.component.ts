import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

import { EquipmentQuoteResponse, IncomeQuoteResponse } from '../models/risk.model';

@Component({
  selector: 'app-quote-result',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './quote-result.component.html',
  styleUrls: ['./quote-result.component.css']
})
export class QuoteResultComponent {
  @Input() equipmentQuote?: EquipmentQuoteResponse | null;
  @Input() incomeQuote?: IncomeQuoteResponse | null;
}
