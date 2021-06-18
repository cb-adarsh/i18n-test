const i18n = require("./i18n")
const {getKeysInPathAsArray, getKeysInPathAsObject, generateLocaleKeys} = require("./utils");

function loadLocalesAndTestKeys(locales, keys, language) {
    i18n.loadNamespace(locales, language)
        .then(_ => {
            keys.forEach(k => i18n.i18n.t(k))
        })
        .catch(err => console.log(err))
}

exports.testFiles = function (srcPath, locales, language) {
    try {
        const keys = getKeysInPathAsArray(srcPath);
        loadLocalesAndTestKeys(locales, keys, language);
        console.log('If there are no errors above, then all keys are found')
    } catch (e) {
        console.error(e)
    }
}

exports.testLocales = function (srcPath, locales) {
    try {
        const keys = getKeysInPathAsObject(srcPath);
        let localeFiles = locales//locales.includes(",") ? locales.split(",") : [locales];
        let localeKeys = [];
        localeFiles.forEach(l => {
            localeKeys.push(...generateLocaleKeys(l))
        })
        localeKeys.forEach(lKey => {
            if (!keys[lKey]) {
                console.log(lKey)
            }
        })
    } catch (e) {
        console.error(e)
    }
}