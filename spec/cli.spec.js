const fs = require('fs');
const path = require('path');
describe('CLI', () => {
    beforeEach(() => {
        try {
            fs.unlinkSync(path.join(process.cwd(), '.htmltopdf.json'));
        } catch (e) {
            console.error('.htmltopdf.json has already been removed!');
        }
    });
    afterEach(() => {
        delete process.argv[2];
    });
    it('should use configuration file in CI mode', () => {
        process.argv[2] = '--ci';
        const testJsonPath = path.join(process.cwd(), 'spec', 'helpers', 'testhtmltopdf.json');
        const testDestPath = path.join(process.cwd(), '.htmltopdf.json');
        fs.copyFileSync(testJsonPath, testDestPath);
        const successString = 'done with generation';
        let cli = require('../cli');
        const index = require('../index');
        spyOn(index, 'main').and.callFake(() => {
            return successString;
        });
        spyOn(cli, 'main').and.callThrough();

        cli.main().then((val) => {
            expect(val).toBe(successString);
        });
        expect(cli.main).toHaveBeenCalled();
        expect(index.main).toHaveBeenCalled();
    });

    it('should throw an error if no configuration file is found in CI mode', () => {
        process.argv[2] = '--ci';
        const error = 'No configuration file found';
        let cli = require('../cli');
        const index = require('../index');
        spyOn(index, 'main').and.callFake(() => {
            return -1;
        });
        spyOn(cli, 'main').and.callThrough();
        let promise = cli.main();
        promise.then(() => {
            fail('Promise should not resolve');
        }, (reason) => {
            expect(reason).toEqual(new Error(error));

        });
        expect(cli.main).toHaveBeenCalled();
        expect(index.main).not.toHaveBeenCalled();
    });

    it('should run as expected in interactive mode', () => {

    });
});