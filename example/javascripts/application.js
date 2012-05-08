;(function (window, document, Slammy, undef) {

    Slammy.addRoutes({
        
        '/default': function () {
            document.getElementById('current-active-view')
                .innerHTML = '#/default';
        },
        
        '/first': function () {
            document.getElementById('current-active-view')
                .innerHTML = '#/first';
        },
        
        '/second/:param1/:param2': function (params) {
            document.getElementById('current-active-view')
                .innerHTML = '#/second (param1: ' + params.param1 + ', param2: ' + params.param2 + ')';
        }
        
    });
    Slammy.noSuchRoute(function (route) {
        document.getElementById('current-active-view')
            .innerHTML = '(No route found)';
    });
    
    Slammy.run('/default');

})(window, document, Slammy);