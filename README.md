
# NgMultienvBuild
[English](https://github.com/luohong123/ng-multienv-build/blob/master/README-en.md) | 简体中文 
# 前言
写这个脚本的初衷，是因为公司基于 Angular5 做了一个内网项目，一套代码，10-20个不同后台服务环境，每次升级项目，需要修改 environment文件，一个一个的敲ng build命令，打包半天，这个脚本的思路是把后台的服务地址、服务器名称等变量放到一个数组里面，不用去修改 environment 文件夹 和 angular-cli.json 文件下的配置，只需要管理这个数组，动态的创建 enviroment.ts 文件和修改 angular-cli.json文件，运行 `npm run multienv` 命令，就能一次打包 20 个不同的环境配置。
<p>
<img src="./media/build.gif"/>
</p>
# 开始
克隆项目后，执行下面的命令
```bash
npm install
```
在 `build/environments.config.js` 里面维护环境配置

执行下面的命令，开始一键打包多环境
```bash
npm run multienv
```
