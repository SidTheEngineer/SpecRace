// This file is responsible for displaying the specifications for the
// selected trim.

$(function(){

    var $trimGrid = $('#trimGrid');

    function getSpecs(){

        helpers.startLoad();

    }

    $trimGrid.on('click', '.trimButton', getSpecs);

});
