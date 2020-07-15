// STEPS:
// 1. clean new main keyword using cleanMainKeyword()
// 2. if exactly the same keyword already exists -> do not add new keyword (currently already implemented)
// 3. check keywordHasMeaningfulWords() -- if false -> show keyword with red triangle for new keyword
// 4. check findExistingDuplicateOfNewMainKeyword() -- if not undefined (duplicate keyword was found) -> show keyword with red triangle with duplicated keyword text
// 5. check isMainKeywordValid() -- if false -> show keyword with with yellow triangle
// 6. check isTooShort() -- if true -> show keyword with with yellow triangle
// 7. check isLongTail() -- if true -> show keyword with with yellow triangle
// 8. otherwise just add new keyword to the list
// 9. now we need to recheck all keywords using isKeywordExtendsAnother() -- for every keyword this function does not return undefined - show yellow triangle (if keyword does not already have triangle problem) with found keyword and text about extension

import winkPorter2Stemmer from 'wink-porter2-stemmer';
import pluralize from 'pluralize';

export function keywordHasMeaningfulWords(keyword) {
    const serviceWords = [
        'of',
        'off',
        'for',
        'to',
        'and',
        "'gainst",
        "'long",
        "'mong",
        "'mongst",
        "'neath",
        "'pon",
        "'round",
        "'til",
        '@',
        'a',
        'ablow',
        'aboard',
        'about',
        'above',
        'abreast',
        'absent',
        'accord',
        'according to',
        'across',
        'across from',
        'adhering',
        'adjacent to',
        'adverse to',
        'afore',
        'after',
        'again',
        'against',
        'ago',
        'ahead of',
        'ahind',
        'allow',
        'along',
        'along with',
        'alongside',
        'alongst',
        'amid',
        'amidst',
        'among',
        'amongst',
        'an',
        'an advance of',
        'anear',
        'anterior to',
        'antithesis',
        'apart',
        'apart from',
        'apposition',
        'approaching to',
        'apropos',
        'apud',
        'around',
        'as',
        'as far as',
        'as for',
        'as of',
        'as opposed to',
        'as per',
        'as regards',
        'as soon as',
        'as well as',
        'aside',
        'aside from',
        'aslant',
        'associated wit',
        'astride',
        'at',
        'at random through',
        'at the back part',
        'at the behest of',
        'athwart',
        'atop',
        'atween',
        'away',
        'away from',
        'ayond',
        'b4',
        'back to',
        'backward',
        'bar',
        'because of',
        'before',
        'behind',
        'belonging to',
        'beneath',
        'beside',
        'besides',
        'between',
        'betwixt',
        'beyond',
        'but',
        'by',
        'by aid of',
        'by means of',
        'by reason of',
        'by the agency of',
        'by virtue of',
        'c.',
        'ca.',
        'chez',
        'circa',
        'close to',
        'come',
        'concerning',
        'conjoined',
        'connected with',
        'consequence',
        'counter to',
        'cross',
        'crosswise',
        'c̄',
        'dehors',
        'despite',
        'distinct',
        'down',
        'due to',
        'during',
        'earlier than',
        'else',
        'else than',
        'encircling',
        'encompassing',
        'engaged in',
        'exceeding',
        'except',
        'except for',
        'excepting',
        'exclusively of',
        'extent',
        'face to face with',
        'far from',
        'farther',
        'farther onward',
        'following',
        'for lack of',
        'for the sake of',
        'for want of',
        'free of access to',
        'from',
        'from side to side',
        'front',
        'further',
        'further than',
        'gain',
        'gainst',
        'hence',
        'in',
        'in absence of',
        'in accordance with',
        'in act of',
        'in addition to',
        'in behalf of',
        'in case of',
        'in concern with',
        'in consideration of',
        'in continuance',
        'in contrariety to',
        'in excess of',
        'in favor of',
        'in front of',
        'in lieu of',
        'in opposition to',
        'in place of',
        'in point of',
        'in presence or sight of',
        'in promoting which',
        'in spite of',
        'in the character of',
        'in the direction of',
        'in the power of',
        'in the rear',
        'in view of',
        'independently of',
        'inferior to',
        'inside',
        'inside of',
        'instead',
        'instead of',
        'instead of which',
        'intent on',
        'into',
        'later',
        'leaving behind',
        'left of',
        'less',
        'like',
        'lower',
        'lower than',
        'making part of',
        'mid',
        'midst',
        'mong',
        'more',
        'more than',
        'near',
        'near to',
        'nearer',
        'nearest',
        'neath',
        'next to',
        'not off',
        'not on',
        'not within',
        'notwithstanding',
        "o'",
        "o'er",
        'on',
        'on account of',
        'on account of which',
        'on all sides of',
        'on another side of',
        'on behalf of',
        'on the point or verge of',
        'on top of',
        'onto',
        'ontop',
        'onward',
        'open for',
        'opposite',
        'opposite of',
        'opposite to',
        'opposition',
        'or',
        'or destitution of',
        'other',
        'other than',
        'out',
        'out from',
        'out of',
        'out of reach of',
        'out of sight',
        'out of the limits of',
        'outen',
        'outside',
        'outside of',
        'over',
        'owing to',
        'past',
        'per',
        'pon',
        'pre',
        'previously to',
        'prior to',
        'pro',
        'proceeding',
        'proceeding from',
        'pursuant to',
        'qua',
        'quite over',
        'rather than',
        're',
        'regarding',
        'regardless of',
        'relating to',
        'remaining',
        'right of',
        'sans',
        'sauf',
        'separate',
        'separation from',
        'since',
        'sithence',
        'spite',
        'subsequent',
        'subsequent to',
        'such as',
        'superior to',
        'surpassing',
        'tending to',
        'than',
        'thanks to',
        'the',
        'the cause',
        'the reason of',
        'through',
        'throughout',
        'thru',
        'thruout',
        'til',
        'till',
        'to a conclusion',
        'to the end',
        'to the inside of',
        'to the ultimate purpose',
        'tofore',
        'toward',
        'toward the back part or rear',
        'toward which',
        'towards',
        'unbefitting',
        'underneath',
        'unless',
        'unlike',
        'until',
        'unto',
        'unworthy of',
        'up',
        'up to',
        'upon',
        'upside',
        'v.',
        'versus',
        'via',
        'vice',
        'vis-à-vis',
        'vs.',
        'w/',
        'w/i',
        'w/o',
        'what',
        'where',
        'which',
        'who',
        'whole',
        'whom',
        'whose',
        'why',
        "wi'",
        'with',
        'with a view to',
        'with omission',
        'with reference to',
        'with regard to',
        'with respect to',
        'withal',
        'within',
        'without',
        'worth',
        'it',
        'if',
    ];

    const normalized = normalizeString(keyword);

    if (normalized.length < 3) {
        return false;
    }

    return normalized
        .split(' ')
        .filter(x => x.length > 0 && !serviceWords.includes(x))
        .length > 0;
}

