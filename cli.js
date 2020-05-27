const inquirer = require('inquirer');
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

const fs = require('fs');
const path = require('path');
const htmlToPdfCI = require('./index');
const package = require('./package.json');
const ci = process.argv[2];
let configFile;
try {
    configFile = JSON.parse(fs.readFileSync(path.join(__dirname, '.htmltopdf.json')));
} catch (error) {

}
if (ci === '--ci') {
    if (!configFile) {
        console.error('No configuration file!');
        throw new Error('No configuration file found');
    }
    console.log('CI env');
    htmlToPdfCI.main(configFile);
} else {
    
    const questions = [
        {
            type: 'input',
            name: 'fileName',
            message: 'Enter a file name for generated PDF',
            default: `${configFile.fileName ? configFile.fileName : 'default.pdf'}`
        },
        {
            type: 'fuzzypath',
            name: 'destinationPath',
            excludePath: nodePath => nodePath.startsWith('node_modules') || nodePath.startsWith('.git'),
            rootPath: './',
            message: 'Enter a destination path for generated PDF',
            default: `${configFile.destinationPath ? configFile.destinationPath : './output'}`
        },
        {
            type: 'input',
            name: 'sourceDocument',
            message: 'Enter the name of the source HTML document',
            default: `${configFile.sourceDocument ? configFile.sourceDocument : 'index.html'}`
        },
        {
            type: 'fuzzypath',
            name: 'sourcePath',
            excludePath: nodePath => nodePath.startsWith('node_modules') || nodePath.startsWith('.git'),
            rootPath: './',
            message: 'Enter the path of the source HTML document',
            default: `${configFile.sourcePath ? configFile.sourcePath : './'}`
        },
        {
            type: 'fuzzypath',
            name: 'sitePath',
            excludePath: nodePath => nodePath.startsWith('node_modules') || nodePath.startsWith('.git'),
            rootPath: './',
            message: 'Enter the path to the generated site folder',
            default: `${configFile.sitePath ? configFile.sitePath : './_site'}`
        },
        {
            type: 'confirm',
            name: 'saveToConfig',
            message: 'Save responses to .htmltopdf.json?',
            default: true
        }
    ];
    
    inquirer.prompt(questions).then(answers => {
        if (answers.saveToConfig) {
            delete answers.saveToConfig;
            fs.writeFileSync(path.join(__dirname, '.htmltopdf.json'), JSON.stringify(answers));
            console.log('Successfully saved config file!');
        }
    });

}