const path = require('path');
const puppeteer = require('puppeteer');
const express = require('express');

const main = async (answers) => {
    try {
        const port = 5001;
        const destPath = path.join(process.cwd(), answers.destinationPath);
        const fullResumePath = `http://localhost:${port}/${answers.sourcePath}`;
        let destFilename = answers.fileName;
        const app = express();
        app.use(express.static(path.join(process.cwd())));
        const server = app.listen(port, async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            if (!destFilename.endsWith('.pdf')) {
                destFilename += '.pdf';
            }
            await page.goto(fullResumePath, { waitUntil: 'networkidle0' });
            await page.pdf({
                path: path.join(destPath, destFilename),
                format: 'Letter',
                printBackground: true,
                margin: {
                    top: '0.4 in',
                    left: '0.4 in',
                    right: '0.39 in',
                    bottom: '0.39 in'
                }
            });
            await browser.close();
            server.close(() => {
                console.log(`Finished generating ${answers.fileName}`);
                console.log(`${answers.fileName} located in ${answers.destinationPath}/`);
            });
        });
        return;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

module.exports = {
    main
};