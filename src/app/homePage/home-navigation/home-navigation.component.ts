import { Component, OnInit, NgModule, Compiler, ViewChild, ViewContainerRef } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.css']
})
export class HomeNavigationComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
constructor(private compiler: Compiler) {
}
 // 头部导航list
 listPagejump = [
];
splicingHtmlText = '';
GetFolderNames = '1';
constUrlDefRead = 'D:\\BarCodeMobileApplication\\'; // 读取文件的url
splicHtmlTexts = ``; // 拼接导航字符
testVals = 'ss';
ngOnInit(): void {
  let path = this.constUrlDefRead;
  this.collectNavigations(path);
  this.SplicingHTML();

}
// 拼接html和方法
SplicingHTML() {
  this.addComponent(
    this.splicHtmlTexts, {
      counter: 1,
      counters: 'wqwqwq',
      increaseCounter: function () {
        this.counter++;
      },
      increaseCounters: function () {
        return `sdsdsdd`;
      },
      JumpPages: function (event) {

       let UrlName = '/parametersPage/';
       UrlName += event.target.id;
       
       let id = event.target.id;
       let cruxName = id.substring(0,id.length-2);
       let arrs = cruxName.split('**');
       let arrsum = arrs.length - 1;
       let liId = arrs[arrsum];
        liId = 'Ddr' +  liId + 'Left';
        $(window.parent.document).find('#contentIframe').attr('src', UrlName);
        $(window.parent.document).find('li').attr('class', '');
        $(window.parent.document).find('#' + liId).attr('class', 'active');
        // alert(event.target.id);
      }
    }
  );
}
 collectNavigations(path) {
   debugger;
    try {
      let fso = new ActiveXObject('Scripting.FileSystemObject');
      let s = fso.GetFolder(path);
      let fn = new Enumerator(s.SubFolders);
      if (fn != '') {
          for (; !fn.atEnd(); fn.moveNext()){
              let consturlPath =  fn.item() + '\\';
              this.getHtmlTexts(consturlPath);
            }
          }
        } catch (t) {
          alert(t);
        }
      }
getHtmlTexts(arr) {
        try {
          let fso = new ActiveXObject("Scripting.FileSystemObject");
          let constUrl = arr;
          // let urlNames = arr.substring(arr.length-1)；
          let cruxName = arr.substring(0,arr.length-1);
          let arrs = cruxName.split('\\');
          let fileUrl = '';
          for (let i = 0; i < arrs.length ; i++) {
            fileUrl += arrs[i];
            fileUrl += '**';
          }

          let arrsum = arrs.length - 1;
          let fileName = arrs[arrsum];
          let s = fso.GetFolder(constUrl);
          let fn = new Enumerator(s.SubFolders);
          if (!fn.atEnd()) {
            this.splicHtmlTexts += '<li><a href="#' + fileName + '" aria-expanded="false" data-toggle="collapse"> ';
            this.splicHtmlTexts += '<i class="fa fa-fw fa-folder"></i>' + fileName + '</a>';
            this.splicHtmlTexts += ' <ul id="' + fileName + '" class="collapse list-unstyled ">';
            this.collectNavigations(arr);
            this.splicHtmlTexts += '</ul>';
            this.splicHtmlTexts += '</li>';
          } else {
            let fileNameLeft = 'Ddr' + fileName + 'Left';
            // tslint:disable-next-line:max-line-length
            this.splicHtmlTexts += '<li id="' + fileNameLeft + '"><a id="' + fileUrl + '"  href="javascript:void(0);"(click)="JumpPages($event)" > <i class="fa fa-fw fa-file-o"></i>' + fileName + '</a></li>';
            }
          }
          catch (t) {
            alert(t);
          }

      }

