var Ozine = {}
Ozine.RadioButton = function(settings) {
	var self = this;
    this.value = settings.value;
    this.checked = false;
    this.group = settings.group;
    this.value = settings.value || false;
    this.holder = document.createElement('div');
    this.holder.className = 'radioButton' + (this.checked ? ' select' : '');
    this.holder.innerHTML = '<b></b>' + settings.name;
    this.holder.setAttribute('tabindex', '0');
    this.holder.onkeydown = function(event) {
        if (event.keyCode == 13 || event.keyCode == 32)
        {
            self.holder.onmousedown();
        }
    }
    this.holder.onmousedown = function() {
        self.select();
    }
    if (!Ozine.RadioButton.groups[this.group]) {
        Ozine.RadioButton.groups[this.group] = new Array();
    }
	Ozine.RadioButton.groups[this.group].push(this);
    ADD_EVENT_DISPATCHER(this);
}
Ozine.RadioButton.groups = {};
Ozine.RadioButton.prototype.select = function() {
	var items = Ozine.RadioButton.groups[this.group];
	for (var iRadio = 0; iRadio < items.length; iRadio++) {
		var item = items[iRadio];
		item.checked = (item == this);
		item.holder.className = 'radioButton' + ((item == this) ? ' select' : '');
    }
    this.dispatchEvent(Event.CHANGE);
}
Ozine.RadioButton.prototype.setValue = function(value) {
    var items = Ozine.RadioButton.groups[this.group];
	for (var iRadio = 0; iRadio < items.length; iRadio++) {
		var item = items[iRadio];
		item.checked = (item.value == value);
		item.holder.className = 'radioButton' + ((item.value == value) ? ' select' : '');
	}
}
Ozine.RadioButton.prototype.getValue = function() {
	var items = Ozine.RadioButton.groups[this.group];
	for (var iRadio = 0; iRadio < items.length; iRadio++) {
		var item = items[iRadio];
		if (item.checked) {
			return item.value;
		}
	}
	return null;
}