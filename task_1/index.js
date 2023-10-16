import { encoded, translations } from './data.js';

function decode(encoded, translations) {
    const decoded = encoded.map(item => {
    const decodedItem = {};
    for (const key in item) {
        if (key.endsWith('Id')) {
            const translationKey = parseInt(item[key]);
            decodedItem[key] = translations[translationKey] || item[key];
        } else {
            decodedItem[key] = item[key];
        }
    }
        return decodedItem;
    });

    const uniqueIds = Array.from(new Set(encoded.flatMap(item => Object.values(item))));
    return { decoded, uniqueIds };
    }

const decoded = decode(encoded, translations);
console.log(decoded);

