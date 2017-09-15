var confidential = require('./../config/confidential.js');
var googleTranslate = require('google-translate')(confidential.GOOGLE_API_KEY);

module.exports = (text, sourceLanguage, targetLanguage) => {
    const promise = new Promise((resolve, reject) => {
        try {
            googleTranslate.translate(text, sourceLanguage, targetLanguage, (error, result) => {
                if (error) {
                    throw error;
                }
                resolve(result.translatedText);
            });

        } catch (exception) {
            reject(exception);
        }
    });

    return promise;
};
