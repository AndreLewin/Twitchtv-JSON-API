$(document).ready(function () {
    
    $.getJSON("./twitchsampleAPI.json", function(json) {
        var html="";

        // For each stream acquired
        for (var i = 0; i < json.length; i++){

            var onlineStatus;
            var description;
            var name;
            var url = "#";
            var logo = "#" ; // Default logo when the stream is offline or does not exist

            // Get the online status
            if (json[i].hasOwnProperty("stream")) {
                if (json[i].stream === null) {
                    onlineStatus = false;
                    description = "This stream is offline";
                    name = json[i].display_name;
                } else {
                    onlineStatus = true;
                    description = json[i].stream.status;
                    name = json[i].stream.name;
                    url = json[i].stream.url;
                    logo = json[i].stream.logo;
                }
            } else {
                onlineStatus = false;
                description = json[i].message;
                name = json[i].status;
            }
        }

        // TODO : Build the html with the properties
        
        // $("#stream-table-body").html(html);
    });
    
});