$(function(){

    var $gridDiv = $('#gridDiv')
    var $makeGrid = $('#makeGrid'), $modelGrid = $('#modelGrid');
    var $yearGrid = $('#yearGrid'), $trimGrid = $('#trimGrid');
    var $loading = $('#loading');
    var $makeButton = $('.makeButton');
    var $modelButton = $('.modelButton');
    var $selectedMake;
    var $selectedModel;
    var $selectedYear;
    var currentPage = '';

    $loading.hide();
    $modelGrid.hide();
    $yearGrid.hide();
    $trimGrid.hide();

    function getModels(event){

        startLoad();

        $selectedMake = $(this).val();
        var modelUrl = 'getmodels/' + $selectedMake + '/';

        $.ajax({
            url: modelUrl,
            success: function(models){

                stopLoad();
                loadModels(models);

            },
            error: function(request, textStatus, errorThrown){
                alert(errorThrown);
            }
        });

    }

    function getYears(event){

        startLoad();

        $selectedModel = $(this).val();
        var yearUrl = 'getyears/' + $selectedMake + '/' + $selectedModel + '/';

        $.ajax({

            url: yearUrl,
            success: function(years){

                stopLoad();
                loadYears(years);

            },
            error: function(request, textStatus, errorThrown){
                alert(errorThrown);
            }

        });

    }

    $makeButton.click(getModels);
    $modelGrid.on('click', '.modelButton', getYears);

    /*======= HELPERS =======*/

    function startLoad(){
        $gridDiv.hide();
        $loading.show();
    }

    function stopLoad(){
        $loading.hide();
        $gridDiv.show();
    }

    function loadModels(models){

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

    }

    window.onpopstate = function(event){

        if(currentPage == 'years'){
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
