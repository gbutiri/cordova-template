//console.log('Using the expanded one.');
var _autosave_value = '';
var kt;
function el_split(el) {
	if (el.indexOf(" ") !== -1) {
		_split = el.split(" ");
		_first = _split[0];
		_rest = _split.slice(1).join(" ");
		return $(_first).find(_rest);
	} else {
		return $(el);
	}
}
function do_toggle(d) {
	switch (d._toggle_type) {
	case "toggle":
		d.$parent.find('.trigger').toggleClass('hidden');
		break;
	case "dropdown":
		d.$parent.find('.target').toggleClass('hidden');
		break;
	case "dropdown-toggle":
		d.$parent.find('.trigger').toggleClass('hidden');
		d.$parent.find('.target').toggleClass('hidden');
		break;
	}
}
function postAjax(d) {
	for (el in d.htmls) {
		el_split(el).html(d.htmls[el]);
	}
	for (el in d.errors) {
		el_split(el).html(d.errors[el]);
		el_split(el).closest('.has-feedback').addClass('has-error');
	}
	for (el in d.appends) {
		el_split(el).append(d.appends[el]);
	}
	for (el in d.prepends) {
		el_split(el).prepend(d.prepends[el]);
	}
	for (el in d.appendsto) {
		el_split(el).appendTo(d.appendsto[el]);
	}
	for (el in d.replaceables) {
		el_split(el).replaceWith(d.replaceables[el]);
	}
	for (el in d.removes) {
		$(document).find(d.removes[el]).remove();
	}
	for (el in d.afters) {
		el_split(el).after(d.afters[el]);
	}
	for (el in d.befores) {
		el_split(el).before(d.befores[el]);
	}
	for (el in d.attrremoves) {
		el_split(el).removeAttr(d.attrremoves[el]);
	}
	for (el in d.values) {
		el_split(el).val(d.values[el]);
	}
	for (el in d.propchanges) {
		for (value in d.propchanges[el]) {
			$(el).prop(value, d.propchanges[el][value]);
		}
	}
	for (el in d.attrchanges) {
		for (value in d.attrchanges[el]) {
			$(el).attr(value, d.attrchanges[el][value]);
		}
	}
	for (el in d.classRemoves) {
		el_split(el).removeClass(d.classRemoves[el]);
	}
	for (el in d.classAdds) {
		el_split(el).addClass(d.classAdds[el]);
	}
	for (el in d.classToggles) {
		el_split(el).toggleClass(d.classToggles[el]);
	}
	for (el in d.csselems) {
		for (v in d.csselems[el]) {
			el_split(el).css(v, d.csselems[el][v]);
		}
	};
	if (typeof(d.closevbox) !== 'undefined') {
		$.fn.vbox('close');
	}
	if (typeof(d.closevboxall) !== 'undefined') {
		$.fn.vbox('closeall');
	}
	if (typeof(d.js) !== 'undefined') {
		try {
			eval(d.js);
		} catch (e) {}
	}
	if (typeof(d.redirect) !== 'undefined') {
		if (d.redirect != '') {
			window.location.href = d.redirect;
		}
	}
	if (typeof(d.cont) !== 'undefined') {
		$(document).trigger('doAjaxController', [$(d.cont)]);
	}
	if (typeof(d.alert) !== 'undefined') {
		var _alert = $.parseJSON(d.alert);
		console.log(_alert);
		new PNotify({
			title: _alert.title,
			text: _alert.message,
			type: _alert.type,
			styling: 'bootstrap3'
		});
	}
	if (typeof(d.push) !== 'undefined') {
		history.pushState(d.push.data, d.push.title, d.push.url);
	}
	do_toggle(d);
}

