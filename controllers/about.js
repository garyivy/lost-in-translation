const title = 'About';
const viewName = 'about';
const links = require('./../routes/links.js');

module.exports.onGet = (request, response) => {
    response.render(viewName, { 
        title,
        links: request.session.isAuthorized 
            ? links.privateLinks 
            : links.publicLinks
    });    
}
