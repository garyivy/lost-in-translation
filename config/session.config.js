module.exports = { 
    secret: 'therearenosecrets', 
    resave: false,            // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    cookie:  { 
      path: '/', 
      httpOnly: true, // Default is true.  Modern browser will block attempts to read from client-side script.
      secure: false,  // Note: In production this will be true (and running over HTTPS).
      maxAge: 1200000 // Twenty minutes in milliseconds.
    }
};