/**
* Slammy 0.1
*
* An extremely lightweight and easy hashbang
* route handler in standard JavaScript - completly
* without dependencies.
*
* @author Björn Wikström <bjorn@welcom.se>
* @license LGPL v3 <http://www.gnu.org/licenses/lgpl.html>
* @version 0.1
* @copyright Welcom Web i Göteborg AB 2012
*/
;(function (window, document, undef) {

    /**
    * If Slammy is already loaded, don't load it again
    */
    if (typeof window.Slammy !== typeof undef) {
        return;
    }

    var Slammy = function () {
        
        /**
         * Private variables
         */
        var _routes      = [],
            _lastHash    = false,
            _noSuchRoute = function () {};
        
        /**
         * Match a route specified via `addRoute()` or `addRoutes()`
         * to the current hashbang. If no such route was defined,
         * call `noSuchRoute()`.
         *
         * @param route {String} The current hashbang route
         * @returns {Void}
         */
        var _findRouteAndRun = function (route) {
            var found = false;
            for (var i = 0; i < _routes.length; i++) {
                
                if (_routes[i].route === route) {
                    found = true;
                    _routes[i].callback.call(window.Slammy, {});
                    break;
                } else {
                    var variables = _routes[i].route.substr(1).match(/\:([a-z0-9]+)/ig),
                        clean     = _routes[i].route.replace(/\/\:([a-z0-9]+)/ig, '');
                    
                    if (route.indexOf(clean) === 0) {
                        var params = route.substr(route.indexOf(clean) + clean.length + 1).split('/'),
                            out    = {};
                        
                        for (var j = 0; j < variables.length; j++) {
                            
                            if (params[j]) {
                                out[variables[j].substr(1)] = params[j];
                            }
                            
                        }
                        
                        found = true;
                        _routes[i].callback.call(window.Slammy, out);
                        break;
                    }
                    
                }
                
            }

            if (!found) {
                window.Slammy.noSuchRoute();
            }
        };
        
        /**
         * A lightweight function to check the current hashbang,
         * see if changed from last check.
         *
         * @returns {Void}
         */
        var _checkHash = function () {
            var hash = window.location.hash.substr(1);
            if (hash !== _lastHash) {
                _findRouteAndRun(hash);
            }
            
            _lastHash = hash;
        };
        /**
         * Set up a time interval to check the
         * hashbang with `_checkHash()`.
         */
        setInterval(function () {
            _checkHash();
        }, 50);
        
        return {
            
            /**
             * Adds a route to be handled by Slammy,
             * and a callback function to be called
             * when the route is visited.
             *
             * @param name {String} A hashbang route
             * @param callback {Function} Callback for the route
             * @returns {Object} The Slammy object
             */
            addRoute: function (name, callback) {
                
                _routes.push({
                    'route': name,
                    'callback': callback
                });

                return this;
                
            },
            
            /**
             * Add a bunch of routes in an array
             *
             * @param routes {Array} A list of routes
             * @returns {Object} The Slammy object
             */
            addRoutes: function (routes) {
                
                if (typeof routes !== 'object') {
                    return false;
                }
                
                for (var p in routes) {
                    if (routes.hasOwnProperty(p) && typeof routes[p] === 'function') {
                        this.addRoute(p, routes[p]);
                    }
                }

                return this;
                
            },

            /**
             * Add a callback function for when a hashbang
             * route wasn't found.
             *
             * @param fn {Function} The not-found-callback
             * @returns {Object} The Slammy object
             */
            noSuchRoute: function (fn) {

                if (typeof fn === 'function') {
                    _noSuchRoute = fn;
                } else {
                    _noSuchRoute.call(this, window.location.hash);
                }

                return this;

            },
            
            /**
             * Run a route
             *
             * @param route {String} A specified route
             * @returns {Void}
             */
            run: function (route) {
                
                var hash = _lastHash = window.location.hash.substr(1);
                if (hash && hash !== '') {
                    _findRouteAndRun(hash);
                } else {
                    window.location.hash = '#' + route;
                }
                
            }
            
        };
        
    }();
    
    /**
     * Add Slammy to the global namespace
     */
    window.Slammy = Slammy;

})(window, document);