import fs from 'fs';
import path from 'path';

const defaultConfigPath = path.join(__dirname, '../../env/config.local.json');
const defaultConfigs = JSON.parse(fs.readFileSync(defaultConfigPath, 'utf8'));

const envConfigPath = path.join(__dirname, '../../env/config.json');
let envConfigs = {};

if (fs.existsSync(envConfigPath)) {
  envConfigs = JSON.parse(fs.readFileSync(envConfigPath, 'utf8'));
}

const configs = {
  ...defaultConfigs,
  ...envConfigs,
};

const config = {
  cognito: {
    userPoolId: configs.Service.CognitoUserPoolId,
    clientId: configs.Service.CognitoUserPoolClientId
  },
  newrelic: {
    appName: configs.NewRelic.AppName,
    distributedTracing: configs.NewRelic.DistributedTracing,
    license: configs.NewRelic.License,
    logLevel: configs.NewRelic.LogLevel,
  }
};

export default config;
