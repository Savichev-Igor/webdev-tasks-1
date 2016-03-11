const fs = require('fs');
const config = require('./config');

const englishLetterRegExp = /[a-z]/;
const numbersRegExp = /[0-9]/;
const russianLettersRegExp = /[^а-яё]/;

/**
 * Функция, которая удаляет все ненужные символы из текста.
 * @param {array} list
 * @param {string} text
 * @return {string} newText
 */
function removeSymbols(text, list) {
    var newText;

    newText = list.reduce(function (res, current) {
        return res.replace(new RegExp('\\' + current, 'g'), ' ');
    }, text);

    return newText;
}

/**
 * Функция, которая анализирует текст и удаляет из него:
 * - предлоги
 * - союзы
 * - английские слова
 * - цифры
 * - то что не входит в русской алфавит
 * @param {string} text
 * @param {Array} listOne
 * @param {Array} listTwo
 * @return {Array} newWordsList
 */
function smartAnalyzer(text, listOne, listTwo) {
    var newTextList = text.split(' ');

    var newWordsList = [];

    newTextList.forEach(function (item) {
        item = item.replace(new RegExp('\n', 'g'), '');
        if ((item) && (listOne.indexOf(item) === -1) && (listTwo.indexOf(item) === -1) &&
            (!englishLetterRegExp.test(item)) &&
            (!numbersRegExp.test(item)) &&
            (!russianLettersRegExp.test(item))) {
            newWordsList.push(item);
        }
    });

    return newWordsList;
}

/**
 * Функция, которая очищает текст от не нужных символов и не нужных слов.
 * @param {Array} textsList
 * @param {Function} callback
 */
function clean(textsList, callback) {
    var cleanlyWordsLists = [];

    var tempText;
    var tempCleanlyWordsList;

    var punctuationMarks = fs.readFileSync(config.punctuationMarks, 'utf-8').split('\n');
    var prepositions = fs.readFileSync(config.prepositions, 'utf-8').split('\n');
    var unions = fs.readFileSync(config.unions, 'utf-8').split('\n');

    textsList.forEach(function (item) {
        tempText = removeSymbols(item, punctuationMarks);
        tempCleanlyWordsList = smartAnalyzer(tempText, prepositions, unions);
        cleanlyWordsLists.push(tempCleanlyWordsList);
    });

    callback(null, cleanlyWordsLists);
}

module.exports.clean = clean;
