# bfireStoreWeb系统设计文档

## 1. 	目的  
为给使用条码移动端应用、核销系统web、银企直连接口的用户，建立一个提供下载安装包、用户操作手册、API等功能的网站平台。  

## 2.	开发工具与环境  

| **工具**           | **作用**       |
|--------------------|----------------|
| Visual Studio Code | 代码编译器     |
| github             | 源代码托管平台 |
| Angular 7.1.4      | 前端框架       |
| Bootstrap v4.0     | 网页样式库     |  

## 3.  系统设计  
###   3.1.  网站页面设计：  
使用Bootstrap样式库。使用前，需要将bootstrap和jquery引用到网站的index.html页面，如下图所示：

<img src="./assets/projectDocumentation/img/designDocument-one.png" />

这样就可以使用Bootstrap提供的样式了。搭建页面的基本架构主要包括头部导航、左侧导航、右侧下载列表和下方的markdown文档的展示栏部分  

###   3.2.  拼接左侧导航:

####   3.2.1. 	读取本地文件夹  
使用Javascript读取本地文件夹，要在Javascript中实现文件操作功能，主要使用了ActiveXObject对象，因为只有IE浏览器支持创建ActiveX控件，因此它有一个其他浏览器没有的东西，就是ActiveXObject函数，而操作文件夹的主要方法就是依靠FileSystemobject对象，创建FileSystemObject对象的代码只要1行：  

> let fso = new ActiveXObject('Scripting.FileSystemObject');  

因为要遍历读取文件夹的名称以及内容，所以就用到了递归函数，根据已知路径循环读取当前层级内的文件夹名称，然后将已经读取到的文件夹名称拼接到已知路径中，在循环读取当前层级内的文件夹名称，知道到最底层文件夹。实现该功能的最主要代码如下图所示：

<img src="./assets/projectDocumentation/img/designDocument-two.png" />  

####   3.2.2.	根据文件夹名称拼接左侧导航  

将已经得到的文件夹名称，传入写好的方法中，在后台进行拼接，由于在拼接之后，如果直接把在后台拼接好的左侧导航进行加载，因为angular的特性无法及时的加载（click）事件，或者说（click）无法使用，所以需要使用@ViewChild进行之组件传值，并且将拼接好的左侧导航传入@ViewChild中，实现的主要方法如下图所示：  

<img src="./assets/projectDocumentation/img/designDocument-thrid.png" />  

###   3.3.	头部导航  

头部导航主要功能是当点击左侧导航的时候，在下载列表的上方自动生成一个头部标签。当点击头部标签时，加载对应的下载栏和markdown文件。实现方式是在后台声明一个list,然后当用户点击一个左侧导航时，在（click）事件中，传入文件名称并且填充到list里面。在html页面循环加载声明的list变量。实现该功能的主要方法如图所示：  

<img src="./assets/projectDocumentation/img/designDocument-four.png" />  

###   3.4.	下载功能  
 
当用户选择左侧导航时，并且点击自己想要下载标签时，右侧会及时加载出下载列表，当用户选择好下载的文件时，单击download按钮，要下载的安装包自动下载到本地。实现该功能主要是了download.js的方法，在终端输入：  

> npm install angular-download –save  

然后就使用download.js的内置方法，实现该功能的主要方法如下所示：  

<img src="./assets/projectDocumentation/img/designDocument-five.png" />   

###   3.5.	读取markdown文件  

在网站的下方加载出文件夹内置的README.md文件，实现该功能主要是使用了ngx-markdown，它 是 Angular 的一个第三方库，它的主要功能是将markdown文件转换为HTML格式。在终端输入  

> npm install ngx-markdown –save  

并且在angular.json文件中引入了"../node_modules/marked/lib/marked.js"。必须引入MarkdowmModule到  AppModule 中去, 并且在 forRoot 中声明，如下图所示：  

<img src="./assets/projectDocumentation/img/designDocument-seven.png" /> 

并且在html页面写入，这样读取markdown文件就完成了，实现该功能的主要方法如下图所示：  

<img src="./assets/projectDocumentation/img/designDocument-six.png" /> 


