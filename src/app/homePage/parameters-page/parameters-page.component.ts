import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parameters-page',
  templateUrl: './parameters-page.component.html',
  styleUrls: ['./parameters-page.component.css']
})
export class ParametersPageComponent implements OnInit {
  id;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
     this.id = this.route.snapshot.paramMap.get('id');
  }

}
