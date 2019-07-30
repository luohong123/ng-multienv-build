#!/user/bin/env node

var fs = require('fs');
var environmentsConfig = require('./environments.config.js')
const {
  exec
} = require('child_process');
var buildCmd = ''
var writeJson = ''
// 不同的环境配置管理
const environments = environmentsConfig
console.log(environments, '=================>读取多个环境配置environments')
var ngCliJson = './.angular-cli.json'
/**
 * 读取json文件，并转为json对象
 */
function getPackageJson(url) {
  var result = fs.readFileSync(url)
  return JSON.parse(result)
}
// 获取angular-cli的json对象
var packageData = getPackageJson(ngCliJson)
/**
 * 根据配置创建文件
 * @param {*} config 
 */
function createFileByConfig(config) {
  if (config.length === 0) return;
  for (let i = 0; i < config.length; i++) {
    let fileName = config[i].fileName
    let apiurl = config[i].apiurl
    let systemurl = config[i].systemurl
    let outDir = config[i].outDir
    let envUrl = config[i].envUrl
    var envConfig = `
export const environment = {
  production: true,
  pid: 'ng-multien-build',
  projectName: 'angular一键打包多环境',
  systemurl: '${systemurl}',
  apiurl: '${apiurl}',
  port: '8080',
  license: '',
  outDir: '${outDir}'
};
`
    // 批量写入多个environment.ts文件
    fs.writeFile(fileName, envConfig, function (err) {
      if (err) {
        return console.error(err)
      }
    })
    buildCmd += (i < config.length - 1) ? `ng build --output-path=dist/${outDir} --prod --aot=false -env=${outDir} && ` : `ng build --output-path=dist/${outDir} --prod --aot=false --env=${outDir}`
    packageData.apps[0].environments[outDir] = envUrl
  }
  // 循环完后修改文件
  writeJson = JSON.stringify(packageData, null, 6)
  console.log(packageData.apps[0].environments, 'environments');
  // 在 angualar-cli.json 中写入 environments 的配置
  fs.writeFile(ngCliJson, writeJson, function (err) {
    if (err) {
      return console.error(err)
    }
  })
}

// 通过不同的环境配置创建文件
createFileByConfig(environments)

// 开始打包
console.log(buildCmd)

// function startBuild() {
//   console.log('开始打包==================================》')
//   exec(buildCmd, (err, stdout, stderr) => {
//     if (err) {
//       // node couldn't execute the command
//       return;
//     }

//     // the *entire* stdout and stderr (buffered)
//     console.log(`打包stdout: ${stdout}`);
//     console.log(`打包stderr: ${stderr}`);
//   });
// }
// startBuild();
