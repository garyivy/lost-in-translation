module.exports = (request, response, next) => {
    // Note: Typically, api calls are authenticated using request header.
    var isAuthorized = request && request.session && request.session.isAuthorized;

    if (!isAuthorized) {
        return response.status(401).json({ message: 'Signon required.'})
    }

    next(); // Middleware should default to calling next() otherwise request will hang and memory will not be cleaned up!
  }