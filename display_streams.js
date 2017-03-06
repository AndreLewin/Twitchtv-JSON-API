$(document).ready(function () {
    
    $.getJSON("./twitchsampleAPI.json", function(json) {
        var html="";

        // For each stream acquired
        for (var i = 0; i < json.length; i++){

            var onlineStatus;
            var description;
            var name;
            var url = "#";
            var logo = "#";

            // Get the online status
            if (json[i].hasOwnProperty("stream")) {
                if (json[i].stream === null) {
                    onlineStatus = "offline";
                    description = "This stream is offline";
                    name = json[i].display_name;
                } else {
                    onlineStatus = "online";
                    description = json[i].stream.status;
                    name = json[i].stream.name;
                    url = json[i].stream.url;
                    logo = json[i].stream.logo;
                }
            } else {
                onlineStatus = "offline";
                description = json[i].message;
                name = json[i].status;
            }

            // Build the html
            html +=
                '<tr data-status="' + onlineStatus + '">' +
                    '<td>' +
                        '<a href=' + url + '>' +
                            '<div class="media">' +
                                '<div class="pull-left">' +
                                    '<img src="' + logo + '" class="media-photo">' +
                                '</div>' +
                                '<div>' +
                                    '<h4 class="title">' +
                                        name +
                                        '<span class="pull-right ' + onlineStatus + '">' + onlineStatus + '</span>' +
                                    '</h4>' +
                                    '<p class="summary">' + description + '</p>' +
                                '</div>' +
                            '</div>' +
                        '</a>' +
                    '</td>' +
                '</tr>';
        }

        $("#stream-table-body").html(html);
    });
    
});