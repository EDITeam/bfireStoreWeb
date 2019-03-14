import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import * as $ from 'jquery';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {
/*    $(document).ready(function () {
    $("#btn").click(function () {
      alert('sdsd');
          });

        }); */
   }
  ngOnInit() {
  }
}
