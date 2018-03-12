var msg = null;
(function() {
	var speech = {
		lang : 'ru-RU',
		name : 'IVONA 2 Tatyana', //'IVONA 2 Maxim OEM'
		rate : 1.5,
		text : ''
	};

	if ('speechSynthesis' in window === false) {
    	alert('Synthesis not support');
    	return;
	}

	var timer = setInterval(function() {
		var voices = speechSynthesis.getVoices();
		if (voices.length === 0) return;
		console.log('speechSynthesis init');
		clearInterval(timer);

		var voices = voices.filter(function (el) { return (el.localService==true) && (el.lang==speech.lang); });
		var voice = voices.find(function (el) { return el.name.includes(speech.name); });
		if (!voice && voices.length > 0) {
			voice = voices[0];
		}
		if (!voice) {
		    alert('Not found any voice');
		    return;
		}

		msg = new SpeechSynthesisUtterance();
		msg.voice = voice;
		msg.lang = speech.lang;
		msg.rate = speech.rate;

	}, 200);

	var target = document.getElementById('content');
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(el) {
			var target = el.target;
			if (typeof(target.className) !== 'string' || !target.className.includes('captions-text')) return;
			if (target.parentNode.attributes['lang'].value !== 'ru') return;
			if (speech.text === target.innerText) return;

			speech.text = target.innerText;
			console.log(speech.text);

			if (msg != null) {
				msg.text = speech.text;
	        	speechSynthesis.speak(msg);
			}		
			
		});
	});
	observer.observe(target, {
		childList: true,
		attributes: true,
		characterData: true,
		subtree: true
	});
})();
msg.rate = 1.8;