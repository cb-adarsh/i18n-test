const fs = require('fs');
const regExp = /(['])([a-z][\w-]*(?:\.[\w-]+)+)+?\1/g

function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

function getKeysInPathAsArray(srcPath) {
    let keys = [];
    getFiles(srcPath)
        .forEach(path => {
            try {
                const data = fs.readFileSync(path, 'utf8');
                const match = [...data.matchAll(regExp)]
                keys.push(...match.map(m => m[0].substring(1, m[0].length - 1)))
            } catch (err) {
                console.error(path, err)
            }
        })
    return keys
}

function getKeysInPathAsObject(srcPath) {
    let keys = {};
    getFiles(srcPath)
        .forEach(path => {
            try {
                const data = fs.readFileSync(path, 'utf8');
                const match = [...data.matchAll(regExp)]
                match
                    .map(m => m[0].substring(1, m[0].length - 1))
                    .forEach(key => {
                        keys[key] = true;
                    })
            } catch (err) {
                console.error(path, err)
            }
        })
    return keys;
}

function generateLocaleKeys(localePath) {
    const [fileName,json] = readLocaleFiles(localePath);
    return getKeysFromJSON(json).map(key => `${fileName}.${key}`);
}

function getKeysFromJSON(json) {
    if (typeof json !== "object") {
        return;
    }
    return Object.keys(json)
        .map(key => {
            const map = getKeysFromJSON(json[key])
            if (map === undefined) {
                return key;
            }
            return map.map(m => `${key}.${m}`)
        })
        .flat()
}

function readLocaleFiles(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    let nspace = filePath.split("/");
    nspace = nspace[nspace.length - 1]
    nspace = nspace.split('.')[0]
    const content = data.startsWith('export') ? data.substring(15) : data;
    return [nspace, eval('(' + content + ')')]
}

exports.getFiles = getFiles;
exports.getKeysInPathAsArray = getKeysInPathAsArray;
exports.getKeysInPathAsObject = getKeysInPathAsObject;
exports.generateLocaleKeys = generateLocaleKeys;
exports.readLocaleFiles = readLocaleFiles;