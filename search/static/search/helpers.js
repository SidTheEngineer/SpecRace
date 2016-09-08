// Global keeps track of current page for onpopstate.
var currentPage = '';

var helpers = (function(){

    // Page elements to be altered in helpers.
    var $loading = $('#loading'),
        $gridDiv = $('#gridDiv'),
        $makeGrid = $('#makeGrid'),
        $modelGrid = $('#modelGrid'),
        $yearGrid = $('#yearGrid'),
        $trimGrid = $('#trimGrid'),
        $specGrid = $('#specGrid');
        
    // Default text for specs.
    var notAvailable = ' ';

    var specText = {
        $engineText: $('#engine').find('.spec'),
        $horsepowerText: $('#horsepower').find('.spec'),
        $torqueText: $('#torque').find('.spec'),
        $zeroToSixtyText: $('#zeroToSixty').find('.spec'),
        $transmissionText: $('#transmission').find('.spec'),
        $weightText: $('#weight').find('.spec'),
        $drivetrainText: $('#drivetrain').find('.spec'),
        $fuelEcoText: $('#fuelEco').find('.spec'),
        $msrpText: $('#msrp').find('.spec')
    }

    // Init all text to default value.
    for(var i=0; i<specText.length; i++) {
        specText[i].text(notAvailable)
    }
        
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

        var carName = [
            content.specs.year.year,
            content.specs.make.name,
            content.specs.model.name,
            content.specs.trim
        ]

        $('#carName').text(carName.join(' '));

        // Ternaries for vehicles too new/that Edmunds doesn't have data on.
        var engineSize = content.specs.engine.size,
            engineConfig = content.specs.engine.configuration,
            engineCyl = content.specs.engine.cylinder,
            compressorType = content.specs.engine.compressorType ? content.specs.engine.compressorType : '',
            hp = content.specs.engine.horsepower ? content.specs.engine.horsepower : '',
            tq = content.specs.engine.torque ? content.specs.engine.torque : '',
            hpRPM = content.specs.engine.rpm ? content.specs.engine.rpm.horsepower : '',
            tqRPM = content.specs.engine.rpm ? content.specs.engine.rpm.torque : '',
            transmissionSpeeds = content.specs.transmission.numberOfSpeeds,
            transmissionType = content.specs.transmission.transmissionType,
            cityMPG = content.specs.MPG ? content.specs.MPG.city : '',
            highwayMPG = content.specs.MPG ? content.specs.MPG.highway : '',
            weight = '',
            zeroToSixty = '',
            drivetrain = content.specs.drivenWheels ? content.specs.drivenWheels : '',
            msrp = content.specs.price ? content.specs.price.baseMSRP : '';


        // If the equipment is available for the car.;
        if(content.equipment){
            for(var i=0; i<content.equipment.length; i++){
                if(content.equipment[i].name == 'Curb Weight'){
                    weight = content.equipment[i].value;
                }
                if(content.equipment[i].name == 'Manufacturer 0 60mph Acceleration Time (seconds)'){
                    zeroToSixty = content.equipment[i].value;
                }
            }
        }

        /*====== CHECK/DISPLAY SPECS ======*/

        if(engineCyl){
            specText.$engineText.text(
                engineSize + ' L '
                + engineConfig + ' '
                + engineCyl + ' '
                + '(' + compressorType + ')'
            );
        }

        if(hp){
            specText.$horsepowerText.text(
                hp + ' hp ' + ' @ '
                + hpRPM + 'rpm'
            );
        }

        if(tq){
            specText.$torqueText.text(
                tq + ' lb-ft ' + ' @ '
                + tqRPM + 'rpm'
            );
        }

        if(zeroToSixty){
            specText.$zeroToSixtyText.text(zeroToSixty + ' Seconds');
        }

        if(transmissionSpeeds){
            specText.$transmissionText.text(
                transmissionSpeeds + '-speed '
                + transmissionType.toLowerCase().replace('_', ' ')
            );
        }

        if(weight){
            specText.$weightText.text(weight + ' lbs');
        }

        if(drivetrain){
            specText.$drivetrainText.text(drivetrain);
        }

        if(cityMPG){
            specText.$fuelEcoText.text(
                cityMPG + ' City '
                + highwayMPG + ' Highway'
            );
        }

        if(msrp){
            // Money format.
            specText.$msrpText.text(
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
