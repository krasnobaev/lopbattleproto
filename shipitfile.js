module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: './.shipitworkspace',
      // dirToCopy: './dist',
      deployTo: '/home/lopbattleproto/www/',
      repositoryUrl: 'git@bitbucket.org:sypwex/lopbattleproto.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      key: '~/.ssh/lopbattleproto',
      shallowClone: true
    },
    staging: {
      servers: 'lopbattleproto@test.r5t.ru'
    }
  });

  shipit.task('post-deploy', function () {
    return shipit.remote('cd www/current && yarn install && npm run build && http-server');
  });

  shipit.task('start-remote-server', function () {
    return shipit.remote('cd www/current && http-server');
  });
};
