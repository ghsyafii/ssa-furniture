// module.exports = {
//     ensureAuthenticated: function(req,res,next){
//         if(req.isAuthenticated()){
//             return next();
//         } else
//         req.flash('error_msg', 'Please log in to view this resource');
//         res.redirect('/users/login');
//     }
// }

function ensureAuthenticated(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    } else
        req.flash('error_msg', 'Only administrators can view that page.');
    res.redirect('/users/login');
}

module.exports = { ensureAuthenticated }

// function authRole(role) {
//     //middleware
//     return (req, res, next) => {
//         if () {}
//
//     }
// }