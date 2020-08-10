import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  ID: string;
  claim: any;
  isLoading = true;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.ID = this.activatedRoute.snapshot.params.ID;
    this.getClaim();
  }

  getClaim() {
    this.api.get('/Claims/' + this.ID).subscribe(
      res => {
        this.claim = res;
        this.isLoading = false;
      }
    );
  }

}
