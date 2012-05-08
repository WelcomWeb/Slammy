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
(function(c,e,j){typeof c.Slammy===typeof j&&(e=function(){var f=[],h=!1,e=function(){},i=function(a){for(var b=!1,g=0;g<f.length;g++)if(f[g].route===a){b=!0;f[g].callback.call(c.Slammy,{});break}else{var e=f[g].route.substr(1).match(/\:([a-z0-9]+)/ig),d=f[g].route.replace(/\/\:([a-z0-9]+)/ig,"");if(0===a.indexOf(d)){b=a.substr(a.indexOf(d)+d.length+1).split("/");a={};for(d=0;d<e.length;d++)b[d]&&(a[e[d].substr(1)]=b[d]);b=!0;f[g].callback.call(c.Slammy,a);break}}b||c.Slammy.noSuchRoute()};setInterval(function(){var a=
c.location.hash.substr(1);a!==h&&i(a);h=a},50);return{addRoute:function(a,b){f.push({route:a,callback:b});return this},addRoutes:function(a){if("object"!==typeof a)return!1;for(var b in a)a.hasOwnProperty(b)&&"function"===typeof a[b]&&this.addRoute(b,a[b]);return this},noSuchRoute:function(a){"function"===typeof a?e=a:e.call(this,c.location.hash);return this},run:function(a){var b=h=c.location.hash.substr(1);b&&""!==b?i(b):c.location.hash="#"+a}}}(),c.Slammy=e)})(window,document);