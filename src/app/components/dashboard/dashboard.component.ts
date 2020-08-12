import { Component, OnInit, ViewChild } from '@angular/core';
import { ExportType } from 'mat-table-exporter';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

export interface Data {
  createdAt: Date;
}

const ELEMENT_DATA: Data[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  exportType: ExportType.XLSX;
  isLoading = true;
  minDate: Date;
  maxDate: Date;
  total: number;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = [
    'index',
    'firstName',
    'lastName',
    'mobileNumber',
    'idNumber',
    'status',
    'createdAt',
    'Actions'
  ];

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() {
    const fromDate = new Date(this.filterForm.get('fromDate').value);
    return fromDate;
  }
  get toDate() {
    const toDate = new Date(this.filterForm.get('toDate').value);
    toDate.setDate(toDate.getDate() + 1);
    return toDate;
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getClaims();
    this.totalClaims();
    this.maxDate = new Date();
    this.minDate = new Date(2020, 1, 8);
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
        return data.createdAt >= this.fromDate && data.createdAt <= this.toDate;
      }
      return true;
    };
  }

  getClaims() {
    this.api.get('/Claims').subscribe(
      res => {
        console.log(res);
        res.forEach((element: { createdAt: string | number | Date; }) => {
          element.createdAt = new Date(element.createdAt);
        });
        this.isLoading = false;
        this.dataSource.data = res;
      }
    );
  }

  totalClaims() {
    this.api.get('/claims/count').subscribe(
      res => {
        console.log(res);
        this.total = res.count;
      }
    );
  }

  pendingClaims() {
    this.api.get('/claims/count').subscribe(
      res => {
        console.log(res);
      }
    );
  }

  applyFilter1() {
    this.dataSource.filter = '' + Math.random();
  }

  reset() {
    this.filterForm.reset();
    this.dataSource.filter = '';
  }

  getRecord(ID: string) {
    this.router.navigate([`details/${ID}`]);
  }

}