// 左侧导航的跳转事件，如果是新单击的导航url添加到头部导航
JumpPage(urlPage, pageTitle, id){
  try {
    urlPage = '/' + urlPage;
   let headHerfNames = urlPage.substr(1);
   headHerfNames += 'Head';
    let addContd = {
      urlPage: urlPage,
      pageTitle: pageTitle,
      headHerfName: headHerfNames,
      defClass: 'nav-link active',
    };
    let pageState = 'N';
    // iframe 显示子页面
    $(window.parent.document).find('#contentIframe').attr('src', urlPage);
    // 左侧导航的选中显示
  /*   $(window.parent.document).find('#' + id).siblings().attr('class', ''); */
    $(window.parent.document).find('li').attr('class', '');
    $(window.parent.document).find('#' + id).attr('class', 'active');
    for (let i = 0; i < this.listPagejump.length; i++) {
      if (this.listPagejump[i].urlPage === urlPage) {
        pageState = 'Y';
      }
    }
    if (pageState === 'N' && this.listPagejump.length <= 6) {
      for (let i = 0; i < this.listPagejump.length; i++) {
        this.listPagejump[i].defClass = 'nav-link' ;
      }
      this.listPagejump.push(addContd);
    }
    // 左侧单击选中，默认选头部导航
    for (let i = 0; i < this.listPagejump.length; i++) {
      if (this.listPagejump[i].headHerfName === headHerfNames) {
/*           debugger; */
      $(window.parent.document).find('a').attr('class', 'nav-link');
    // .className = "styleclass";$(window.parent.document).find('#' + headHerfNames).attr('class', 'nav-link active');.addClass
         $(window.parent.document).find('#' + headHerfNames).attr('class', 'nav-link active');

      }
    }
  } catch (error) {
    alert(error);
  }
}
// 删除一个选中的头部标签
delTag(item) {
  for (let i = 0; i < this.listPagejump.length; i++) {
    if (this.listPagejump[i] === item) {
      this.listPagejump.splice(i, 1);
      // 删除一个页面自动跳转到homepage
        $(window.parent.document).find('#contentIframe').attr('src', '/HomePage');
        $(window.parent.document).find('li').attr('class', '');
        $(window.parent.document).find('#' + 'HomePageLeft').attr('class', 'active');
       $(window.parent.document).find('a').attr('class', 'nav-link');
       $(window.parent.document).find('#' + 'HomePageHead').addClass('nav-link active'); 
    }
  }
 /*  this.presentConfirm('警告', 'error').present(); */
}
  // 单击固定导航home跳转事件
  jumpTagHome(item,id) {
    try {
      $(window.parent.document).find('#contentIframe').attr('src', item);
      if (id.substring(id.length - 4) === 'Left') {

         // 头部导航的选中显示
         let headHerfNameLeft = id.substring(0, id.length - 4);
         $(window.parent.document).find('li').attr('class', '');
         $(window.parent.document).find('#' + id).attr('class', 'active');

         headHerfNameLeft += 'Head';
        $(window.parent.document).find('a').attr('class', 'nav-link');
        $(window.parent.document).find('#' + headHerfNameLeft).addClass('nav-link active'); 
      } else {
         // 左侧导航的选中显示
        let headHerfNameLeft = id.substring(0, id.length - 4);
        headHerfNameLeft += 'Left';
        $(window.parent.document).find('li').attr('class', '');
        $(window.parent.document).find('#' + headHerfNameLeft).attr('class', 'active');
      }
    } catch (error) {
      alert(error);
    }
  }
// 单击头部导航跳转事件
jumpTag(item) {
  try {
    $(window.parent.document).find('#contentIframe').attr('src', item.urlPage);
    let headHerfNameLeft = item.headHerfName.substring(0, item.headHerfName.length - 4);
    // headHerfNameLeft += 'Left';LeftDDRR
    headHerfNameLeft += 'Left';
    // Ddr展示标签exampledropdownDropdown
    if (headHerfNameLeft.substring(0, 3) === 'Ddr') {
      $(window.parent.document).find('#' + 'exampledropdownDropdown').attr('class', 'list-unstyled collapse show');
          }
    // 左侧导航的选中显示
    $(window.parent.document).find('li').attr('class', '');
    $(window.parent.document).find('#' + headHerfNameLeft).attr('class', 'active');
  } catch (error) {
    alert(error);
  }
}
private addComponent(template: string, properties: any = {}) {
  @Component({template})
  class TemplateComponent {}

  @NgModule({declarations: [TemplateComponent]})
  class TemplateModule {}

  const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
  const factory = mod.componentFactories.find((comp) =>
    comp.componentType === TemplateComponent
  );
  const component = this.container.createComponent(factory);
  Object.assign(component.instance, properties);
  // If properties are changed at a later stage, the change detection
  // may need to be triggered manually:
  // component.changeDetectorRef.detectChanges();
}
}