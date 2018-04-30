const passport = require("passport");
const passportJWT = require("passport-jwt");
const tests = require("../tests");
const cfg = require("./config");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
};

module.exports = function() {
    const strategy = new Strategy(params, function(payload, done) {
        const user = tests[payload.id] || null;
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};
