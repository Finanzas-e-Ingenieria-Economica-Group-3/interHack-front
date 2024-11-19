import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Bank } from '../../../models/bank.model';
import { BankService } from '../../../services/bank.service';
import { FormsModule } from '@angular/forms';
import {generate} from "rxjs";

@Component({
  selector: 'app-listarbank',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './listarbank.component.html',
  styleUrl: './listarbank.component.css'
})
export class ListarbankComponent implements OnInit{
  dataSource: MatTableDataSource<Bank> = new MatTableDataSource();
  displayedColumns: string[] = ['bankId',"image", 'name', 'ruc', 'value','type', 'actionSelect'];
  searchId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private bankService: BankService, private router: Router) {}

  ngOnInit(): void {
    this.cargarBancos();
  }

  cargarBancos(): void {
    this.bankService.getBanks();
    this.bankService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  buscarBancoPorId(): void {
    if (this.searchId !== null) {
      this.bankService.getBankById(this.searchId).subscribe(response => {
        const bank = response.data;
        this.dataSource = new MatTableDataSource(bank ? [bank] : []);
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.cargarBancos();
    }
  }

  //hacer bien conectarlo con algo
  seleccionarBanco(id: number): void {
    console.log(`Banco con ID ${id} seleccionado`);
  }

  convert(type:string, period:string):string{
    let value = "T";
    if (type==="NOMINAL") value+="N";
    else value+="E"

    switch (period){
      case "SEMESTRAL": value+="S"; break;
      case "ANUAL": value+="A"; break;
      case "MENSUAL": value+="M"; break;
      case "TRIMESTRAL": value+="T"; break;
    }
    return value;
  }

  convertPercentage(value:number):string{
    let val = "";
    value*=100;
    val=value+"%";
    return val;
  }
  protected readonly generate = generate;
}
