'use strict';

console.log('\'Allo \'Allo! Content script!!!');

function FacebookProcessorClass() {
	var _self = {
		init: function init() {
			_self.processItems();
			// create an observer instance
			var observer = new MutationObserver(function (mutations) {
				mutations.forEach(function (mutation) {
					if (mutation.type === 'childList') {
						_self.processItems($('._5pcb').get(0));
					}
				});
			});
			// configuration of the observer:
			var config = { attributes: false, childList: true, characterData: false };

			// pass in the target node, as well as the observer options
			var node = $('._5pcb').get(0);
			if (node) {
				observer.observe(node, config);
			}
		},

		pickUpContent: function pickUpContent(el) {
			return {
				header: {
					whom: $('a._5pb8', el).attr('href'),
					img: $('.uiScaledImageContainer > img', el).attr('src'),
					name: $('._5pbw  a').text(),
					when: $('._5pcp  ._5pcq').attr('href'),
					how: $('._5pcp > ._5pcq > ._20y0').attr('href')
				},
				userContent: $('.userContent', el).text()
			};
		},

		getSemanticKernel: function getSemanticKernel(string) {
			var words = string.split(/[\,\.\(\)\{\}\[\]\…\“\«\»\s]/);
			var counts = {};
			_.each(words, function (word) {
				word = word.toLowerCase();
				console.log(typeof word);
				if (counts[word]) {
					counts[word]++;
				} else {
					counts[word] = 1;
				}
			});
			console.log(counts);
			// TODO replace with correct thing
			// perform looking for string inclusion, removing longer string that already include shorter ones
			// and adding longer string count to shorter onces
			// _.sortBy(counts, function (it) {
			// 	return it.length;
			// });

			// console.log(counts);
			// _.each(counts, function (idx, word) {
			// 	_.each(counts, function (idx, it) {
			// 	    //console.log(typeof(it));
			// 	    console.log(word, it, counts[word], counts[it]);

			// 	    if(it.indexOf(word) === 0){
			// 		console.log(word, it, counts[word], counts[it]);
			// 		counts[word] += counts[it];
			// 		delete counts[it];
			// 	    };
			// 	});
			// });

			//console.log(counts);

			counts = _.sortBy(counts, function (it) {
				return counts[it];
			});
			return counts;
		},

		processItems: function processItems(parent) {
			console.log('processingItems');
			var elements = $('._4ikz, ._5pat', parent || document);

			for (var idx = 0; idx < elements.length; idx++) {
				var it = elements[idx];

				if (it) {
					it.style.border = 'red dashed 2px';
					var content = _self.pickUpContent(it);
					console.log(content);

					if (content.userContent.length > 200) {
						var kernel = _self.getSemanticKernel(content.userContent);
						console.log(console, kernel);
					}
				}
			}
		}
	};
	return _self;
}

$(document).ready(function (e) {
	console.log('Initing');
	new FacebookProcessorClass().init();
});
//# sourceMappingURL=contentscript.js.map
