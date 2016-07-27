// Global keeps track of current page for onpopstate.
var currentPage = '';

var helpers = (function(){

    // Page elements to be altered in helpers.
    var $loading = $('#loading');
    var $gridDiv = $('#gridDiv');
    var $makeGrid = $('#makeGrid')
    var $modelGrid = $('#modelGrid');
    var $yearGrid = $('#yearGrid')
    var $trimGrid = $('#trimGrid');
    var $specGrid = $('#specGrid');

    var specs = {
        'engine': $('#engine'),
        'horsepower': $('#horsepower')
    };

    /*===== LOADING ====*/
    function startLoad(){
        $gridDiv.hide();
        $loading.show();
    }

    function stopLoad(){
        $loading.hide();
        $gridDiv.show();
    }

    /*====== AJAX DATA RETRIEVAL/DISPLAY =====*/
    function loadModels(models){

        // Push history onto stack.
        history.pushState(models, null, '/');
        currentPage = "models";

        var modelButtons = '';

        for(var i=0; i<models.length; i++){
            modelButtons += '<div class="col-xs-6 col-sm-4 col-md-3" class="modelDiv" >'
            + '<button class="modelButton" type="submit" value="' + models[i].niceName + '">' + models[i].name + '</button>'
            + '</div>';
        }

        $modelGrid.html(modelButtons);
        $makeGrid.hide();
        $modelGrid.show();

    }

    function loadYears(years){

        // Push history onto stack.
        history.pushState(years, null, '/');
        currentPage = "years";

        var yearButtons = '';

        for(var i=0; i<years.length; i++){
            yearButtons += '<div class="col-xs-4 col-sm-3 col-md-2" class="yearDiv" >'
            + '<button class="yearButton" type="submit" value="' + years[i].year + '">' + years[i].year + '</button>'
            + '</div>';
        }

        $yearGrid.html(yearButtons);
        $modelGrid.hide();
        $yearGrid.show();

    }

    function loadTrims(trims){

        // Push history onto stack.
        history.pushState(trims, null, '/');
        currentPage = 'trims';

        var trimButtons = '';

        for(var i=0; i<trims.length; i++){
            trimButtons += '<div class="col-xs-12 col-md-6" class="trimDiv" >'
            + '<button class="trimButton" type="submit" value="' + trims[i].id + '">' + trims[i].name + '</button>'
            + '</div>';
        }

        $trimGrid.html(trimButtons);
        $yearGrid.hide();
        $trimGrid.show();

    }

    function loadSpecs(content){

        history.pushState(content, null, '/');
        currentPage = 'specs';

        var weight = 'Not Available'; // Changed if exists.

        for(var i=0; i<content.equipment.length; i++){
            if(content.equipment[i].name == 'Curb Weight'){
                weight = content.equipment[i].value;
            }
        }


        specs.engine.find('.spec').text(content.specs.engine.size + 'L');
        $trimGrid.hide();
        $specGrid.show();


        /*console.log(content.specs.engine.size);
        console.log(content.specs.engine.horsepower);
        console.log(content.specs.engine.torque);
        console.log(weight);
        console.log(content.specs.drivenWheels);
        console.log(content.specs.MPG.city);
        console.log(content.specs.MPG.highway);
        console.log(content.specs.price.baseMSRP);*/


    }

    // Allow helper functions to be accessed elsewhere.
    return{
        startLoad: startLoad,
        stopLoad: stopLoad,
        loadModels: loadModels,
        loadYears: loadYears,
        loadTrims: loadTrims,
        loadSpecs: loadSpecs
    }

})();
