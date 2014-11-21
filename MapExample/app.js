//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'mapinfobuble': 'app'
});
//</debug>

Ext.application({
    name: 'MapExample',

    requires: [
        'Ext.MessageBox'
    ],

    controllers: [
        'App'
    ],

    stores: [
        'Places'
    ],

    models: [
        'Place'
    ],

    views: [
        'Main',
        'Menu',
        'InfoMap',
        'Details',
        'RoutingPage'
    ],



    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('MapExample.view.Main'));
    },

});
