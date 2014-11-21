Ext.define('MapExample.view.Menu', {
    extend: 'Ext.Container',
    requires: ['Ext.dataview.List', 'Ext.TitleBar'],
    xtype: 'menu',
    config: {
        layout: 'fit',
        items: [{
            xtype: 'titlebar',
            title: 'Menu',
            docked: 'top'
        }, {
            xtype: 'list',
            name: 'menu-list',
            onItemDisclosure: true,
            itemTpl: '{mapOptions}',
            data: [{
                mapOptions: 'View Map'
            }, {
                mapOptions: 'Get Directions'
            }]
        }]
    }
});
