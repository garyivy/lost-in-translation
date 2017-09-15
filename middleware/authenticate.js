module.exports = (request, response, next) => {

    var isAuthorized = request && request.session && request.session.isAuthorized;

    if (!isAuthorized) {
        response.redirect('/signon');
    }

    next();
  }