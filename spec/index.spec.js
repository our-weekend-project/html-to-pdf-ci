const path = require('path');
const fs = require('os');
const { exec, execFile } = require('child_process');
const spawn = require('child_process').spawn;
const execFileSync = require('child_process').execFileSync;
const process = require('process');
const readline = require('readline');
const sleep = require('util').promisify(setTimeout);

describe('index', () => {
    let index = require('../index');
    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    it('runs as expected', async () => {
        spyOn(index, "main");
        const answers = require('./helpers/testAnswers.json');
        console.log(answers);
        await index.main(answers);
        expect(index.main).toHaveBeenCalled();
        expect(index.main).toHaveBeenCalledWith(answers);
        expect(index.main).not.toThrowError();

    });
});