$(document).on('doAjaxController', function (e, $this) {
	var _data = '';
	var _action = 'bad_call';
	var _module = 'dashboard';
	var _do_ajax = true;
	var _noload = false;
	var _toggle_type = '';
	var $parent = $this.parent();
	$(document).find('.has-feedback').removeClass('has-error has-success');
	if (typeof($this.attr('data-data')) !== 'undefined') {
		_data = $this.attr('data-data');
	}
	if (typeof($this.attr('data-action')) !== 'undefined') {
		_action = $this.attr('data-action');
	}
	if (typeof($this.attr('data-module')) !== 'undefined') {
		_module = $this.attr('data-module');
		console.log(_module, _module.indexOf('http'));
		if (_module.indexOf('http') === 0) {
			_module = $this.attr('data-module');
		} else {
			_module = '/' + $this.attr('data-module');
		}
	}
	if (typeof($this.attr('data-vboxclose')) !== 'undefined') {
		_do_ajax = false;
		$.fn.vbox('close');
	}
	if (typeof($parent.attr('data-trigger')) !== 'undefined') {
		_toggle_type = $parent.attr('data-trigger');
	}
	if (typeof($this.attr('data-noload')) !== 'undefined') {
		_noload = true;
	}
	if (_noload == false) {
		
		if (typeof($this.attr('data-loadmsg')) !== 'undefined') {
			_loadmsg = $this.attr('data-loadmsg');
		} else {
			_loadmsg = 'Stand by ...';
		}

		$.fn.spinner('show', _loadmsg);

	}
	if ($this.hasClass('ajaxform')) {
		_data = $this.serialize();
		$this.find('.err').addClass('text-danger');
		if ($this.find("[type=submit]")) {
			//$this.find('[type="submit"]').attr('disabled', "disabled").removeClass('btn-warning btn-danger btn-success btn-primary').append(' <i class="fa fa-spinner fa-spin"></i>');
			var btn = $this.find("button[type=submit]:focus").val();
			var _spliter = (_data.length > 0) ? '&' : '';
			_data += _spliter + $this.find("button[type=submit]:focus").attr('name') + '=' + btn;
		}
		$this.find('.err').html('');
	} else if ($this.hasClass('autosave')) {
		if ($this.attr('type') == 'checkbox') {
			//console.log('do me', $this.is(':checked'), $this.attr('checked'));
			_data += "&name=" + $this.attr('name') + '&value=' + ($this.is(':checked') ? 1: 0);
		} else {
			_data += "&name=" + $this.attr('name') + '&value=' + $this.val();
			if ($this.val() !== _autosave_value) {
				$this.attr('disabled', 'disabled');
				$parent.removeClass('has-error has-success');
			} else {
				$this.removeAttr('disabled');
				_do_ajax = false;
			}
		}
	} else {
		_data = $this.attr('data-data') ? $this.attr('data-data') : '';
		if (typeof($this.prop('checked')) !== 'undefined') {
			_data += '&checked=' + $this.prop('checked');
		}
	};
	if (_do_ajax) {
		if (_action != '') {
			_action = '/' + _action
		}
		$.ajax({
			url : _module + _action,
			type : 'post',
			data : _data,
			dataType : 'json',
			success : function (data) {
				$.fn.spinner('hide');

				if ($this.hasClass('autosave')) {
					if (!data.error) {
						$this.removeAttr('disabled');
						$parent.addClass('has-success');
						var k = setTimeout(function () {
								$parent.removeClass('has-success has-error')
							}, 1000);
						$parent.find('.err').html('');
					} else {
						$this.removeAttr('disabled').parent().addClass('has-error');
						$parent.find('.err').addClass('text-danger').html(data.error);
						$this.closest('.has-feedback').addClass('has-error');
					}
					postAjax(data);
				} else {
					postAjax(data);
					data._toggle_type = _toggle_type;
					data.$parent = $parent;
					if (typeof(data.errors) !== 'undefined') {
						//$this.find('[type="submit"]').removeAttr('disabled').find('.fa-spinner').remove();
						//$('html, body').animate({
						//	scrollTop : $this.find('.has-error').offset().top
						//}, 200, 'swing');
						//$this.find('[type="submit"]').removeClass('btn-success btn-warning').addClass('btn-danger');
					} else {}
				}
			}
		});
	} else {
		$.fn.spinner('hide');
	}
}).on('click', '.tmbtnchk', function (e) {
	$(document).trigger('doAjaxController', [$(this)]);
}).on('click', '.tmbtn', function (e) {
	e.preventDefault();
	e.stopPropagation();
	$(document).trigger('doAjaxController', [$(this)]);
}).on('submit', '.ajaxform', function (e) {
	e.preventDefault();
	$(document).trigger('doAjaxController', [$(this)]);
}).on('focus', '.autosave', function (e) {
	var $this = $(this);
	_autosave_value = $this.val();
}).on('change', '.autosave', function (e) {
	e.preventDefault();
	$(document).trigger('doAjaxController', [$(this)]);
}).on('click', function (e) {
	$target = $(e.target);
	$wrapper = $target.parents('.trigger-wrapper');
	$('.trigger-wrapper.reset').not($wrapper).find('.trigger, .target').removeClass('hidden');
	$('.trigger-wrapper.reset').not($wrapper).find('.init-hidden').addClass('hidden');
}).on('click', '.trigger-wrapper .target', function (e) {
	e.stopPropagation();
}).on('change', '.has-error input, .has-error select', function (e) {
	var $this = $(this);
	$this.closest('.has-error').removeClass('has-error');
});
(function ($) {
	$.fn.spinner = function (action, contents = "Loading...") {
		switch (action) {
			case "show":
				if (typeof(window.plugins.spinnerDialog) !== 'undefined') {
					window.plugins.spinnerDialog.show('Please wait...', contents);
				} else {
					$('body').append('<div id="loading-circle"><i class="fal fa-spinner fa-spin"></i><div class="loading-circle-message-wrapper"><div class="loading-circle-message">' + contents + '</div></div></div>');
				}
				break;
			case "hide":
				if (typeof(window.plugins.spinnerDialog) !== 'undefined') {
					window.plugins.spinnerDialog.hide();
				} else {
					$('#loading-circle').remove();
				}
				break;
		}
		
		
	}
})(jQuery);

(function ($) {
	var g_vboxlevel = 0;
	$(document).on('click', '.vbox-close, .fuzz', function (e) {
		e.preventDefault();
		$.fn.vbox('close');
	}).on('click', '.vbox', function (e) {
		e.stopPropagation();
	}).on('keyup', function (e) {
		if (e.keyCode == 27) {
			if (g_vboxlevel > 0) {
				$.fn.vbox('close');
			}
		}
	});


	$.fn.vbox = function (action, content) {
		switch (action) {
			case "open":
				g_vboxlevel++;
				$('body').css({
					'overflow' : 'hidden'
				}).append('<div class="fuzz" id="vbox_' + g_vboxlevel + '"><table align="center" class="vbox-table"><tr><td class="vbox-cell"><div class="vbox"><div class="vbox-content">' + content + '</div><a href="#" class="vbox-close">&times;</a></div></td></tr></table></div>');
				$(document).find('#vbox_' + g_vboxlevel).animate({
					opacity : 1
				}, 100, function () {}).find('.vbox').addClass('visible');
				break;
			case "close":
				$(document).find('#vbox_' + g_vboxlevel).animate({
					opacity : 0
				}, 100, function () {
					g_vboxlevel--;
					$(this).remove();
					if (g_vboxlevel == 0) {
						$('body').css({
							'overflow' : 'auto'
						});
					}
				}).find('.vbox').removeClass('visible');
				break;
			case "closeall":
				$('.fuzz').remove();
				g_vboxlevel = 0;
				break;
		}
	};
}(jQuery));
