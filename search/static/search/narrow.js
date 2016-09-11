// This file is used fro button navigation on the app, it
// narrows the choices based on what is clicked.

$(function(){

    var $makeButton = $('.makeButton'),
        $makeGrid = $('#makeGrid'),
        $modelGrid = $('#modelGrid'),
        $yearGrid = $('#yearGrid'),
        $trimGrid = $('#trimGrid'),
        $specGrid = $('#specGrid'),
        $selectedMake,
        $selectedModel,
        $selectedYear,
        $trimId;

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
    $('button').bind({
        touchstart: function() {
            $(this).addClass("mobileActive");
        },
        touchend: function() {
            $(this).removeClass('mobileActive');
        }
    });
    
    $makeButton.click(getModels);
    $modelGrid.on('click', '.modelButton', getYears);
    $yearGrid.on('click', '.yearButton', getTrims);
    $trimGrid.on('click', '.trimButton', getSpecs);

    window.onpopstate = function(event){
        switch(currentPage) {
            case 'specs':
                $specGrid.hide();
                $trimGrid.show();
                currentPage = 'trims';
                break;

            case 'trims':
                $trimGrid.hide();
                $yearGrid.show();
                currentPage = 'years';
                break;

            case 'years':
                $yearGrid.hide();
                $modelGrid.show();
                currentPage = 'models';
                break;

            default:
                $modelGrid.hide();
                $makeGrid.show();
                currentPage = '';
        }

    };


});
