const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

function getCollection(name) {
    const filePath = path.join(dataDir, `${name}.json`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(filePath));
}

function saveCollection(name, data) {
    const filePath = path.join(dataDir, `${name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function generateId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

module.exports = { getCollection, saveCollection, generateId };
