Ext.define('MapExample.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    config: {
        layout: 'card',
        items: [{
            xtype: 'menu'
        }, {
            xtype: 'infomap'
        }, {
            xtype: 'details'
        }, {
            xtype: 'routingpage'
        }]
    }
});
