// Store the getted streams in an array of Streams
var streamList = [];
var Stream = class {
    constructor (onlineStatus, description, name, url, logo) {
        this.onlineStatus = onlineStatus;
        this.description = description;
        this.name = name;
        this.url = url;
        this.logo = logo;
    }
};



$(document).ready(function () {

    // The results of each stream will be pushed to "json"
    var followedStreamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "neEkzistas"];

    // Get the JSON
    $.each(followedStreamers, function(i, stream){
        $.ajax( {
            dataType: 'jsonp',
            url: 'https://wind-bow.glitch.me/twitch-api/users/'+stream,
            type: 'GET',
            success: function(json) {
                // If the stream exists, check with a GET request if it is online
                // Transfer the data about the stream ; because the other does not retrieve these info
                if (json.hasOwnProperty("display_name")) {
                    existingStream(stream, json.status, json.name, json.url, json.logo);
                } else {
                    streamList.push(new Stream("offline", json.message, json.status, "#", "#"));
                }

                buildHTML();
            }
        });
    });
});


// If a stream exists, check if it is online (property stream not null), then build the Stream object
function existingStream(stream, description, name, url, logo){
    $.ajax( {
        dataType: 'jsonp',
        url: 'https://wind-bow.glitch.me/twitch-api/streams/'+stream,
        type: 'GET',
        success: function(streamJSON) {

            if (streamJSON.stream != null) {
                console.log(streamJSON);
                streamList.push(new Stream("online", streamJSON.stream.channel.status, name, url, logo));
            } else {
                streamList.push(new Stream("offline", "This stream is offline", name, url, logo));
            }
            buildHTML();
        }
    });
}


// Build the displayed html from the Stream objects
function buildHTML(){
    var html = "";

    for (var i = 0; i < streamList.length; i++){
        html +=
            '<tr data-status="' + streamList[i].onlineStatus + '">' +
                '<td>' +
                    '<a href=' + streamList[i].url + '>' +
                        '<div class="media">' +
                            '<div class="pull-left">' +
                                '<img src="' + streamList[i].logo + '" class="media-photo">' +
                            '</div>' +
                            '<div>' +
                                '<h4 class="title">' +
                                    streamList[i].name +
                                    '<span class="pull-right ' + streamList[i].onlineStatus + '">' + streamList[i].onlineStatus + '</span>' +
                                '</h4>' +
                                '<p class="summary">' + streamList[i].description + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</a>' +
                '</td>' +
            '</tr>';
    }

    $("#stream-table-body").html(html);
}