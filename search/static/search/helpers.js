var helpers = (function(){

    var $loading = $('#loading');
    var $gridDiv = $('#gridDiv');

    function startLoad(){
        $gridDiv.hide();
        $loading.show();
    }

    function stopLoad(){
        $loading.hide();
        $gridDiv.show();
    }

    return{
        startLoad: startLoad,
        stopLoad: stopLoad
    }

})();
