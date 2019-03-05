import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.css']
})
export class HomeNavigationComponent implements OnInit {
 // 头部导航list
 listPagejump = [

];
constructor() {
}

ngOnInit() {
}

// 左侧导航的跳转事件，如果是新单击的导航url添加到头部导航
JumpPage(urlPage, pageTitle, id){
  try {
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

// tslint:disable-next-line: member-ordering
listTest = '<li><a href=\"javascript:void(0);\" > <i class=\"fa fa-bar-chart\"></i>导航的第三个内容页面 </a></li>';
// tslint:disable-next-line:member-ordering
jsonNavList = [
  {
    navigationName: '导航的第一个内容页面', // 导航名称
    urlName: '/IframePage',
    liId: 'IframePageLeft',
    iconClass: 'fa fa-fw fa-bank', // 导航图标的class
    ddrState: '0' // 是否为下拉
  },
  {
    navigationName: '导航的第二个内容页面',
    urlName: '/GenerateJournalEntryList',
    liId: 'GenerateJournalEntryListLeft',
    iconClass: 'fa fa-fw fa-dropbox',
    ddrState: '0'
  },
  {
    navigationName: '下拉列表',
    urlName: '',
    liId: 'secondDDR',
    iconClass: 'fa fa-fw fa-cog',
    ddrState: '1'
  }
];
// tslint:disable-next-line:member-ordering
secondDDR = [{
  navigationName: '导航的第一个内容页面', // 导航名称
  urlName: '/IframePage',
  liId: 'IframePageLeft',
  iconClass: 'fa fa-fw fa-bank', // 导航图标的class
  ddrState: '0' // 是否为下拉
},
{
  navigationName: '导航的第二个内容页面',
  urlName: '/GenerateJournalEntryList',
  liId: 'GenerateJournalEntryListLeft',
  iconClass: 'fa fa-fw fa-dropbox',
  ddrState: '0'
},
{
  navigationName: '下拉列表',
  urlName: '',
  liId: 'secondDDR',
  iconClass: 'fa fa-fw fa-cog',
  ddrState: '1'
}];
}