export function isMainKeywordValid(mainKeyword, productTitle) {
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
}

export function cleanMainKeyword(keyword) {
    const allSpecialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', ':', '\'', '|', '<', '>', '?', '[', ']', ';', '\'', '\\', ',', '.', '/', '-', '=', '®', '', '™', '°', '’', '©', '❤', 'ღ', '♕'];
    const leaveAfterDigitCharacters = [',', '.', '+', '-'];
    const removeAllSpecialCharacters = difference(allSpecialCharacters, leaveAfterDigitCharacters);
    const leaveAfterDigitRegExp = new RegExp(`(?<!\\d)[${leaveAfterDigitCharacters.map(x => `\\${x}`).join('')}]`, 'gi');
    const removeAllRegExp = new RegExp(`[${removeAllSpecialCharacters.map(x => `\\${x}`).join('')}]`, 'gi');

    return normalizeString(keyword.replace(removeAllRegExp, ' ').replace(leaveAfterDigitRegExp, ' '));
}

export function isTooShort(keyword) {
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

    const safeWords = normalizeString(keyword)
        .split(' ')
        .filter(x => x.length > 0 && !serviceWords.includes(x));

    return uniq(safeWords).length <= 1;
}

export function isLongTail(keyword) {
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

    const safeWords = normalizeString(keyword)
        .split(' ')
        .filter(x => x.length > 0 && !serviceWords.includes(x));

    return uniq(safeWords).length > 3;
}

export function findExistingDuplicateOfNewMainKeyword(newMainKeyword, existingMainKeywords) {
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
    const toRoot = kw => normalizeString(kw)
        .split(' ')
        .filter(x => x.length > 0 && !serviceWords.includes(x))
        .map(x => toSingular(x))
        .map(x => winkPorter2Stemmer(x))
        .sort()
        .join(' ');
    const newMainKeywordRoot = toRoot(newMainKeyword);

    return existingMainKeywords.find(x => {
        const otherWordRoot = toRoot(x);
        // skip empty other word
        if (otherWordRoot.length === 0) {
            return false;
        }
        return newMainKeywordRoot === otherWordRoot;
    });
}

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

function difference(arrA, arrB) {
    return arrA.filter(x => arrB.indexOf(x) === -1);
}

function uniq(arr) {
    return arr.filter((x, i) => arr.indexOf(x) === i);
}

export function isKeywordExtendsAnother(keyword, otherKeywords) {
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

    const toRootWords = kw => normalizeString(kw)
        .split(' ')
        .filter(x => x.length > 0 && !serviceWords.includes(x))
        .map(x => toSingular(x))
        .map(x => winkPorter2Stemmer(x));
    const keywordRootWords = toRootWords(keyword);
    return otherKeywords.find(x => {
        const otherWords = toRootWords(x);
        // ignore other keyword without any real words
        if (otherWords.length === 0) {
            return false;
        }
        return otherWords.length < keywordRootWords.length && difference(otherWords, keywordRootWords).length === 0 && x !== keyword;
    });
}