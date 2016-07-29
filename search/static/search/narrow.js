// This file is used fro button navigation on the app, it
// narrows the choices based on what is clicked.

$(function(){

    var $makeButton = $('.makeButton');
    var $makeGrid = $('#makeGrid');
    var $modelGrid = $('#modelGrid');
    var $yearGrid = $('#yearGrid');
    var $trimGrid = $('#trimGrid');
    var $specGrid = $('#specGrid');
    var $selectedMake;
    var $selectedModel;
    var $selectedYear;
    var $trimId;

    $modelGrid.hide();
    $yearGrid.hide();
    $trimGrid.hide();
    $specGrid.hide();

    function getModels(event){

        helpers.startLoad();

        $selectedMake = $(this).val();
        var modelUrl = 'getmodels/' + $selectedMake + '/';

        $.ajax({
            url: modelUrl,
            success: function(models){

                helpers.stopLoad();
                helpers.loadModels(models);

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
                helpers.loadYears(years);

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
                helpers.loadTrims(trims);

            },
            error: function(request, textStatus, errorThrown){
                alert(errorThrown);
            }
        });
    }

    function getSpecs(){

        helpers.startLoad();

        $trimId = $(this).val();
        var specsUrl = 'getspecs/' + $trimId + '/';

        $.ajax({

            url: specsUrl,
            success: function(content){
                helpers.stopLoad();
                helpers.loadSpecs(content);
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
    $trimGrid.on('click', '.trimButton', getSpecs);

    // When the back button is pressed ...
    window.onpopstate = function(event){

        if(currentPage == 'specs'){

            $specGrid.hide();
            $trimGrid.show();

            currentPage = 'trims';
        }else if(currentPage == 'trims'){

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
