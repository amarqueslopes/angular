import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent implements OnInit {
  invoices: Invoice[] = [];

  clientNames: FormControl<string[] | null> = new FormControl<string[]>([]);
  clientNameList: string[] = ['Park Street', 'Google', 'Amazon', 'Apple'];

  displayedColumns = ['invoiceNumber', 'clientName', 'postedDate', 'status', 'value', 'actions'];

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.loadInvoices([]);
  }
  
  loadInvoices(clientNames: string[]): void {
    this.invoiceService.getAll(clientNames).subscribe(invoices => {

      invoices.forEach(function(invoice) {
        invoice.value = 0;
        if(invoice.products) {
          for (let i = 0; i < invoice.products?.length; i++) {
            let qty: number = invoice.products[i].qty ?? 0;
            let price: number = invoice.products[i].price ?? 0;
            if(invoice.products[i].qty && invoice.products[i].price)
              invoice.value += qty * price;
          }
        }
    });
      this.invoices = invoices;
    });
  }

  applyFilters(): void {
    const values: string[] = this.clientNames.value ? this.clientNames.value : [];
    this.loadInvoices(values);
  }
}