TableFilter = function()
{
    this.holder = document.createElement('div');
    this.holder.className = 'table-filter';

    this.UI = {};

    var template = '';
    template += '<div class="title">Smart List</div>';
    template += '<div class="container">';
    template += '</div>';

    this.holder.appendChild(Browser.DOM(template, this.UI));
}