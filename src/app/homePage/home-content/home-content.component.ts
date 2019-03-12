import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  fileUrl;
  constructor(private sanitizer: DomSanitizer) {
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
  ngOnInit() {
    const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
  download() {
    let x = new XMLHttpRequest();
    x.open('GET', './assets/cite/img/lufei.jpg', true);
    x.responseType = 'blob';
    x.onload = function(e) { download(x.response, 'lufei.jpg'); };
    x.send();
  }
}
