const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Playwright tests...');
console.log('Time:', new Date().toISOString());

try {
    const result = execSync(
        'npx playwright test --project=chromium-desktop',
        {
            encoding: 'utf-8',
            timeout: 300000,
            cwd: __dirname
        }
    );
    console.log(result);
    console.log('\nALL TESTS PASSED');
} catch (e) {
    if (e.stdout) console.log(e.stdout);
    if (e.stderr) console.error(e.stderr);
    console.log('\nSOME TESTS FAILED. Exit code:', e.status);
}

// Generate summary from results.json if it exists
const resultsPath = path.join(__dirname, 'test-results', 'results.json');
if (fs.existsSync(resultsPath)) {
    try {
        const data = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
        const suites = data.suites || [];
        let passed = 0, failed = 0, skipped = 0;
        
        const countResults = (specs) => {
            for (const spec of specs) {
                if (spec.tests) {
                    for (const test of spec.tests) {
                        for (const result of test.results || []) {
                            if (result.status === 'passed') passed++;
                            else if (result.status === 'failed') failed++;
                            else skipped++;
                        }
                    }
                }
            }
        };

        const walkSuites = (suites) => {
            for (const suite of suites) {
                countResults(suite.specs || []);
                if (suite.suites) walkSuites(suite.suites);
            }
        };

        walkSuites(suites);

        const summary = `\n========== RESUMEN ==========\nPassed: ${passed}\nFailed: ${failed}\nSkipped/Other: ${skipped}\nTotal: ${passed + failed + skipped}\n`;
        console.log(summary);
        
        // Save summary
        fs.writeFileSync(
            path.join(__dirname, 'test-results', 'summary.txt'),
            summary,
            'utf-8'
        );
    } catch (err) {
        console.error('Error reading results:', err.message);
    }
}

console.log('Done:', new Date().toISOString());
