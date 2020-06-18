import pluralize from 'pluralize';
import winkPorter2Stemmer from 'wink-porter2-stemmer';

export const isMainKeywordValid = (mainKeyword, productTitle) => {
    const serviceWords = [
        'of',
        'off',
        'for',
        'to',
        'and',
        'a',
        'an',
        'the',
        'in',
        'by',
        'on',
        'it',
        'if',
    ];

    const mainKeywordWords = normalizeString(mainKeyword)
        .split(' ')
        .filter(x => x.length > 0 && !serviceWords.includes(x))
        .map(x => toSingular(x))
        .map(x => winkPorter2Stemmer(x));

    const productTitleWords = normalizeString(productTitle)
        .split(' ')
        .filter(x => x.length > 0 && !serviceWords.includes(x))
        .flatMap(x => trimTitleWordSpecialCharacters(x))
        .map(x => toSingular(x))
        .map(x => winkPorter2Stemmer(x));

    return mainKeywordWords.every(x => productTitleWords.includes(x));
};


function normalizeString(str) {
    let newStr = str || '';
    newStr = newStr.trim().replace(/\s+/gi, ' ');
    newStr = newStr.toLowerCase();
    return newStr;
}

function trimTitleWordSpecialCharacters(word) {
    const hardTrimCharacters = ' !?🔶✓,:';
    const softTrimCharacters = '."\'`+-';
    const hard = trimCharacters(word, hardTrimCharacters);
    const soft = trimCharacters(hard, softTrimCharacters);
    return hard === soft ?
        [hard] :
        [hard, soft];
}

function trimCharacters(str, characters) {
    const replacers = characters.split('').map(x => {
        if (x === ']') {
            return '\\]';
        }
        if (x === '\\') {
            return '\\\\';
        }
        return x;
    });
    const reg = new RegExp('^[' + replacers.join('') + ']+|[' + replacers.join('') + ']+$', 'g');
    return str.replace(reg, '');
}

function toSingular(word) {
    let newWord = word;
    let suffixes = [
        '`s',
        '\'s',
        '"s',
    ];
    for (const suffix of suffixes) {
        if (newWord.endsWith(suffix)) {
            newWord = newWord.substr(0, newWord.length - suffix.length);
            break;
        }
    }
    let prevWord = newWord;
    newWord = pluralize.singular(newWord);
    while (newWord !== prevWord) {
        prevWord = newWord;
        newWord = pluralize.singular(newWord);
    }
    return newWord;
}