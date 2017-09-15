module.exports.onGet = (request, response) => {
    request.session.isAuthorized = false;
    response.redirect('/home');
}
