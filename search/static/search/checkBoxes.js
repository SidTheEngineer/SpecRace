/*

Only allow the button to actually trigger the action
if all of the boxes have been filled in, otherwise add
a class called "notSelected" that will put a red box
around the boxes that are empty.

*/

$(function(){

	var $make = $('select#make');
	var $model = $('select#model');
	var $year = $('select#year');
	var $trim = $('select#trim');
	var $go = $('button#go');
	var boxes = [$make, $model, $year, $trim];

	function checkBoxes(event){

		// If this isn't 0, then one of the boxes
		// hasn't been filled in.
		var emptyCount = 0;

		for(var i=0; i<boxes.length; i++){
			if(boxes[i].find('option:selected').val() == 'empty'){
				boxes[i].addClass('notSelected');
				emptyCount+=1;
			}
		}

		// Don't allow a search if all boxes haven't been filled.
		if(emptyCount != 0){
			event.preventDefault();
		}

	}

	$go.on('click', checkBoxes);


});
