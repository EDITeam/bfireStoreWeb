import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-parameters-page',
  templateUrl: './parameters-page.component.html',
  styleUrls: ['./parameters-page.component.css']
})
export class ParametersPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  fileName; // 文件名称
  fileUrl; // 文件路径
  addContent: forContent;
  // 文件夹内容
  list = [
  ]

  ngOnInit() {
     this.getFileUrl(this.route.snapshot.paramMap.get('id'));
     this.getFileName(this.route.snapshot.paramMap.get('id'));
     this.collectNavigations(this.fileUrl);
  }
    // 截取文件路径
    getFileUrl(id){
      let cruxName = id.substring(0, id.length - 2);
      let arrs = cruxName.split('**');
      let fileUrls = '';
      for (let i = 0; i < arrs.length ; i++) {
        fileUrls += arrs[i];
        fileUrls += '\\';
      }
      this.fileUrl = fileUrls;
    }
  // 截取文件名
  getFileName(id){
    try {
      let cruxName = id.substring(0,id.length - 2);
      let arrs = cruxName.split('**');
      let arrsum = arrs.length - 1;
      this.fileName = arrs[arrsum];
    } catch (e) {
      alert(e);
    }
  }
// 读取文件夹内容
  collectNavigations(path) {
     try {
       let fso = new ActiveXObject('Scripting.FileSystemObject');
       let s = fso.GetFolder(path);
       let fn = new Enumerator(s.files);
       for (; !fn.atEnd(); fn.moveNext()) {
         /* let consturlPath =  fn.item() + '\\'; */
         let fileNames = fn.item().Name;
         let fileSizes = fso.GetFile(fn.item()).size;
         fileSizes = fileSizes / 1048576;
         fileSizes = fileSizes.toFixed(2);
         fileSizes += 'M';
          this.addContent = {
          fileName: fileNames,
          fileSize: fileSizes,
        };
        this.list.push(this.addContent);
        }
      } catch (t) {
        alert(t);
      }
    }
    // 下载文件
    downloadFile() {
      let checkVal = '';
      checkVal = '';
      $('input:checkbox[name=\'cheFile\']:checked').each(function(k) {
          checkVal += $(this).val();
          checkVal += ',';
    });
    //checkVal = this.getDownloadFileUrl();
    if (checkVal !== '') {
      checkVal = checkVal.substring(0, checkVal.length - 1);
      let arrVal = checkVal.split(',');
      let sumCheck = 0;
      for (let i = 0; i < arrVal.length ; i++) {
        sumCheck++;
        let doewFileUrls = this.getDownloadFileUrl() + arrVal[i];
        let x = new XMLHttpRequest();
        x.open('GET', doewFileUrls, true);
        x.responseType = 'blob';
        x.onload = function(e) { download(x.response, arrVal[i]); };
        x.send();
      }
      alert('已经有' + sumCheck + '项正在下载');
    } else {
      alert('你必须选一个');
    }
/*     let x = new XMLHttpRequest();
    x.open('GET', './assets/cite/img/lufei.jpg', true);
    x.responseType = 'blob';
    x.onload = function(e) { download(x.response, 'lufei.jpg'); };
    x.send(); */
    }
    // 获取下载路径
    getDownloadFileUrl() {
      let id =this.fileUrl;
      let cruxName = id.substring(0, id.length - 2);
      let arrs = cruxName.split('\\assets\\');
      arrs = arrs[1];
      let virtualPath = arrs.split('\\');
      let fileUrls = '';
      fileUrls += './assets/';
      for (let i = 0; i < virtualPath.length ; i++) {
        fileUrls += virtualPath[i];
        fileUrls += '/';
      }
      return fileUrls;
    }
}
interface forContent {
  fileName: string;
  fileSize: any;
}