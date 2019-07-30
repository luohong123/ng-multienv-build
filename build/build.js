#!/user/bin/env node

var fs = require('fs');
const chalk = require('chalk')
const ora = require('ora')
var environmentsConfig = require('./environments.config.js')
const logSymbols = require('log-symbols');
const {
  exec
} = require('child_process');
var buildCmd = ''
var writeJson = ''
// 不同的环境配置管理
const environments = environmentsConfig
var ngCliJson = './.angular-cli.json'
/**
 * 读取json文件，并转为json对象
 */
function getPackageJson(url) {
  let spinner = ora('Loading' + url).start()
  var result = fs.readFileSync(url)
  spinner.color = 'yellow'
  spinner.text = '读取 ' + url + ' 成功!'
  spinner.succeed()
  return JSON.parse(result)
}
// 获取angular-cli的json对象
var packageData = getPackageJson(ngCliJson)
const spinner2 = ora('开始批量创建多个environment.ts文件. \n').start()
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
        return console.error(logSymbols.error, err)
      }
      spinner2.color = 'yellow'
      spinner2.text = '创建' + fileName + ' 成功!'
      spinner2.succeed()
    })
    buildCmd += (i < config.length - 1) ? `ng build --output-path=dist/${outDir} --prod --aot=false -env=${outDir} && ` : `ng build --output-path=dist/${outDir} --prod --aot=false --env=${outDir}`
    packageData.apps[0].environments[outDir] = envUrl
  }
  // 循环完后修改文件
  writeJson = JSON.stringify(packageData, null, 6)
  // 在 angualar-cli.json 中写入 environments 的配置
  fs.writeFile(ngCliJson, writeJson, function (err) {
    if (err) {
      return console.error(logSymbols.error, err)
    }
    console.log(logSymbols.success, '在 angualar-cli.json 中修改 environments 的配置')
  })
}

// 通过不同的环境配置创建文件
createFileByConfig(environments)
// 输出 打包命令
setTimeout(() => {
  console.log(chalk.blue.bgRed('\n build command:\n') + chalk.blue.bgYellow(buildCmd))
}, 1000)

// 开始打包

// 输出当前目录（不一定是代码所在的目录）下的文件和文件夹
const spinner3 = ora('start build...').start()
spinner3.color = 'yellow'
spinner3.text = 'Start build please wait... \n';
exec(buildCmd, (err, stdout, stderr) => {
  if (err) {
    console.log(logSymbols.error, err);
    return;
  }
  console.log(logSymbols.success, `==========>stdout: ${stdout}`);
  console.log(logSymbols.error, `===========>stderr: ${stderr}`);
  spinner3.succeed()
  console.log(chalk.yellow.bgGreen('\n All build tasks have been completed！\n'))
})
