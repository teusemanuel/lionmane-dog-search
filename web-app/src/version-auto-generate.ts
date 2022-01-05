const { gitDescribeSync } = require('git-describe');
// const pwaConfig = require('../ngsw-config.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');

const gitInfo = gitDescribeSync({
	dirtyMark: false,
	dirtySemver: false,
	match: '*'
});

// gitInfo.version = version; // Changed to repository tag to get latest version

// pwaConfig.appData = { tag: gitInfo.tag };

const file = resolve(__dirname, '..', 'src', 'environments', 'version.ts');
// const appDataFile = resolve(__dirname, '..', 'ngsw-config.json');
writeFileSync(file,
	`// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const BUILD_VERSION = ${JSON.stringify(gitInfo, null, 4)};
/* tslint:enable */
`, { encoding: 'utf-8' });

// writeFileSync(appDataFile, JSON.stringify(pwaConfig, null, 4), { encoding: 'utf-8' });

console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`);
