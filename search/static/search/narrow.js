$(function(){

    var $make = $('select#make');
    var $model = $('select#model');
    var $year = $('select#year');
    var $trim = $('select#trim');
    var $go = $('button#go');
    var $loading = $('h1#loading');
    var $selectedMake;
    var $selectedModel;
    var $selectedYear;

    $loading.hide();

    function openModel(){

        $selectedMake = $(this).find('option:selected').val();
        var modelUrl = 'getmodels/' + $selectedMake + '/';

        // Make asynch call if a make is selected.
        if($selectedMake != 'empty'){

            var modelOptions = '';

            notSelected($make, $model); // Remove red borders.
            startLoad($go, $loading);
            tempClose($model, $year, $trim); // Close while loading.

            $.ajax({
                url: modelUrl,
                success: function(models){

                    stopLoad($go, $loading);

                    for(i=0; i<models.length; i++){
                        modelOptions += '<option value="' + models[i].niceName + '">' + models[i].name + '</option>';
                    }

                    fillAndOpen(modelOptions, $model);
                    resetAndClose($year, $trim);
                },
                error: function(request, textStatus, errorThrown){
                    alert(errorThrown);
                }
            });

        }else{

            resetAndClose($model, $year, $trim);
		}

    }

    function openYear(){

        $selectedModel = $(this).find('option:selected').val();
        var yearUrl = 'getyears/' + $selectedMake + '/' + $selectedModel + '/';

        if($selectedModel != 'empty'){

            // What will be used to hold the <option> html.
            var yearOptions = '';

            notSelected($model, $year);
            startLoad($go, $loading);
            tempClose($year, $trim);

            $.ajax({
                url: yearUrl,
                success: function(years){

                    stopLoad($go, $loading);

                    for(i=0; i<years.length; i++){
                        yearOptions += '<option value="' + years[i].year + '">' + years[i].year + '</option>';
                    }

                    fillAndOpen(yearOptions, $year);
                    resetAndClose($trim);
                },
                error: function(request, textStatus, errorThrown){
                    alert(errorThrown);
                }

            });
        }else{

            resetAndClose($trim, $year);
        }
    }

    function openTrim(){

        $selectedYear = $(this).find('option:selected').val();
        var trimUrl = 'gettrims/' + $selectedMake + '/' + $selectedModel + '/' + $selectedYear +'/';

        if($selectedYear != 'empty'){

            // What will be used to hold <option> html.
            var trimOptions = '';

            notSelected($model, $year, $trim);
            startLoad($go, $loading);
            tempClose($trim);

            $.ajax({
                url: trimUrl,
                success: function(trims){

                    stopLoad($go, $loading);

                    for(i=0; i<trims.length; i++){
                        trimOptions += '<option value="' + trims[i].id + '">' + trims[i].name + '</option>';
                    }

                    fillAndOpen(trimOptions, $trim);
                },
                error: function(request, textStatus, errorThrown){
                    alert(errorThrown);
                }
            });
        }else{

            // If empty is selected close the other box.
            resetAndClose($trim);
        }
    }

    $make.change(openModel);
    $model.change(openYear);
    $year.change(openTrim);

});

var notSelected = function(){
    for(var i=0; i<arguments.length; i++){
        arguments[i].removeClass('notSelected');
    }
}

var tempClose = function(){
    for(var i=0; i<arguments.length; i++){
        arguments[i].prop('disabled', true);
    }
}

var resetAndClose = function(){
    for(var i=0; i<arguments.length; i++){
        arguments[i].html('<option value="empty"></option>');
        arguments[i].animate({
            opacity: 0.3
        }, 350);
        arguments[i].attr('disabled', true);
    }
}

function fillAndOpen(options, element){
    element.html('<option value="empty"></option>' + options);
    element.animate({
        opacity: 1
    }, 350);
    element.attr('disabled', false);
}

function startLoad(go, loading){
    go.hide();
    loading.show();
}

function stopLoad(go, loading){
    loading.hide();
    go.show();
}
