# check_rwx-suid

中国蚁剑（Antsword）插件

在目标服务器上查询可读可写可执行目录以及可用于suid提权的文件（支持asp,aspx,php）

asp以及aspx类型的shell以上传独立的detect.asp(x)文件来实现对应操作（点击"用户"按钮后会弹出确认框，确认后即可在服务器上生成此文件），生成成功后只需访问webshell目录下的detect.asp(x)，输入欲检测的范围并执行即可。

## 演示

* 信息获取

![main.png](./img/main.png)

点击左上角用户按钮，输入想要查找的用户名，得到结果

中间两个搜索按钮分别对应两个结果栏，可以通过关键字查找对应行

最右边的清空按钮可以清空搜索结果栏

## TODO
  有问题或者建议欢迎联系我或者帮助我改进！
 
感谢@caidaome在AntSword下提交的插件建议issue
