const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, 'settings.json');

async function readJson() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const jsonObject = JSON.parse(data);
        return jsonObject.Class;
    } catch (error) {
        console.error('Ошибка чтения JSON:', error);
        return null;
    }
}

async function writeJson(Class) {
    try {
        const jsonString = JSON.stringify({ Class }, null, 2);
        await fs.writeFile(filePath, jsonString, 'utf8');
    } catch (err) {
        console.error('Ошибка записи JSON:', err);
    }
}

module.exports = { readJson, writeJson };