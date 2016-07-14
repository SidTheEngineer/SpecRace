$(function(){

    var $gridDiv = $('#gridDiv')
    var $makeGrid = $('#makeGrid');
    var $modelGrid = $('#modelGrid');
    var $makeDiv = $('#makeDiv');
    var $modelDiv = $('.modelDiv');
    var $loading = $('#loading');
    var $makeButton = $('.makeButton');
    var $modelButton = $('.modelButton');
    var $selectedMake;
    var $selectedModel;
    var $selectedYear;

    $loading.hide();
    $modelGrid.hide();

    function getModels(event){

        startLoad();

        $selectedMake = $(this).val();
        var modelUrl = 'getmodels/' + $selectedMake + '/';

        $.ajax({
            url: modelUrl,
            success: function(models){

                stopLoad();
                convertModel(models);

            },
            error: function(request, textStatus, errorThrown){
                alert(errorThrown);
            }
        });

    }

    $makeButton.click(getModels);


    function startLoad(){
        $gridDiv.hide();
        $loading.show();
    }

    function stopLoad(){
        $loading.hide();
        $gridDiv.show();
    }

    function convertModel(models){

        var modelButtons = '';

        for(var i=0; i<models.length; i++){
            modelButtons += '<div id="modelDiv" class="col-xs-6 col-sm-4 col-md-3">'
            + '<button class="modelButton" type="submit" value="' + models[i].niceName + '">' + models[i].name + '</button>'
            + '</div>';
        }

        $modelGrid.html(modelButtons);
        $makeGrid.hide();
        $modelGrid.show();



    }



});
