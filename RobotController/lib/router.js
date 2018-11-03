/**
 * Custom router for executing http request to server 
 * Registers methods to be executed for different request paths
 * 
 */

let router = {
    routes: {
        get: {},
        post: {},
        put: {},
        delete: {}
    },
    get: registerGet,
    post: registerPost

}

/**
 * Add GET method to router
 * 
 * @param {String} route request path string
 * @param {Function} func method to be executed for  this request
 */
function registerGet(route, func) {
    register.call(this, route, func, 'get');
}

/**
 * Add POST method to router
 * 
 * @param {String} route request path string
 * @param {Function} func method to be executed for  this request
 */
function registerPost(route, func) {
    register.call(this, route, func, 'post');
}

function register(route, func, method) {
    if (typeof func === 'function') {
        try {
            this.routes[method][route] = func;
        } catch (error) {
            throw error;
        }
        
    } else {
        throw new Error('Error: param [func] is not a Function.');
    }
}
module.exports = router;