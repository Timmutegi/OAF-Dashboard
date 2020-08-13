import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  ID: string;
  claim: any;
  claimForm: FormGroup;
  isLoading = true;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  get f() {
    return this.claimForm.controls;
  }

  ngOnInit() {
    this.ID = this.activatedRoute.snapshot.params.ID;
    this.getClaim();
    this.claimForm = this.formBuilder.group({
      cicApprove: [''],
      bluewave: [''],
      cicReject: [''],
    });
  }

  getClaim() {
    this.api.get('/Claims/' + this.ID).subscribe((res) => {
      this.claim = res;
      this.isLoading = false;
    });
  }

  reviewClaim() {
    // this.reviewData.append('id', this.ID);
    // this.reviewData.append('comment', this.claimForm.get('bluewave').value);
  }

  approveClaim() {
    const comment = JSON.parse(
      JSON.stringify({ comment: this.claimForm.get('cicApprove').value })
    );

    this.api.post('/Claims/' + this.ID + '/approve', comment).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  rejectClaim() {
    const comment = JSON.parse(
      JSON.stringify({ comment: this.claimForm.get('cicReject').value })
    );

    console.log(comment);

    this.api.post('/Claims/' + this.ID + '/reject', comment).subscribe(
      res => {
        console.log(res);
      }
    );
  }
}
