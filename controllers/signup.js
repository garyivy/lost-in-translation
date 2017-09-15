const title = 'New Account';
const viewName = 'signup';
const links = require('./../routes/links.js').publicLinks;
const user = require('./../models/user.js');

module.exports.onGet = (request, response) => {
    response.render(viewName, { title, links });
}

module.exports.onPost = async (request, response) => {
    try {
        let userSigningUp = new user({ 
            email: request.body.email,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            password: request.body.password
        });
        
        let result = await userSigningUp.save();

        if(result) {
            request.session.isAuthorized = true;
            request.session.userName = result.getDisplayName();
            return response.redirect('/home');        
        }
    } catch (error) {
        console.error(error);
    }

    return response.render(viewName, { title, links, error: 'Invalid Form Values.' });
}
