// eslint-disable-next-line
const Deployer = require('ssh-deploy-release');

const options = {
  localPath: 'dist',
  host: 'ec2-54-235-26-32.compute-1.amazonaws.com',
  username: 'ubuntu',
  // password: 'password',
  deployPath: '/home/data/chat',
  privateKeyFile: '/Users/vlad/.ssh/chat.pem'
};

const deployer = new Deployer(options);
deployer.deployRelease(() => {
  console.log('Ok!');
});
