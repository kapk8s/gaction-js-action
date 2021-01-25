const core = require('@actions/core');
const github = require('@actions/github');
const Octokit = require('@octokit/rest');
const octokit = new Octokit({
  auth: core.getInput('secret')
});

try {
  // `who-to-greet` input defined in action metadata file
  const secret = core.getInput('secret');
  console.log(`Secret: ${secret}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  console.log('Octokit:', octokit);
} catch (error) {
  core.setFailed(error.message);
}