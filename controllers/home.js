const title = 'Home';
const viewName = 'home';
const links = require('./../routes/links.js').privateLinks;
const translate = require('./../helpers/translate.js');

module.exports.onGet = (request, response) => {
    response.render(viewName, { title, links, option: '1' });
}

module.exports.onPost =  async (request, response) => {
    let originalText = request.body.originalText;
    let translationOption = request.body.option || '1';

    let languages = [];
    languages.push('en');
    languages.push('zh-CN');
    if(translationOption == '2') {
        languages.push('es');
    }
    languages.push('en');
    
    let translatedText = originalText;
    for(var i = 0; i < languages.length - 1; i++) {
        translatedText = await translate(translatedText, languages[i], languages[i+1]);        
    }

    response.render(viewName, { 
        title,
        links,
        originalText, 
        echoText: translatedText,
        option: translationOption
    });
}
