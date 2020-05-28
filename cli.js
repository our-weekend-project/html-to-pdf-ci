#!/usr/bin/env node
const inquirer = require('inquirer');
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

const fs = require('fs');
const path = require('path');
const htmlToPdfCI = require('./index');
const package = require('./package.json');
const ci = process.argv[2];
let configFile = {};
try {
    configFile = JSON.parse(fs.readFileSync(path.join(process.cwd(), '.htmltopdf.json')));
} catch (error) {
    console.log('No configuration file found. Using default values.');
}
if (ci === '--ci') {
    if (Object.keys(configFile).length === 0 && configFile.constructor === Object ) {
        console.error('No configuration file!');
        throw new Error('No configuration file found');
    }
    console.log('Running in CI environment with options:');
    console.log(configFile);
    htmlToPdfCI.main(configFile);
} else {
    const questionsModule = require('./questions');
    const questions = questionsModule.createQuestions(configFile);
    inquirer.prompt(questions).then(answers => {
        if (answers.saveToConfig) {
            delete answers.saveToConfig;
            fs.writeFileSync(path.join(process.cwd(), '.htmltopdf.json'), JSON.stringify(answers));
            console.log('Successfully saved config file!');
        }
        console.log(`Generating ${answers.fileName}`);
        htmlToPdfCI.main(answers);
    });

}