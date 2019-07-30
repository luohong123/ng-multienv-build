// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  pid: 'ng-multien-build',
  projectName: 'angular一键打包多环境',
  systemurl: 'http://192.168.0.dev:9080/server/api/',
  apiurl: 'http://192.168.0.dev:9080/server/api/',
  port: '8080',
  license: '',
  outDir: 'distdev'
};
