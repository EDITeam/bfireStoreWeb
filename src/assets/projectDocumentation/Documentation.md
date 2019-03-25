# bfireStoreWeb系统说明文档  

## 1. 	目的  

为了给使用条码移动端应用、核销系统web、银企直连接口的用户，建立一个可以提供下载安装包、用户操作手册、API等功能的网站平台。  

## 2.  使用说明  

###   2.1. 	如何上传文件  

上传文件需要找到项目里ProductUseInstructions文件，找到ProductUseInstructions文件以后，在第一层文件夹里选择需要为上传文件的项目，如下图所示：  

<img src="./assets/projectDocumentation/img/documentation_findFolder.png" />   

也可以新建一个项目文件，新建项目时，项目之间的名称不能相同，项目名称尽量不要太长，新建时点击鼠标右键，选择“新建文件夹”，如下图所示：  

<img src="./assets/projectDocumentation/img/documentation_newFolder.png" />   

选择以后，为文件夹命名，假设命名为“bookstoreApplication”,如果要使用bookstoreApplication文件夹为底层文件夹，那么bookstoreApplication文件夹内不能再有文件夹，如下图所示表示新建已经完成：  

<img src="./assets/projectDocumentation/img/documentation_namedFolder.png" />   


然后点击该文件夹进去，为“bookstoreApplication”项目添加用户使用手册,切记一定要在ProductUseInstructions/bookstoreApplication/文件夹下，如下图所示：  

<img src="./assets/projectDocumentation/img/documentation_addFolder.PNG" /> 

那么用户使用手册就已经成功的上传上去了，如果要设置安装包和markdown文件，操作如上，效果如下图所示：  

<img src="./assets/projectDocumentation/img/documentation_uploadFolder.PNG" width="100%"/> 

如果用户想要将“bookstoreApplication”文件夹当作父级文件，那么“bookstoreApplication”文件夹内只能有子文件夹，不能有文件在里面,假设“bookstoreApplication”有A、B、C三个子导航，并将“用户使用手册”，放入A文件夹内：如下图所示：  

<img src="./assets/projectDocumentation/img/documentation_addSubfolder.PNG"  />  

<img src="./assets/projectDocumentation/img/documentation_subfolderAddFile.PNG"  />  

那么“bookstoreApplication”文件夹当作父级文件，A、B、C三个为子导航就设置好了，效果如下图所示：  

<img src="./assets/projectDocumentation/img/documentation_showUploadFile.PNG"  width="100%"/>   

###   2.2. 	如何下载文件   

如果我们要下载bookstoreApplication/A文件夹内“用户使用手册”，那么第一步就是要找到bookstoreApplication选项里A标签，找到后点击A标签，呈现效果图如下：  


<img src="./assets/projectDocumentation/img/documentation_showDownloadFiles.PNG" width="100%" />    

第二步，选择“用户使用手册”文件前面的小标签，单击下载按钮 “download”,然后点击保存，那么下载文件就完成了，效果图如下：  

<img src="./assets/projectDocumentation/img/documentation_clickDownload.png"  width="100%"/>  

最后，我们就可以在下载文件夹内找到“用户使用手册”文件，效果图如下：  

<img src="./assets/projectDocumentation/img/documentation_showDownloadFile.PNG" width="100%" /> 

