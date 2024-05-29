const path = require('path');
const {exec} = require('child_process');

const agrvs = process.argv.at(-1);

if (agrvs.includes('prod')) {
  exec('yarn set prod');
} else {
  exec('yarn set dev');
}

function runBuild() {
  console.log('building...');

  exec(
    'gradlew assembleRelease',
    {
      cwd: path.join(__dirname, '../android'),
    },
    function (error, stdout, stderr) {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
      console.log('打包完成');
    },
  );
}

runBuild();
