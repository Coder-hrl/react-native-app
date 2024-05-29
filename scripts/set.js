const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);

let ajaxStr = 'export default';

const ajaxTarget = path.resolve(__dirname, '../AjaxMode.js');

ajaxStr += ` '${args[0]}'`;

fs.writeFileSync(ajaxTarget, ajaxStr, 'utf-8');
