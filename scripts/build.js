const path = require('path');
const {exec} = require('child_process');

function runBuild() {
  console.log('building...');

  exec(
    'gradlew assembleRelease',
    {
      cwd: path.join(__dirname, '../android'),
    },
    function (error, stdout, stderr) {
      if (error) {
        console.log(error);
        console.log('打包失败');
      } else {
        console.log(stdout);
        console.log(stderr);
        console.log('打包成功');
      }
    },
  );
}

runBuild();
