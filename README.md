# Slammy - an extremely lightweight and easy hashbang handler
**Slammy is lightweight and completely dependency free, written in standard JavaScript.**

## About
When you're writing small JavaScript applications and you're doing a lot of Ajax request -- you don't really need to reload the whole application, do you? Instead you can use hashbang routes to handle view changes, and this small library will enable this in an easy manner.

## Browser compatability
The library is tested in:

* Firefox 11, 12
* Chrome 17, 18
* IE 7, IE 8, IE 9
* Safari 5
* Opera 11

## Usage example
**javascripts/application.js**

    (function (window, document, Slammy, undef) {
        
        window.onload = function () {

            var view = document.getElementById('view');

            Slammy
                .addRoute('/default', function () {

                    view.innerHTML = "You're in the default route!";

                })

                .addRoute('/alternative-route', function () {

                    view.innerHTML = "You're in the alternative route!";

                })

                .addRoute('/parameterized/:param', function (params) {

                    view.innerHTML = "Parameter passed: " + (params.param ? params.param : 'No parameter passed...');

                })

                .noSuchRoute(function (route) {

                    view.innerHTML = "The route you specified was not found.";

                })
                .run('/default');

        };

    })(window, document, Slammy);

**index.html**

    <!DOCTYPE html>
    <html>
        <body>

            <div id="view">

            </div>

            <script src="javascripts/slammy-1.0-min.js"></script>
            <script src="javascripts/application.js"></script>

        </body>
    </html>


Happy coding!
