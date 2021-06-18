const VueI18n = require('vue-i18n');
const Vue = require("vue");
const fs = require('fs');
const {readLocaleFiles} = require("./utils");

Vue.use(VueI18n);

const locale = 'en';


const i18n = new VueI18n({
    locale, // set locale
    fallbackLocale: locale,
    modifiers: {
        fullcaps: str => str.toLocaleUpperCase()
    }
});

i18n.missing = (locale, key) => {
    console.error(`i18n - ${key} for ${locale} is missing`);
}


exports.loadNamespace =  async function(namespace, lang = locale) {
    const _namespaces = Array.isArray(namespace) ? namespace : [namespace];
    for (const ns of _namespaces) {
        const [fileName, json] = readLocaleFiles(ns);
        i18n.mergeLocaleMessage(lang, {
            [fileName]: json
        });
    }

    return Promise.resolve();
}

exports.i18n = i18n;
