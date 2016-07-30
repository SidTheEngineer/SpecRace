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

    var specDivs = {
        '$engineText': $('#engine').find('.spec'),
        '$horsepowerText': $('#horsepower').find('.spec'),
        '$torqueText': $('#torque').find('.spec'),
        '$transmissionText': $('#transmission').find('.spec'),
        '$weightText': $('#weight').find('.spec'),
        '$drivetrainText': $('#drivetrain').find('.spec'),
        '$fuelEcoText': $('#fuelEco').find('.spec'),
        '$msrpText': $('#msrp').find('.spec')
    };

    /*===== LOADING ====*/
    function startLoad(){
        $gridDiv.hide().fadeOut(100);
        $loading.hide().fadeIn(100);
    }

    function stopLoad(){
        $loading.hide().fadeOut(100);
        $gridDiv.hide().fadeIn(100);
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
        $modelGrid.hide().fadeIn(100);

    }

    function loadYears(years){

        // Push history onto stack.
        history.pushState(years, null, '/');
        currentPage = "years";

        var yearButtons = '';

        // Order New -> Old from top to bottom.
        for(var i=years.length-1; i>=0; i--){
            yearButtons += '<div class="col-xs-4 col-sm-3 col-md-2" class="yearDiv" >'
            + '<button class="yearButton" type="submit" value="' + years[i].year + '">' + years[i].year + '</button>'
            + '</div>';
        }

        $yearGrid.html(yearButtons);
        $modelGrid.hide();
        $yearGrid.hide().fadeIn(100);

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
        $trimGrid.hide().fadeIn(100);

    }

    function loadSpecs(content){

        history.pushState(content, null, '/');
        currentPage = 'specs';

        var notAvailable = 'Not Available';
        var carName = [
            content.specs.year.year,
            content.specs.make.name,
            content.specs.model.name,
            content.specs.trim
        ]

        // Ternaries for vehicles too new/that Edmunds doesn't have data on.
        var engineSize = content.specs.engine.size;
        var engineConfig = content.specs.engine.configuration;
        var engineCyl = content.specs.engine.cylinder;
        var compressorType = content.specs.engine.compressorType ? content.specs.engine.compressorType : '';
        var hp = content.specs.engine.horsepower ? content.specs.engine.horsepower : '';
        var tq = content.specs.engine.torque ? content.specs.engine.torque : '';
        var hpRPM = content.specs.engine.rpm ? content.specs.engine.rpm.horsepower : '';
        var tqRPM = content.specs.engine.rpm ? content.specs.engine.rpm.torque : '';
        var transmissionSpeeds = content.specs.transmission.numberOfSpeeds;
        var transmissionType = content.specs.transmission.transmissionType;
        var cityMPG = content.specs.MPG ? content.specs.MPG.city : '';
        var highwayMPG = content.specs.MPG ? content.specs.MPG.highway : '';
        var weight = '';
        var drivetrain = content.specs.drivenWheels ? content.specs.drivenWheels : '';
        var msrp = content.specs.price ? content.specs.price.baseMSRP : '';

        // Default values.
        for(spec in specDivs){
            specDivs[spec].text(notAvailable);
        }

        // If the equipment is available for the car.;
        if(content.equipment){
            for(var i=0; i<content.equipment.length; i++){
                if(content.equipment[i].name == 'Curb Weight'){
                    weight = content.equipment[i].value;
                }
            }
        }

        // Display name of the car at top.
        $('#carName').text(carName.join(' '));

        if(engineCyl){
            specDivs.$engineText.text(
                engineSize + ' L '
                + engineConfig + ' '
                + engineCyl + ' '
                + '(' + compressorType + ')'
            );
        }

        if(hp){
            specDivs.$horsepowerText.text(
                hp + ' hp ' + ' @ '
                + hpRPM + 'rpm'
            );
        }

        if(tq){
            specDivs.$torqueText.text(
                tq + ' lb-ft ' + ' @ '
                + tqRPM + 'rpm'
            );
        }

        if(transmissionSpeeds){
            specDivs.$transmissionText.text(
                transmissionSpeeds + '-speed '
                + transmissionType.toLowerCase().replace('_', ' ')
            );
        }

        if(weight){
            specDivs.$weightText.text(weight + ' lbs');
        }

        if(drivetrain){
            specDivs.$drivetrainText.text(drivetrain);
        }

        if(cityMPG){
            specDivs.$fuelEcoText.text(
                cityMPG + ' City '
                + highwayMPG + ' Highway'
            );
        }

        if(msrp){
            // Money format.
            specDivs.$msrpText.text(
                '$'
                + msrp.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace('.00', '')
            );
        }

        $trimGrid.hide();
        $specGrid.hide().fadeIn(100);

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
