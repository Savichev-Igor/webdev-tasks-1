const fs = require('fs');

module.exports = {
    gitHubApi: 'https://api.github.com',
    key: fs.readFileSync('key.txt', 'utf-8'),
    mainRepo: 'urfu-2015',
    jsTasksPrefix: 'javascript-tasks-',
    verstkaTasksPrefix: 'verstka-tasks-',
    numberTasks: 1,

    onlineDict: 'http://vnutrislova.net/разбор/по-составу/',
    rootRegExp: /корень \[(.*?)\]/,

    unions: 'unions.txt',
    prepositions: 'prepositions.txt',
    punctuationMarks: 'punctuationMarks.txt'
};
