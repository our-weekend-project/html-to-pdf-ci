const path = require('path');
const puppeteer = require('puppeteer');
const express = require('express');

const main = async (program) => {
    try {
        const port = 5001;
        const destPath = path.join(__dirname, program.destinationPath);
        const fullResumePath = `http://localhost:${port}/${program.sourcePath}/${program.sourceDocument}`;
        const destFilename = program.fileName;
        const app = express();
        app.use(express.static(path.join('../', program.sitePath)));
        const server = app.listen(port, async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

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
                console.log(`closing server`);
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