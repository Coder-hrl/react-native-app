const path = require('path');
const fs = require('fs');

const agrvs = process.argv.at(-1);

const writeFile = path1 => {
  return function (url, mode) {
    let ajaxStr = `export default {url:${url},mode:${mode}`;

    const ajaxTarget = path.resolve(__dirname, path1);

    fs.writeFileSync(ajaxTarget, ajaxStr, 'utf-8');
  };
};

const writeConfig = writeFile('../AjaxConfig.js');

console.log('当前环境为:' + agrvs);

const devUrl = '';
const prodUrl = '';

if (agrvs.includes('prod')) {
  writeConfig(devUrl, 'dev');
} else {
  writeConfig(prodUrl, 'prod');
}
