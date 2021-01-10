const core = require('@actions/core');
const github = require('@actions/github');
const cache = require('@actions/cache');
const fs = require('fs');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
  console.log(process.cwd());
  let contents = btoa(JSON.stringify(fs.readdirSync(process.cwd())));
  let contents2 = btoa(JSON.stringify(fs.readdirSync('./')));

  console.log('contents: ', contents);
  console.log('contents: ', contents2);
} catch (error) {
  core.setFailed(error.message);
}