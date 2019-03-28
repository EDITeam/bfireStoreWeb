import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-parameters-page',
  templateUrl: './parameters-page.component.html',
  styleUrls: ['./parameters-page.component.css']
})
export class ParametersPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  public fileName: any; // 文件名称
  public fileUrl: any; // 文件路径
  public addContent: forContent;
  public srcMD: any; // README.md文件的路径
  public markdownName: any; // README.md文件的名称
  public statusDown: boolean = true; // 显示downlist为true,不显示为false
  public list: any[] = [];
  ngOnInit() {
    this.getFileUrl(this.route.snapshot.paramMap.get('id'));
    this.getFileName(this.route.snapshot.paramMap.get('id'));
    this.collectNavigations(this.fileUrl);
    this.srcMD = this.getDownloadFileUrl() + this.markdownName;
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
  // 读取文件夹内容
  collectNavigations(path: any) {
    try {
      const ActiveXObject = window['ActiveXObject'];
      let fso = new ActiveXObject('Scripting.FileSystemObject');
      let s = (<any>fso).GetFolder(path);
      const Enumerator = window['Enumerator'];
      let fn = new Enumerator(s.files);
      for (; !fn.atEnd(); fn.moveNext()) {
        let fileNames = fn.item().Name;
        let statusFlag = fileNames.slice(-3);
        if (statusFlag === '.md') {
          this.markdownName = fileNames;
        }

        let fileSizes = fso.GetFile(fn.item()).size;
        // 得到文件大小，以M为单位，小数点后两位
        fileSizes = fileSizes / 1048576;
        fileSizes = fileSizes.toFixed(2);
        fileSizes += 'M';
        this.addContent = {
          fileName: fileNames,
          fileSize: fileSizes
        };
        this.list.push(this.addContent);
      }
    } catch (error) {
      alert(error);
    }
  }
  // 根据选中的checkbox，下载文件安装包
  downloadFile() {
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
          let x = new XMLHttpRequest();
          x.open('GET', doewFileUrls, true);
          (<any>x.responseType) = 'blob';
          x.onload = function (e) {
            const download = window['download'];
            download(x.response, arrVal[i]);
          };
          x.send();
        }
        alert('选择' + sumCheck + '项，请点击页面下方的保存');
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
