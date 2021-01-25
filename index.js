const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/rest');
const { createActionAuth } = require("@octokit/auth-action");
const auth = createActionAuth();
const authentication = await auth();

const secret = core.getInput('GITHUB_TOKEN');
const octokit = new Octokit({
  authStrategy: createActionAuth,
  auth: authentication
});
try {

  octokit.issues.create({
    owner: "kapk8s",
    repo: "gaction-test",
    title: "Issue created by action"
  });  
  console.log(`Secret: ${secret.split()}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context, undefined, 2)
  // console.log(`The event payload: ${payload}`);
  // console.log('Octokit:', octokit);

  octokit.repos.update({
    owner: "kapk8s",
    repo: "gaction-test",
    private: false,
    visibility: "public"
  });

} catch (error) {
  core.setFailed(error.message);
}