let { Connection } = require('ssh-pool');

if (!process.env.STAGING) {
  require('dotenv').config();
}

module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  let connection;

  if (!process.env.STAGING) {
    connection = new Connection({
      remote: 'lopbattleproto@test.r5t.ru',
      key: '~/.ssh/lopbattleproto',
      log: (...args) => console.log(...args),
    })
  }

  let e = process.env;

  shipit.initConfig({
    default: {
      workspace: './.shipitworkspace',
      // dirToCopy: './dist',
      branch: 'develop',
      deployTo: e.deployTo,
      repositoryUrl: 'git@bitbucket.org:mega3/lopbattleproto.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 20,
      deleteOnRollback: false,
      key: '~/.ssh/lopbattleproto',
      shallowClone: true
    },
    staging: {
      servers: 'lopbattleproto@test.r5t.ru'
    }
  });

  shipit.task('inject-env', async () => {
    await connection.copyToRemote(
      '.env_STAGING',
      `${e.CUR_WORK_DIR}/.env`
    );
  });

  /* battlefield, latest version is served on 8080+ port */

  // build current version
  shipit.task('deploy-bfield', function () {
    return shipit.remote(
      `npm i && npm run build-bfield && mkdir -p ${e.BTLFLD_DIST_DIR_TO} && cp -a ${e.BTLFLD_DIST_DIR_FROM}* ${e.BTLFLD_DIST_DIR_TO}`,
      { cwd: e.CUR_WORK_DIR }
    );
  });

  // serve on 8080+ port
  shipit.task('start-bfield', function () {
    return shipit.remote(
      `http-server`,
      { cwd: e.CUR_WORK_DIR }
    );
  });

  /* workbench, served on 3000 port */

  // build current version
  shipit.task('deploy-wbench', function () {
    return shipit.remote(
      'npm i',
      { cwd: e.CUR_SERVICES_DIR }
    );
  });

  // serve on 3000
  shipit.task('start-wbench', function () {
    return shipit.remote(
      'npm run start-wbench',
      { cwd: e.CUR_WORK_DIR }
    );
  });

  // serve on 3000
  shipit.task('start-wbench-dbg', function () {
    return shipit.remote(
      'npm run start-wbench-dbg',
      { cwd: e.CUR_WORK_DIR }
    );
  });
};
