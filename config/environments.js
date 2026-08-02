const environments = {
  production: {
    name: 'production',
    baseUrl: 'https://telnyx.com',
  },
  staging: {
    name: 'staging',
    // Replace this URL when a dedicated staging environment becomes available.
    baseUrl: 'https://telnyx.com',
  },
};

function getEnvironment() {
  const environmentName = process.env.TEST_ENV || 'production';
  const environment = environments[environmentName];

  if (!environment) {
    throw new Error(
      `Unknown TEST_ENV "${environmentName}". Use one of: ${Object.keys(environments).join(', ')}`,
    );
  }

  return environment;
}

module.exports = { environments, getEnvironment };
