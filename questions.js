function createQuestions(configFile) {
    return [
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
            default: `${configFile.destinationPath ? configFile.destinationPath : 'output'}`
        },
        {
            type: 'fuzzypath',
            name: 'sourcePath',
            excludePath: nodePath => nodePath.startsWith('node_modules') || nodePath.startsWith('.git'),
            rootPath: './',
            message: 'Enter the path of the source HTML document',
            default: `${configFile.sourcePath ? configFile.sourcePath : '/'}`
        },
        {
            type: 'confirm',
            name: 'printBackground',
            message: 'Print background graphics?',
            default: `${configFile.printBackground ? configFile.printBackground : true}`
        },
        {
            type: 'confirm',
            name: 'paperOrientation',
            message: 'Print in landscape orientation?',
            default: `${configFile.paperOrientation ? configFile.paperOrientation : false}`
        },
        {
            type: 'confirm',
            name: 'useCustomMargins',
            message: 'Use custom margins for the generated PDF?',
            default: `${configFile.useCustomMargins ? configFile.useCustomMargins : false}`
        },
        {
            type: 'input',
            name: 'marginTop',
            message: 'Enter top margin in px, in, mm, or cm',
            default: `${configFile.marginTop ? configFile.marginTop : '0.4 in'}`,
            when: (answers) => {
                return answers.useCustomMargins
            }
        },
        {
            type: 'input',
            name: 'marginLeft',
            message: 'Enter left margin in px, in, mm, or cm',
            default: `${configFile.marginLeft ? configFile.marginLeft : '0.4 in'}`,
            when: (answers) => {
                return answers.useCustomMargins
            }
        },
        {
            type: 'input',
            name: 'marginRight',
            message: 'Enter right margin in px, in, mm, or cm',
            default: `${configFile.marginRight ? configFile.marginRight : '0.39 in'}`,
            when: (answers) => {
                return answers.useCustomMargins
            }
        },
        {
            type: 'input',
            name: 'marginBottom',
            message: 'Enter bottom margin in px, in, mm, or cm',
            default: `${configFile.marginBottom ? configFile.marginBottom : '0.39 in'}`,
            when: (answers) => {
                return answers.useCustomMargins
            }
        },
        {
            type: 'list',
            name: 'paperFormat',
            message: 'Select a paper format',
            choices: [
                'Letter',
                'Legal',
                'Tabloid',
                'Ledger',
                'A0',
                'A1',
                'A2',
                'A3',
                'A4',
                'A5',
                'A6'
            ],
            default: `${configFile.paperFormat ? configFile.paperFormat : 'Letter'}`
        },
        {
            type: 'confirm',
            name: 'saveToConfig',
            message: 'Save responses to .htmltopdf.json?',
            default: true
        }
    ];
}


module.exports = {
    createQuestions
};