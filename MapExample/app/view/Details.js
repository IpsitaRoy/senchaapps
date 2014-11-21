Ext.define('MapExample.view.Details', {
    extend: 'Ext.Container',
    xtype: 'details',
    config: {
        styleHtmlContents: true,
        scrollable: true,
        tpl: [
            '<div class="description">Details:{description}</div>'
        ].join(''),

        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: 'Details',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                name: 'go_to_map_btn'
            }]
        }]
    }
});
