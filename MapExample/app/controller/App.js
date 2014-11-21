Ext.define('MapExample.controller.App', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            //Containers

            main: 'main',
            menu: 'menu',
            infoMap: 'infomap',
            details: 'details',
            menuList: 'list[name="menu-list"]',
            routingPage: 'routingpage',

            //Buttons

            goToMenuBtn: 'button[name="go_to_menu_btn"]',
            goToMapBtn: 'button[name="go_to_map_btn"]',
            getDirectionButton: 'button[name="get-direction-btn"]',

            //Textfields

            startPosition: 'textfield[name="start"]',
            endPosition: 'textfield[name="end"]',

            //Map

            map: 'map[name="infobubblemap"]'
        },
        control: {
            menuList: {
                itemtap: 'openSelectedPage'
            },
            goToMenuBtn: {
                tap: 'goToMenu'
            },
            goToMapBtn: {
                tap: 'goToMap'
            },
            getDirectionButton: {
                tap: 'getDirection'
            },
            map: {
                maprender: function(thisOb, map, eOpts) {
                    var me = this;
                    me.map = map;
                }
            }
        }
    },


    /*
     *Opens page depending on item tapped from the menu
     */
    openSelectedPage: function(view, index, target, record) {
        var me = this,
            recordData = record.getData();
        if (recordData.mapOptions == 'View Map') {
            me.viewMap();
        } else {
            me.getRoutePage();
        }
    },

    /*
     *Opens the map with infobubble
     */
    viewMap: function() {
        var me = this;
        me.getMain().animateActiveItem(me.getInfoMap(), {
            type: 'slide',
            direction: 'left'
        });
        Ext.defer(me.loadMarker, 500, me);
    },

    /*
     *Opens the page to enter location to get direction
     */
    getRoutePage: function() {
        var me = this;
        me.getMain().animateActiveItem(me.getRoutingPage(), {
            type: 'slide',
            direction: 'left'
        });
    },

    /*
     *Opens the map with direction
     */
    getDirection: function() {
        var me = this,
            map = me.map,
            directionsService = new google.maps.DirectionsService(),
            directionsDisplay = new google.maps.DirectionsRenderer(),
            request = {
                origin: me.getStartPosition().getValue(),
                destination: me.getEndPosition().getValue(),
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING
            };

        me.getMain().animateActiveItem(me.getInfoMap(), {
            type: 'slide',
            direction: 'left'
        });
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                console.log("success");
            } else {
                console.log("error");
            }
        });
        directionsDisplay.setMap(map);
    },

    launch: function() {
        Ext.getStore('Places').load();
    },

    /*
     * Function responsible for all the marker and infobubble handling
     **/

    loadMarker: function() {
        var me = this,
            latlngbounds = new google.maps.LatLngBounds(),
            position, marker,
            map = me.map,
            store = Ext.getStore('Places'),
            ib = new InfoBubble({
                hideCloseButton: true,
                disableAutoPan: true,
                maxHeight: 110
            });

        store.each(function(rec) {
            position = new google.maps.LatLng(rec.get('latitude'),
                rec.get('longitude'));

            marker = new google.maps.Marker({
                position: position,
                map: map,
                data: rec
            });

            /*
             * Showing InfoBubble
             **/
            (function(data, selfMarker) {
                google.maps.event.addListener(selfMarker, 'mousedown',
                    function(event) {
                        ib.record = {
                            places: data
                        };

                        ib.setContent([
                            '<div class="infobox">',
                            '<div class="content">',
                            data.get('description'),
                            '</div>',
                            '<img src="resources/images/arrow.png">',
                            '</div>'
                        ].join(''));

                        /*
                         * center the map on the marker position
                         **/
                        map.setCenter(selfMarker.position);

                        ib.open(map, this);

                        google.maps.event.addListener(map, 'mousedown',
                            function() {
                                ib.close();
                            });

                        /*
                         * Tap on InfoBubble handled here
                         **/
                        google.maps.event.addDomListener(ib.bubble_, 'click',
                            function(e) {
                                if (!me.getDetails()) {
                                    me.getMain().add({
                                        xtype: 'details'
                                    });
                                }
                                me.getMain().animateActiveItem(me.getDetails(), {
                                    type: 'slide'
                                });

                                me.getDetails().setData(ib.record.places.data);
                            });
                    });
            }(rec, marker));

            latlngbounds.extend(position);

            map.fitBounds(latlngbounds);
        }, me);
    },

    /*
     *Go to the Menu Page
     */
    goToMenu: function() {
        var me = this;
        me.getMain().animateActiveItem(me.getMenu(), {
            type: 'slide',
            direction: 'right'
        });
    },

    /*
     *Go to the Map Page
     */
    goToMap: function() {
        var me = this;
        me.getMain().animateActiveItem(me.getInfoMap(), {
            type: 'slide',
            direction: 'right'
        });
    }
});
