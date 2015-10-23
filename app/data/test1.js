// with jQuery
var $grid = $('.grid').isotope({
	itemSelector: '.grid-item',
	getSortData: {
		name: '.name',
		category: '[data-category]'
	},
	// layout mode options
	masonry: {
		columnWidth: 200
	}
	});
