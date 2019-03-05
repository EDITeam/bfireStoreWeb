import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.showHtml = this.sanitizer.bypassSecurityTrustHtml("<div style='color:red'>angular中使用有样式的拼写<div>");
  }


}
