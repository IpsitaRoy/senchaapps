Ext.define('MapExample.store.Places', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MapExample.model.Place',
        proxy: {
            type: 'ajax',
            url: 'app/data/MapData.json',
            reader: {
                type: 'json',
                rootProperty: 'places'
            }
        }
    }
});
