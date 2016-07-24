// This file is used fro button navigation on the app, it
// narrows the choices based on what is clicked.

$(function(){

    var $makeGrid = $('#makeGrid')
    var $modelGrid = $('#modelGrid');
    var $yearGrid = $('#yearGrid')
    var $trimGrid = $('#trimGrid');
    var currentPage = '';
    var $makeButton = $('.makeButton');
    var $selectedMake;
    var $selectedModel;
    var $selectedYear;

    //$makeGrid.hide();
    $modelGrid.hide();
    $yearGrid.hide();
    $trimGrid.hide();
    $('#specGrid').hide();

    function getModels(event){

        helpers.startLoad();

        $selectedMake = $(this).val();
        var modelUrl = 'getmodels/' + $selectedMake + '/';

        $.ajax({
            url: modelUrl,
            success: function(models){

                helpers.stopLoad();
                loadModels(models);

            },
            error: function(request, textStatus, errorThrown){
                alert(errorThrown);
            }
        });

    }

    function getYears(event){

        helpers.startLoad();

        $selectedModel = $(this).val();
        var yearUrl = 'getyears/' + $selectedMake + '/' + $selectedModel + '/';

        $.ajax({

            url: yearUrl,
            success: function(years){

                helpers.stopLoad();
                loadYears(years);

            },
            error: function(request, textStatus, errorThrown){
                alert(errorThrown);
            }

        });

    }

    function getTrims(event){

        helpers.startLoad();

        $selectedYear = $(this).val();
        var trimUrl = 'gettrims/' + $selectedMake + '/' + $selectedModel + '/' + $selectedYear + '/';

        $.ajax({

            url: trimUrl,
            success: function(trims){

                helpers.stopLoad();
                loadTrims(trims);

            },
            error: function(request, textStatus, errorThrown){
                alert(errorThrown);
            }
        });
    }

    /*======== EVENTS =======*/
    $makeButton.click(getModels);
    $modelGrid.on('click', '.modelButton', getYears);
    $yearGrid.on('click', '.yearButton', getTrims);

    /*======= HELPERS =======*/

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

    // When the back button is pressed ...
    window.onpopstate = function(event){

        if(currentPage == 'trims'){

            $trimGrid.hide();
            $yearGrid.show();

            currentPage = 'years';
        }else if(currentPage == 'years'){

            $yearGrid.hide();
            $modelGrid.show();

            currentPage = 'models';
        }else{
            $modelGrid.hide();
            $makeGrid.show();

            currentPage = '';
        }

    };


});
