const title = 'Sign-on';
const viewName = 'signon';
const links = require('./../routes/links.js').publicLinks;
const user = require('./../models/user.js');

module.exports.onGet = (request, response) => {
    response.render(viewName, { title, links });
}

module.exports.onPost = async (request, response) => {
    try {
        let userSigningOn = await user
            .findOne({ email: request.body.email })
            .exec();
        
        if(userSigningOn) {
            let isAuthentic = await userSigningOn.isAuthentic(request.body.password);
            if(isAuthentic) {
                request.session.isAuthorized = true;
                request.session.userName = userSigningOn.getDisplayName();
                return response.redirect('/home');            
            }
        }
    } catch (error) {
        console.error(error);
    }

    return response.render(viewName, { title, links, error: 'Invalid User Name or Password.' });
}
