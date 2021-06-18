# Locale keys tester tool

Simple locale tester tool to check whether keys used in Chargebee-ui repo has equivalent definitions

checkKeys -> Scrubs through all the files under 'srcPath' and searches for string with pattern 'dot separated in single quotes' Ex: 'global.action.dismiss'
checkLocale -> Scrubs through all the files under 'srcPath' and checks for unused locales
## Usage

```bash
Usage: npm run checkKeys [options] // to check for invalid keys in use
Usage: npm run checkLocale [options] // to check for unused keys in locale file

Options:
  -V, --version                      output the version number
  -src, --srcPath <srcPath>        Input path - All files under this path will be tested
  -loc, --localeFiles <localeFiles>  Locale Files - exact locale files separated by commas in "export default {...}" format
  -lang, --language <localeFiles>    Language. Default "en"
  -h, --help                         display help for command
```

### Example

```bash

//To check for invalid keys in use
npm run checkKeys -src src/revenuestory -loc src/app/locales-latest/en/global.ts,src/app/locales-latest/en/navbar.ts

//To check for unused keys in locale file
Usage: npm run checkLocale -src src/revenuestory -loc src/app/locales-latest/en/global.ts,src/app/locales-latest/en/navbar.ts
```
