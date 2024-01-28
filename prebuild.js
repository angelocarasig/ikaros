require('dotenv').config();
const fs = require('fs');

const replaceEnvValues = (file, envVariables) => {
  let envFileContent = fs.readFileSync(file, 'utf8');

  Object.keys(envVariables).forEach(key => {
    envFileContent = envFileContent.replace(new RegExp(`%${key}%`, 'g'), envVariables[key]);
  });

  fs.writeFileSync(file, envFileContent, 'utf8');
};

const environmentVariables = {
  'SUPABASE_URL': process.env.SUPABASE_URL,
  'SUPABASE_ANON_KEY': process.env.SUPABASE_ANON_KEY
};

replaceEnvValues('./ikaros/src/environments/environment.ts', environmentVariables);
replaceEnvValues('./ikaros/src/environments/environment.prod.ts', environmentVariables);
