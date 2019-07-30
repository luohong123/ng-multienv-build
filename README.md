# 打包步骤
1. 把 build 文件解压放到与 node_moudles 平级的目录下
2. 打开终端，输入命令 node build/build.js，自动创建environment文件
3. 复制最后一行代码，以 ng build...开头的，把复制的代码在终端执行
4. 等待打包，&& 是一个一个的打包
5. 在dist文件下生成打包后的文件

# 环境配置
在 build/environments.config.js 中的数组里面维护不同的后台服务
# NgMultienvBuild

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

