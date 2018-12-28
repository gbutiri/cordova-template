$(document).ready(function() {
	$(function () {
  		$('[data-toggle="tooltip"]').tooltip({
		  	'html': true,
		});
	});

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	// CANVAS // 
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.strokeStyle = "#222222";
	var line_thickness = 30;
	ctx.lineWidth = line_thickness;
	ctx.lineCap  = "round";
	ctx.lineJoin  = "round";
	ctx.fillStyle = "transparent";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	var _current_letter = 0;
	
	var a_vocab_hiragana = [
					['A' , 'a'],   // あ
					['B' , 'i'],   // い
					['C' , 'u'],   // う
					['D' , 'e'],   // え
					['E' , 'o'],   // お
					['F' , 'ka'],  // か
					['G' , 'ki'],  // き
					['H' , 'ku'],  // 〈
					['I' , 'ke'],  // け
					['J' , 'ko'],  // こ
					['K' , 'sa'],  // さ
					['L' , 'shi'], // し
					['M' , 'su'],  // す
					['N' , 'se'],  // せ
					['O' , 'so'],  // そ
					['P' , 'ta'],  // た
					['Q' , 'chi'], // ち
					['R' , 'tsu'], // つ
					['S' , 'te'],  // て
					['T' , 'to'],  // と
					['U' , 'na'],  // な
					['V' , 'ni'],  // に
					['W' , 'nu'],  // ぬ
					['X' , 'ne'],  // ね
					['Y' , 'no'],  // の
					['Z' , 'ha'],  // は
					['a' , 'hi'],  // ひ
					['b' , 'fu'],  // ふ
					['c' , 'he'],  // へ
					['d' , 'ho'],  // ほ
					['e' , 'ma'],  // ま
					['f' , 'mi'],  // み
					['g' , 'mu'],  // む
					['h' , 'me'],  // め
					['i' , 'mo'],  // も
					['j' , 'ya'],  // や
					['k' , 'yu'],  // ゆ
					['l' , 'yo'],  // よ
					['m' , 'ra'],  // ら
					['n' , 'ri'],  // り
					['o' , 'ru'],  // る
					['p' , 're'],  // れ
					['q' , 'ro'], // ろ
					['r' , 'wa'],  // わ
					['s' , 'wo'],  // を
					['t' , 'n']   // ん
				];
	var a_vocab_katakana = [
					['A' , 'a'],   // あ
					['B' , 'i'],   // い
					['C' , 'u'],   // う
					['D' , 'e'],   // え
					['E' , 'o'],   // お
					['F' , 'ka'],  // か
					['G' , 'ki'],  // き
					['H' , 'ku'],  // 〈
					['I' , 'ke'],  // け
					['J' , 'ko'],  // こ
					['K' , 'sa'],  // さ
					['L' , 'shi'], // し
					['M' , 'su'],  // す
					['N' , 'se'],  // せ
					['O' , 'so'],  // そ
					['P' , 'ta'],  // た
					['Q' , 'chi'], // ち
					['R' , 'tsu'], // つ
					['S' , 'te'],  // て
					['T' , 'to'],  // と
					['Z' , 'na'],  // な
					['a' , 'ni'],  // に
					['b' , 'nu'],  // ぬ
					['c' , 'ne'],  // ね
					['d' , 'no'],  // の
					['e' , 'ha'],  // は
					['f' , 'hi'],  // ひ
					['g' , 'fu'],  // ふ
					['h' , 'he'],  // へ
					['i' , 'ho'],  // ほ
					['U' , 'ma'],  // ま
					['V' , 'mi'],  // み
					['W' , 'mu'],  // む
					['X' , 'me'],  // め
					['Y' , 'mo'],  // も
					['j' , 'ya'],  // や
					['k' , 'yu'],  // ゆ
					['l' , 'yo'],  // よ
					['m' , 'ra'],  // ら
					['n' , 'ri'],  // り
					['o' , 'ru'],  // る
					['p' , 're'],  // れ
					['q' , 'ro'], // ろ
					['r' , 'wa'],  // わ
					['s' , 'wo'],  // を
					['t' , 'n']   // ん
				];
	
	var _lang, _type, _rand, a_letters = []	;
	// initializing
	function init() {
		$('#splashscreen').show();
		
		/*
		for (_i in a_vocab_katakana) {
			$('#samples').append('<span> &nbsp;' + a_vocab_katakana[_i][0] + '</span>');
		}
		*/
		
	}
	
	// START THE GAME!
	init();
	
	// User Actions -->
	$(document).on('click', '#start-button', function(e) {

		e.preventDefault();
		$('#pick-language').show();
		$('#splashscreen').fadeOut();

	}).on('click', '.btn-lesson', function(e) {

		e.preventDefault();
		var $this = $(this);
		_lang = $this.attr('data-lang');
		
		$('#recognized, #draw_this').css({
			'font-family' : 'pj_' + _lang + 'normal',
		});

		// hide the puck-language and show pick-lesson
		$('.open-lesson').attr('data-lang', _lang)
		$('#pick-lesson').css({left: '100%', top: 0}).show().animate({left: '0%'}, 200, function() {
			$('#pick-language').hide();
		});

	}).on('click', '.back-button', function(e) {

		e.preventDefault();
		var $this = $(this);
		var _target = $this.attr('data-target');
		var _source = $this.attr('data-source');
		
		$('#' + _source).css({zIndex: 100, left: '0%'});
		$('#' + _target).css({zIndex: 1}).show();

		$('#' + _source).animate({left: '100%'}, 200, function() {
			$('#' + _source).hide();
		});

	}).on('click', '.open-lesson', function(e) {

		e.preventDefault();
		var $this = $(this);
		_lang = $this.attr('data-lang');
		_type = $this.attr('data-type');

		$this.css({zIndex: 99});
		// open up the lesson plan from below.
		$('#' + _type).css({zIndex: 100, top: '100%'}).show().animate({top: '0%'}, 200, function() {
			$('#pick-lesson').hide();
		});

	}).on('click', '.close-lesson', function(e) {

		e.preventDefault();
		var $this = $(this);
		_source = $this.attr('data-source');
		
		$('#pick-lesson').show();
		$('#' + _source).animate({top: '100%'}, 200, function() {
			$('#' + _source).css({zIndex: 99})
			$('#pick-lesson').css({zIndex: 100});

		});

	}).on('click', '#clear_canvas', function(e) {
		e.preventDefault();
		clearCanvas();
	}).on('click', '#save_canvas', function(e) {
		e.preventDefault();
		save();
	}).on('click', '#next', function (e) {
		_current_letter++;
		if (_current_letter > (a_letters.length - 1) ) {
			_current_letter = a_letters.length - 1;
		}
		render_the_practice();
	}).on('click', '#prev', function (e) {
		_current_letter--;
		if (_current_letter < 0) {
			_current_letter = 0;
		}
		render_the_practice();
	});
	
	function render_the_practice() {
		clearCanvas();
		a_letters = (_lang == 'hiragana') ? a_vocab_hiragana : a_vocab_katakana;
		if (_rand == '1') {
			shuffle_array(a_letters);
		}
		
		if (_type == 'practice') {
			$('#background_image').attr('src', 'img/' + _lang + '/gifs/' + a_letters[_current_letter][1] + '.gif');
			$('#recognized').text("");
			$('#draw_this').text(a_letters[_current_letter][0]);
			$('#english').text(a_letters[_current_letter][1]);
			$('#canvasimg').attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=');
		}
		// Show the first letter in the box if practice
		
		$('#pick-lesson').slideUp();
		$('#lesson').slideDown();
	}
	
	$(window).on("resize", function(){                      
        // resize();
    });	
	
	function post_submit(d) {
		$("#canvasimg").attr('src', d.img);
		
		$("#recognized").text(d.chr);
		
		// Find the romanji version.
		for (_i in a_letters) {
			if (a_letters[_i][0] == d.chr) {
				$("#english").text(a_letters[_i][1]);
			}
		}
		// console.log(a_letters, a_letters[d.chr]);
	}
	
    function respondCanvas(){ 
    }
	
	$(document).ready(function(){
		respondCanvas();
		$(window).on("resize", function(){                      
			respondCanvas();
		});
	});

	
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	// GENERAL FUNCTIONS //
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	
	function shuffle_array(array_in) {
		var array = array_in;
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
	
	function addCommas(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
	
	
	
	
	
	
	
	
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	// CANVAS // 
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	

		

	// Set up mouse events for drawing
	var drawing = false;
	var mousePos = { x:0, y:0 };
	var lastPos = mousePos;
	canvas.addEventListener("mousedown", function (e) {
					drawing = true;
		lastPos = getMousePos(canvas, e);
	}, false);
	canvas.addEventListener("mouseup", function (e) {
		drawing = false;
	}, false);
	canvas.addEventListener("mousemove", function (e) {
		mousePos = getMousePos(canvas, e);
	}, false);

	// Get the position of the mouse relative to the canvas
	function getMousePos(canvasDom, mouseEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: mouseEvent.clientX - rect.left,
			y: mouseEvent.clientY - rect.top
		};
	}


	// Get a regular interval for drawing to the screen
	window.requestAnimFrame = (function (callback) {
		return window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimaitonFrame ||
			function (callback) {
				window.setTimeout(callback, 1000/60);
			};
	})();


	// Draw to the canvas
	function renderCanvas() {
		if (drawing) {
			ctx.moveTo(lastPos.x, lastPos.y);
			ctx.lineTo(mousePos.x, mousePos.y);
			ctx.stroke();
			lastPos = mousePos;
		}
	}

	// Allow for animation
	(function drawLoop () {
		requestAnimFrame(drawLoop);
		renderCanvas();
	})();


	// Set up touch events for mobile, etc
	canvas.addEventListener("touchstart", function (e) {
					mousePos = getTouchPos(canvas, e);
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchend", function (e) {
		var mouseEvent = new MouseEvent("mouseup", {});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchmove", function (e) {
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);

	// Get the position of a touch relative to the canvas
	function getTouchPos(canvasDom, touchEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: touchEvent.touches[0].clientX - rect.left,
			y: touchEvent.touches[0].clientY - rect.top
		};
	}


	// Prevent scrolling when touching the canvas
	document.body.addEventListener("touchstart", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchend", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchmove", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);

	function clearCanvas() {
		canvas.width = canvas.width;
		ctx.lineWidth = line_thickness;
		ctx.lineCap  = "round";
		ctx.lineJoin  = "round";
		ctx.fillStyle = "transparent";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	function save() {
		// document.getElementById("canvasimg").style.border = "2px solid";
		//ctx.lineWidth = 7;
		//ctx.fillStyle = "white";
		//ctx.fillRect(0, 0, canvas.width, canvas.height);
		var _data = ctx.getImageData(0, 0, canvas.width, canvas.height);
		var _composite_operation = ctx.globalCompositeOperation;
		ctx.globalCompositeOperation = "destination-over";
		//ctx.clearRect (0,0,canvas.width, canvas.height);
		ctx.fillStyle = "white";
		ctx.fillRect(0,0,canvas.width, canvas.height);
		//ctx.putImageData(_data, 0,0);
		var dataURL = canvas.toDataURL('image/jpeg',1);//.replace("image/jpeg", "image/octet-stream");
		//console.log(dataURL);
		$.ajax({
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			},
			url: 'http://tesseract.pegastudios.com/submit_image.php',
			dataType: 'json',
			type: 'post',
			data: 'lang=' + _lang + '&imgBase64=' + encodeURIComponent(dataURL),
			success: function (d) {
				post_submit(d);
				//_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
				ctx.clearRect (0,0,canvas.width, canvas.height);
				ctx.fillStyle = "transparent";
				// ctx.fillRect(0,0,canvas.width, canvas.height);
				ctx.putImageData(_data, 0,0);
				ctx.globalCompositeOperation = _composite_operation;
				//console.log(dataURL);
				// document.getElementById("canvasimg").src = dataURL;
			}
		});
		//document.getElementById("canvasimg").style.display = "inline";
	}
	
});
