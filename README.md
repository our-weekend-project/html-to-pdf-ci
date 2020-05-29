# HTML-To-PDF-CI
[![License](https://badgen.net/github/license/our-weekend-project/html-to-pdf-ci)](https://github.com/our-weekend-project/html-to-pdf-ci/LICENSE)
[![npm version](https://badgen.net/npm/v/@our-weekend-project/html-to-pdf-ci)](https://www.npmjs.com/package/@our-weekend-project/html-to-pdf-ci)

[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=our-weekend-project/html-to-pdf-ci)](https://dependabot.com)
[![Master build status](https://badgen.net/github/status/our-weekend-project/html-to-pdf-ci)](https://github.com/our-weekend-project/actions)
[![Latest master commit](https://badgen.net/github/last-commit/our-weekend-project/html-to-pdf-ci/master)](https://github.com/our-weekend-project/html-to-pdf-ci/commits/master)

A CLI/CI tool for generating PDFs from HTML documents for static site generators.

![Application in action](img/app.gif)

## How to use
* `npx @our-weekend-project/html-to-pdf-ci` for interactive mode
* `npx @our-weekend-project/html-to-pdf-ci --ci` for continuous integration mode
* `npm i --save-dev @our-weekend-project/html-to-pdf-ci` if you wish to save to your dev environment then:
    * `html-to-pdf-ci` to launch in interactive mode 
    * `html-to-pdf-ci --ci` to run in continuous integration mode

### Interactive mode

This is the default mode of the app and allows you to enter your specific information.
If the `.htmltopdf.json` file exists, the interactive mode will use the config values as the default options.
You can change these defaults at any time by entering new values and ensuring you save your changes to the config file.

### Continuous integration mode

This mode can be activated by passed the `--ci` flag when calling the app.
This mode will show you the values from the config file and run the conversion automatically.
**Note: This mode will fail if no `.htmltopdf.json` file exists!**

## Question/Prompts

### File name prompt

You can enter a file name with or without the `.pdf` extension.
This will overwrite existing PDFs with the same name.

### Destination path prompt

The place where to put the generated PDF.
The destination should exist before generating the PDF!

### Source path prompt

The path to your HTML source document.
The path must end with the actual HTML document, e.g. `somePath/index.html`.

### Print background prompt

Confirm whether or not a user wants to print background graphics from the selected HTML document.

### Landscape orientation prompt

Confirm whether a user wants to print in landscape or portrait orientation.

### Use custom margins prompt

Confirm if a user wants to use custom margins.
If a user inputs `y`, then the following prompts appear:

* Top margin which can use units of `px`, `in`, `mm`, or `cm`
* Left margin which can use units of `px`, `in`, `mm`, or `cm`
* Right margin which can use units of `px`, `in`, `mm`, or `cm`
* Bottom margin which can use units of `px`, `in`, `mm`, or `cm`

### Paper format prompt

Select which paper format puppeteer should use.
The following values are valid: Letter, Legal, Tabloid, Ledger, A0, A1, A2, A3, A4, A5, and A6.

### Save prompt

This is a confirm prompt for saving the new values into the `.htmltopdf.json` file.