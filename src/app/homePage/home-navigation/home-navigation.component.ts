import {
  Component,
  OnInit,
  NgModule,
  Compiler,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.css']
})

export class HomeNavigationComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;
  public listPagejump: any[] = [];  // 头部导航list
  public splicingHtmlText: any = '';
  public splicHtmlTexts: any = ``; // 拼接导航字符
  public lists: any; // 文件名集合
  public foilderLengths: any = '';

  constructor(private compiler: Compiler, public http: HttpClient) { }

  ngOnInit(): void {
    this.getFolderName();
  }

  // 获取文件的集合
  getFolderName() {
    try {
      let api = "http://127.0.0.1:3000/getJsonFolder";
      this.http.get(api).subscribe((response: any) => {
        this.lists = response;
        this.getFolderInfo(1, 1);
        this.SplicingHTML();
      });
    }
    catch (e) {
      alert(e);
    }
  }

  // 监听iframe标签url的变化
  onLoadIframe() {
    try {
      let fileUrlName = $('#fileNames').val();
      let fileUrls = $('#fileid').val();
      if (fileUrlName !== '') {
        let pageState = 'N';
        for (let i = 0; i < this.listPagejump.length; i++) {
          if (this.listPagejump[i].urlPage === fileUrlName) {
            pageState = 'Y';
          }
        }
        if (pageState === 'N' && this.listPagejump.length <= 8) {
          for (let i = 0; i < this.listPagejump.length; i++) {
            this.listPagejump[i].defClass = 'nav-link';
          }
          let addContd = {
            urlPage: fileUrlName,
            pageTitle: fileUrlName,
            headHerfName: 'Ddr' + fileUrlName + 'Head',
            defClass: 'nav-link active',
            fileUrl: fileUrls
          };
          $(window.parent.document)
            .find('a')
            .attr('class', 'nav-link');
          this.listPagejump.push(addContd);
        }
      }
    } catch (error) {
      alert(error);
    }
  }

  // 拼接html和方法
  SplicingHTML() {
    try {
      this.addComponent(this.splicHtmlTexts, {
        // 跳转到parametersPage页面，并且传值
        JumpPages: function (event) {
          let UrlName = '/parametersPage/';
          UrlName += event.target.id;
          let id = event.target.id;
          let cruxName = '';
          let statusFlag = id.slice(-3);
          if (statusFlag === 'ddr')
            cruxName = id.substring(0, id.length - 5);
          else
            cruxName = id.substring(0, id.length - 2);
          let arrs = cruxName.split('**');
          let arrsum = arrs.length - 1;
          let liId = arrs[arrsum];
          let fileNames = liId;
          liId = 'Ddr' + liId + 'Left';
          $(window.parent.document)
            .find('#contentIframe')
            .attr('src', UrlName);
          $(window.parent.document)
            .find('li')
            .attr('class', '');
          $(window.parent.document)
            .find('#' + liId)
            .attr('class', 'active');
          $('#fileNames').val(fileNames);
          $('#fileid').val(UrlName);
          let headName = 'Ddr' + fileNames + 'Head';
          $(window.parent.document)
            .find('a')
            .attr('class', 'nav-link');
          $(window.parent.document)
            .find('#' + headName)
            .attr('class', 'nav-link active');
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  // 读取文件集合
  getFolderInfo(i: any, fileLength: any) {
    try {
      if (i === 1) {
        for (i; i < this.lists.length; i++) {
          var folUrl = this.lists[i].folderUrl;
          let cruxName = folUrl.substring(0, folUrl.length - 2);
          let arrs = cruxName.split('**assets**');
          var folderArr = arrs[1];
          let folderArrs = folderArr.split('**');
          let lengthFolder = folderArrs.length;
          if (lengthFolder === 2) {
            this.getHtmlTexts(this.lists[i].folderName, this.lists[i].folderUrl, i);
          }
        }
      } else {
        for (let a = 0; a < this.lists.length; a++) {
          var folUrl = this.lists[a].folderUrl;
          let cruxName = folUrl.substring(0, folUrl.length - 2);
          let arrs = cruxName.split('**assets**');
          var folderArr = arrs[1];
          let folderArrs = folderArr.split('**');
          let lengthFolder = folderArrs.length;
          if (lengthFolder === fileLength + 1 && folderArrs[fileLength - 1] === i) {
            this.getHtmlTexts(this.lists[a].folderName, this.lists[a].folderUrl, a);
          }
        }
      }
    } catch (error) {
      alert(error);
    }
  }

  //  比较文件路径的层级
  getFolderLength(i: any) {
    try {
      var folUrl = this.lists[i].folderUrl;
      let cruxName = folUrl.substring(0, folUrl.length - 2);
      let arrs = cruxName.split('**assets**');
      var folderArr = arrs[1];
      let folderArrs = folderArr.split('**');
      this.foilderLengths = folderArrs.length;
    } catch (error) {
      alert(error);
    }
  }

  // 拼接html
  getHtmlTexts(fileName: any, fileUrl: any, sum: any) {
    try {
      let cruxName = fileUrl.substring(0, fileUrl.length - 2);
      let arrs = cruxName.split('**assets**');
      var folderArr = arrs[1];
      let folderArrs = folderArr.split('**');
      let lengthFolder = folderArrs.length;
      // console.log(folderArrs[1]);
      if (sum + 1 < this.lists.length) {
        this.getFolderLength(sum + 1);
      }
      if (folderArrs.length < this.foilderLengths) {
        // console.log(folderArrs[1]);
        let ddrfileUrl = fileUrl + 'ddr';
        this.splicHtmlTexts +=
          '<li><a href="#' +
          fileName +
          '"id="' +
          ddrfileUrl +
          '" (click)="JumpPages($event)"  aria-expanded="false" data-toggle="collapse"> ';
        this.splicHtmlTexts +=
          '<i class="fa fa-fw fa-folder"></i>' + fileName + '</a>';
        this.splicHtmlTexts +=
          ' <ul id="' + fileName + '" class="collapse list-unstyled ">';
        this.getFolderInfo(fileName, lengthFolder);
        this.splicHtmlTexts += '</ul>';
        this.splicHtmlTexts += '</li>';
      }
      //底层文件夹
      else {
        let fileNameLeft = 'Ddr' + fileName + 'Left';
        this.splicHtmlTexts +=
          '<li id="' +
          fileNameLeft +
          '"><a  id="' +
          fileUrl +
          '"  href="javascript:void(0);"(click)="JumpPages($event)" > <i class="fa fa-fw fa-file-o"></i>' +
          fileName +
          '</a></li>';
      }
    } catch (error) {
      alert(error);
    }
  }

  // 左侧导航的跳转事件，如果是新单击的导航url添加到头部导航
  JumpPage(urlPage: any, pageTitle: any, id: any) {
    try {
      urlPage = '/' + urlPage;
      let headHerfNames = urlPage.substr(1);
      headHerfNames += 'Head';
      let addContd = {
        urlPage: urlPage,
        pageTitle: pageTitle,
        headHerfName: headHerfNames,
        defClass: 'nav-link active'
      };
      let pageState = 'N';
      // iframe 显示子页面
      $(window.parent.document)
        .find('#contentIframe')
        .attr('src', urlPage);
      // 左侧导航的选中显示
      /*   $(window.parent.document).find('#' + id).siblings().attr('class', ''); */
      $(window.parent.document)
        .find('li')
        .attr('class', '');
      $(window.parent.document)
        .find('#' + id)
        .attr('class', 'active');
      for (let i = 0; i < this.listPagejump.length; i++) {
        if (this.listPagejump[i].urlPage === urlPage) {
          pageState = 'Y';
        }
      }
      if (pageState === 'N' && this.listPagejump.length <= 6) {
        for (let i = 0; i < this.listPagejump.length; i++) {
          this.listPagejump[i].defClass = 'nav-link';
        }
        this.listPagejump.push(addContd);
      }
      // 左侧单击选中，默认选头部导航
      for (let i = 0; i < this.listPagejump.length; i++) {
        if (this.listPagejump[i].headHerfName === headHerfNames) {
          $(window.parent.document)
            .find('a')
            .attr('class', 'nav-link');
          $(window.parent.document)
            .find('#' + headHerfNames)
            .attr('class', 'nav-link active');
        }
      }
    } catch (error) {
      alert(error);
    }
  }

  // 删除一个选中的头部标签
  delTag(item: any) {
    try {
      for (let i = 0; i < this.listPagejump.length; i++) {
        if (this.listPagejump[i] === item) {
          this.listPagejump.splice(i, 1);
          // 删除一个页面自动跳转到homepage
          $(window.parent.document)
            .find('#contentIframe')
            .attr('src', '/HomePage');
          $(window.parent.document)
            .find('li')
            .attr('class', '');
          $(window.parent.document)
            .find('#' + 'HomePageLeft')
            .attr('class', 'active');
          $(window.parent.document)
            .find('a')
            .attr('class', 'nav-link');
          $(window.parent.document)
            .find('#' + 'HomePageHead')
            .addClass('nav-link active');
          $('#fileNames').val('');
          $('#fileid').val('');
        }
      }
    } catch (error) {
      alert(error);
    }
  }

  // 单击固定导航home跳转事件
  jumpTagHome(item: any, id: any) {
    try {
      $(window.parent.document)
        .find('#contentIframe')
        .attr('src', item);
      if (id.substring(id.length - 4) === 'Left') {
        // 头部导航的选中显示
        let headHerfNameLeft = id.substring(0, id.length - 4);
        $(window.parent.document)
          .find('li')
          .attr('class', '');
        $(window.parent.document)
          .find('#' + id)
          .attr('class', 'active');
        headHerfNameLeft += 'Head';
        $(window.parent.document)
          .find('a')
          .attr('class', 'nav-link');
        $(window.parent.document)
          .find('#' + headHerfNameLeft)
          .addClass('nav-link active');
      } else {
        // 左侧导航的选中显示
        let headHerfNameLeft = id.substring(0, id.length - 4);
        headHerfNameLeft += 'Left';
        $(window.parent.document)
          .find('li')
          .attr('class', '');
        $(window.parent.document)
          .find('#' + headHerfNameLeft)
          .attr('class', 'active');
      }
    } catch (error) {
      alert(error);
    }
  }

  // 单击头部导航跳转事件
  jumpTag(item: any) {
    try {
      $(window.parent.document)
        .find('#contentIframe')
        .attr('src', item.fileUrl);
      let headHerfNameLeft = item.headHerfName.substring(
        0,
        item.headHerfName.length - 4
      );
      headHerfNameLeft += 'Left';
      // Ddr展示标签exampledropdownDropdown
      if (headHerfNameLeft.substring(0, 3) === 'Ddr') {
        $(window.parent.document)
          .find('#' + 'exampledropdownDropdown')
          .attr('class', 'list-unstyled collapse show');
      }
      // 左侧导航的选中显示
      $(window.parent.document)
        .find('li')
        .attr('class', '');
      $(window.parent.document)
        .find('#' + headHerfNameLeft)
        .attr('class', 'active');
    } catch (error) {
      alert(error);
    }
  }

  // 拼接html导航模块的组件方法
  private addComponent(template: string, properties: any = {}) {
    @Component({ template })
    class TemplateComponent { }
    @NgModule({ declarations: [TemplateComponent] })
    class TemplateModule { }
    const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
    const factory = mod.componentFactories.find(
      comp => comp.componentType === TemplateComponent
    );
    const component = this.container.createComponent(factory);
    Object.assign(component.instance, properties);
    // component.changeDetectorRef.detectChanges(); 如果在后期更改了属性，需要手动触发更改检测，则需要用到这个方法
  }
}
