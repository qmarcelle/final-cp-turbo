const fs = require('fs');
const p2s = require('postman-to-swagger');
const yaml = require('js-yaml');

async function run() {
  const input = './packages/api-client/memberServive.json';
  const output = './docs/member-api.yaml';
  const postman = JSON.parse(fs.readFileSync(input, 'utf8'));
  const swagger = await p2s(postman, { t: 'openapi3.0' });
  fs.mkdirSync('./docs', { recursive: true });
  fs.writeFileSync(output, yaml.dump(swagger), 'utf8');
  console.log(`✅ Converted to ${output}`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
