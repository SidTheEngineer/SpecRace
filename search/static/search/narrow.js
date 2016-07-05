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

            // Remove red borders if Go button put them.
            notSelected($make, $model);

            startLoad($go, $loading);

            // Close the other boxes while loading.
            $model.prop('disabled', true);
            $year.prop('disabled', true);
            $trim.prop('disabled', true);

            $.ajax({
                url: modelUrl,
                success: function(models){

                    stopLoad($go, $loading);

                    for(i=0; i<models.length; i++){
                        modelOptions += '<option value="' + models[i].niceName + '">' + models[i].name + '</option>';
                    }

                    $model.html('<option value="empty"></option>' + modelOptions);
                    $model.animate({
                        opacity: 1
                    }, 350);
                    $model.attr('disabled', false); // Open models.
                    $year.html('<option value="empty"></option>'); // Reset years.
                    $year.attr('disabled', true); // Close years.
                    $trim.html('<option value="empty"></option>'); // Reset trims.
                    $trim.attr('disabled', true); // Close trims.
                },
                error: function(request, textStatus, errorThrown){
                    alert(errorThrown);
                }
            });

        }else{

            // If empty is selected close the other boxes.
			$model.html('<option value="empty"></option>');
			$year.html('<option value="empty"></option>');
            $trim.html('<option value="empty"></option>');
			$model.animate({
				opacity: 0.3
			}, 350);
			$year.animate({
				opacity: 0.3
			}, 350);
            $trim.animate({
				opacity: 0.3
			}, 350);
			$model.attr('disabled', true);
			$year.attr('disabled', true);
            $trim.attr('disabled', true);
		}

    }

    function openYear(){

        $selectedModel = $(this).find('option:selected').val();
        var yearUrl = 'getyears/' + $selectedMake + '/' + $selectedModel + '/';

        if($selectedModel != 'empty'){

            // What will be used to hold the <option> html.
            var yearOptions = '';

            // Remove red borders if go button put them.
            notSelected($model, $year);

            // Load until successful asynch call.
            startLoad($go, $loading);

            // Close other boxes while loading.
            $year.prop('disabled', true);
            $trim.prop('disabled', true);

            $.ajax({
                url: yearUrl,
                success: function(years){

                    stopLoad($go, $loading);

                    for(i=0; i<years.length; i++){
                        yearOptions += '<option value="' + years[i].year + '">' + years[i].year + '</option>';
                    }

                    $year.html('<option value="empty"></option>' + yearOptions);
                    $year.animate({
                        opacity: 1
                    }, 350);
                    $year.attr('disabled', false); // Open years.
                    $trim.html('<option value="empty"></option>'); // Reset trims.
                    $trim.attr('disabled', true); // Close trims.
                },
                error: function(request, textStatus, errorThrown){
                    alert(errorThrown);
                }

            });
        }else{

            // If empty is selected close the other boxes.
            $trim.html('<option value="empty"></option>');
            $trim.animate({
                opacity: 0.3
            }, 350);
            $trim.attr('disabled', true);
            $year.html('<option value="empty"></option>');
            $year.animate({
                opacity: 0.3
            }, 350);
            $year.attr('disabled', true);
        }
    }

    function openTrim(){

        $selectedYear = $(this).find('option:selected').val();
        var trimUrl = 'gettrims/' + $selectedMake + '/' + $selectedModel + '/' + $selectedYear +'/';

        if($selectedYear != 'empty'){

            // What will be used to hold <option> html.
            var trimOptions = '';

            // Remove red borders.
            notSelected($model, $year, $trim);

            // Load until successful asynch call.
            startLoad($go, $loading);

            // Close while loading.
            $trim.prop('disabled', true);

            $.ajax({
                url: trimUrl,
                success: function(trims){

                    stopLoad($go, $loading);

                    for(i=0; i<trims.length; i++){
                        trimOptions += '<option value="' + trims[i].id + '">' + trims[i].name + '</option>';
                    }
                    $trim.html('<option value="empty"></option>' + trimOptions);
                    $trim.animate({
                        opacity: 1
                    }, 350);
                    $trim.attr('disabled', false); // Open trims.
                },
                error: function(request, textStatus, errorThrown){
                    alert(errorThrown);
                }
            });
        }else{

            // If empty is selected close the other box.
            $trim.html('<option value="empty"></option>');
            $trim.animate({
                opacity: 0.3
            }, 350);
            $trim.attr('disabled', true);
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

function startLoad(go, loading){
    go.hide();
    loading.show();
}

function stopLoad(go, loading){
    loading.hide();
    go.show();
}
