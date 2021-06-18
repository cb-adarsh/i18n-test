const {testFiles, testLocales} = require("./lib");
const {program} = require('commander');
program
    .version('0.0.1')
    .description("Scrubs through all the files under srcPath and searches for string with pattern 'dot separated in single quotes' Ex: 'global.action.dismiss'")
    .option('--checkKeys', 'Check keys if equivalent locale is present')
    .option('--checkLocale', 'Check for unused locale')
    .option('-src, --srcPath <srcPath>', 'Input path - All files under this path will be tested')
    .option('-loc, --localeFiles <localeFiles>', 'Locale Files - exact locale files separated by commas in "export default {...}" format')
    .option('-lang, --language <localeFiles>', 'Language. Default "en"')
    .option('-lang, --language <localeFiles>', 'Language. Default "en"')
    .parse(process.argv);

const options = program.opts();

if (options.srcPath == undefined) {
    throw new Error('Input location is required. Type help for more info')
}
if (options.localeFiles == undefined) {
    throw new Error('Locale files is required. Type help for more info')
}


let localeFiles = options.localeFiles.includes(",") ? options.localeFiles.split(",") : [localeFiles];
if (options.checkKeys) {
    testFiles(options.srcPath, localeFiles)
}
if (options.checkLocale) {
    testLocales(options.srcPath, localeFiles)
}



