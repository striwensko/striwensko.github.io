var SELLUTION = {};
SELLUTION.MODULES = {};
SELLUTION.MODULES.POPUP_BUILDER = 'popup_builder';

SELLUTION.MODULES.PopupBuilder = function (model) {
    var self = this;
    
    var template;
    template += '<div class="popup-builder>';
    template += '  <div class="bar">';
    template += '    <div class="tabs"></div>';
    template += '  </div>';
    template += '  <div class="left"></div>';
    template += '  <div class="iframeHolder">';
    template += '    <iframe src="empty.html" frameborder="0" name="popup_frame" id="popup_frame"></iframe>';
    template += '  </div>';
    template += '</div>';
}