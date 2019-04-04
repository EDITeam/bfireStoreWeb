import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-parameters-page',
  templateUrl: './parameters-page.component.html',
  styleUrls: ['./parameters-page.component.css']
})

export class ParametersPageComponent implements OnInit {

  public fileName: any; // 文件名称
  public fileUrl: any; // 文件路径
  public addContent: forContent;
  public srcMD: any; // README.md文件的路径
  public markdownName: any; // README.md文件的名称
  public statusDown: boolean = true; // 显示downlist为true,不显示为false
  public list: any;

  constructor(private route: ActivatedRoute, public http: HttpClient) { }

  ngOnInit() {
    this.getFileUrl(this.route.snapshot.paramMap.get('id'));
    this.getFileName(this.route.snapshot.paramMap.get('id'));
    this.getFolderName(this.fileUrl);
  }

  // 获取文件的集合
  getFolderName(fileUrl: any) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let api = 'http://127.0.0.1:3000/getFolderInfo';
      this.http.post(api, { "folderUrl": fileUrl }, httpOptions).subscribe((response) => {
        this.list = response;
        for (let i = 0; i < this.list.length; i++) {
          let statusFlag = this.list[i].fileName.slice(-3);
          if (statusFlag === '.md') {
            this.markdownName = this.list[i].fileName;
            this.srcMD = this.getDownloadFileUrl() + this.markdownName;
          }
        }
      })
    }
    catch (e) {
      alert(e);
    }
  }

  // 截取文件路径
  getFileUrl(id: any) {
    try {
      let fileUrls = '';
      let statusFlag = id.slice(-3);
      if (statusFlag === 'ddr') {
        this.statusDown = false;
        let cruxName = id.substring(0, id.length - 5);
        let arrs = cruxName.split('**');
        for (let i = 0; i < arrs.length; i++) {
          fileUrls += arrs[i];
          fileUrls += '\\';
        }
      }
      else {
        this.statusDown = true;
        let cruxName = id.substring(0, id.length - 2);
        let arrs = cruxName.split('**');
        for (let i = 0; i < arrs.length; i++) {
          fileUrls += arrs[i];
          fileUrls += '\\';
        }
      }
      this.fileUrl = fileUrls;
    } catch (e) {
      alert(e);
    }
  }

  // 截取文件名
  getFileName(id: any) {
    try {
      let cruxName = id.substring(0, id.length - 2);
      let arrs = cruxName.split('**');
      let arrsum = arrs.length - 1;
      this.fileName = arrs[arrsum];
    } catch (error) {
      alert(error);
    }
  }

  // 根据选中的checkbox，下载文件安装包
  downloadFile() {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
    try {
      let checkVal = '';
      $('input:checkbox[name=\'cheFile\']:checked').each(function (k) {
        checkVal += $(this).val();
        checkVal += ',';
      });
      // 循环下载安装包
      if (checkVal !== '') {
        checkVal = checkVal.substring(0, checkVal.length - 1);
        let arrVal = checkVal.split(',');
        let sumCheck = 0;
        for (let i = 0; i < arrVal.length; i++) {
          sumCheck++;
          let doewFileUrls = this.getDownloadFileUrl() + arrVal[i];
          if (userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
            let x = new XMLHttpRequest();
            x.open('GET', doewFileUrls, true);
            x.responseType = 'blob';
            x.onload = function (e) {
              const download = window['download'];
              download(x.response, arrVal[i]);
            };
            x.send();
          } else {
            let url = doewFileUrls;
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', arrVal[i]);
            document.body.appendChild(link);
            link.click();
          }
        }
      } else {
        alert('你必须选一个');
      }
    } catch (error) {
      alert(error);
    }
  }

  // 获取下载路径
  getDownloadFileUrl() {
    try {
      let id = this.fileUrl;
      let cruxName = id.substring(0, id.length - 1);
      let arrs = cruxName.split('\\assets\\');
      arrs = arrs[1];
      let virtualPath = arrs.split('\\');
      let fileUrls = '';
      fileUrls += './assets/';
      for (let i = 0; i < virtualPath.length; i++) {
        fileUrls += virtualPath[i];
        fileUrls += '/';
      }
      return fileUrls;
    } catch (error) {
      alert(error);
    }
  }
}
interface forContent {
  fileName: string;
  fileSize: any;
}
