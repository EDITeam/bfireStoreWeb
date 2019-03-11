import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
import * as $ from 'jquery';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  // showHtml: SafeHtml;
  lists = '<button id="bt" _ngcontent-c1 class="btn btn-primary mr-sm-2" (click)="checkFile()">查看</button>';

  constructor(private sanitizer: DomSanitizer) {
   
/*     $(document).ready(function () {
      let htmls = '<h1 style=\'color:red\'>angular中使用有样式的拼写，这是js拼接出来的<h1>';
      $('#divots').html(htmls);
      });
      $(document).ready(function () {
        let htmls = '<li style=\'color:red\'>angular中使用有样式的拼写，这是js拼接出来的<li>';
        $('#ulul').html(htmls);
        });
        $(document).ready(function () {
          $('#bt').click(function () {
            alert("sdsdsd");
            $.get("./text.md", function(response, status, xhr){
              $("#content").html(marked(response));
              });
            /* $.get('./text.md', function(response, status, xhr){
              $("#content").html(marked(response));
          }); */
/*         });
      }); */ 
   }
  aaa = 'sdsd';
  list = [
    {
      businessCode: 'DSX32432424',
      borrowMoney: '233,232.00RMB',
      loanMoney: '233,232.00RMB',
      businessRemarks: '无',
      taxGroup: 'A组',
      basicAmount: '233,232.00RMB',
      allocationRule: '按劳分配'
    },
    {
      businessCode: 'DSX32432424',
      borrowMoney: '233,232.00RMB',
      loanMoney: '233,232.00RMB',
      businessRemarks: '无',
      taxGroup: 'A组',
      basicAmount: '233,232.00RMB',
      allocationRule: '按劳分配'
    },
    {
      businessCode: 'DSX32432424',
      borrowMoney: '233,232.00RMB',
      loanMoney: '233,232.00RMB',
      businessRemarks: '无',
      taxGroup: 'A组',
      basicAmount: '233,232.00RMB',
      allocationRule: '按劳分配'
    },
    {
      businessCode: 'DSX32432424',
      borrowMoney: '233,232.00RMB',
      loanMoney: '233,232.00RMB',
      businessRemarks: '无',
      taxGroup: 'A组',
      basicAmount: '233,232.00RMB',
      allocationRule: '按劳分配'
    }
  ]
  ngOnInit(): void {
    
    this.showHtml = this.sanitizer.bypassSecurityTrustHtml(this.lists);
  }
  checkFile() {
    alert("sdsd");
  }
}
