Ext.define('MapExample.view.InfoMap', {
    extend: 'Ext.Container',
    requires: [
        'Ext.Map',
        'Ext.TitleBar'
    ],
    xtype: 'infomap',
    config: {
        layout: 'fit',
        items: [{
            xtype: 'titlebar',
            title: 'Map',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                name: 'go_to_menu_btn'
            }]
        }, {
            xtype: 'map',
            name: 'infobubblemap'
        }]
    }
});
