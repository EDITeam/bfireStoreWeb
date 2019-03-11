import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
         let fileNames = fso.GetBaseName(fn.item());
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
    downloadFile() {
      alert('ghj');
/*       let $form = $('<form method="GET"></form>');
          $form.attr('action', 'D:/BarCodeMobileApplication/Third/1');
          $form.appendTo($('body'));
          $form.submit(); */
          window.open('D:\\BarCodeMobileApplication\\Third\\1.txt');
    }
}
interface forContent {
  fileName: string;
  fileSize: any;
}