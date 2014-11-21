Ext.define('MapExample.view.RoutingPage', {
    extend: 'Ext.Container',
    requires: ['Ext.form.FieldSet'],
    xtype: 'routingpage',
    config: {
        styleHtmlContent: true,
        items: [{
            xtype: 'titlebar',
            title: 'Find Location',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                name: 'go_to_menu_btn'
            }]
        }, {
            xtype: 'fieldset',
            title: 'Enter the Location',
            items: [{
                xtype: 'textfield',
                placeHolder: 'Start',
                name: 'start'
            }, {
                xtype: 'textfield',
                placeHolder: 'End',
                name: 'end'
            }]
        }, {
            xtype: 'button',
            ui: 'round',
            text: 'GetDirection',
            name: 'get-direction-btn'
        }]
    }
});
