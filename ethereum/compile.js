const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);       //-->delete entire build folder

const campaignPath = path.resolve(__dirname, 'contracts', 'campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');       //-->read compile.sol from contract folder
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);        // check if directory already exist, if not creates one
// console.log(output);
for(let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':', '') +'.json'),
        output[contract]
    );
}
