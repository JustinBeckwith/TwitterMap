
$(function () {

    var map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), {
        credentials: "AnONREX2RmJq2kD0D_M7CWB1zPPkNBRj2ocFkXq1HCEIU7nku7zKiTwCfzMtQOnb",
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        center: new Microsoft.Maps.Location(38.548165, -99.843750),
        zoom: 4
    });

    // set up a single box to use for tweet info
    var box = new Microsoft.Maps.Infobox(location, {
        zIndex: 100000,
        visible: false
    });
    map.entities.push(box);

    var queue = [];
    var socket = io.connect();
    socket.on('tweet', function (tweet) {
        var location = new Microsoft.Maps.Location(tweet.coordinates.coordinates[1], tweet.coordinates.coordinates[0]);
        var pin = new Microsoft.Maps.Pushpin(location, { text: 't' });
        pin.title = tweet.user.name;
        pin.description = tweet.text;

        Microsoft.Maps.Events.addHandler(pin, 'click', function (e) {
            box.setLocation(e.target.getLocation());
            box.setOptions({ visible: true, title: e.target.title, description: e.target.description });
        });

        Microsoft.Maps.Events.addHandler(map, 'viewchange', function (e) {
            box.setOptions({ visible: false });
        });

        map.entities.push(pin);        
    });

    // clean up old pins
    setInterval(function() {        
        var i = 0;
        while (map.entities.getLength() > 1000) {
            var entity = map.entities.get(i);
            if (entity instanceof Microsoft.Maps.Pushpin) {
                console.log(map.entities.getLength());                
                map.entities.removeAt(i);
            }
            i++;
        }        
    }, 1000)
});


