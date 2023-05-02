//
// Creates a Deployment using the provided data
//

module.exports = async (payload) => {

  const environment = validateParameter(payload, 'environment'),
    context = validateParameter(payload, 'context'),
    github = validateParameter(payload, 'github'),
    appContainerImage = validateParameter(payload, 'appContainerImage'),
    sha = validateParameter(payload, 'sha'),
    head = validateParameter(payload, 'head');

  const isProduction = /^prod.*/.test(environment),
    deploymentEnvironment = isProduction ? environment : `${environment}-${head}`;

  await github.rest.actions.createWorkflowDispatch({
    owner: context.repo.owner,
    repo: context.repo.repo,
    workflow_id: 'deploy_environment__azure.yml',
    ref: head,
    inputs: {
      app_container_image: appContainerImage,
      deployment_github_ref: head,
      app_type: environment == 'prod' ? 'prod' : 'review',
      app_name: `${context.repo.repo}-${deploymentEnvironment}`,
      environment_name: deploymentEnvironment
    }
  })
}

function validateParameter(payload, name) {
  const value = payload[name];

  if (!value) {
    throw new Error(`Required Parameter '${name}' was not provided.`);
  }
  return value;
}