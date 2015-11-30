"use strict";

var Playable = require("../Logic/Playable.js");
var youtube = require('ytdl-core');

class YoutubeVideo extends Playable {

    constructor(user, video) {
        super(user);
        this.video = video.replace("https://", "http://"); // YTDL does not recognizes https :(

        this.title = this.video;
        this.url = null;
    }

    loadData() {
        var self = this;
        youtube.getInfo(this.video, function(error, info) {
            if(error != null) {
                console.log(error);
            } else {
                self.title = info.title;
                self.url = info.loaderUrl;
                self.emit('data-changed');
            }
        });
    }

    getTitle() {
        return this.title;
    }

    getAdditionalInfo() {
        return this.url;
    }

    createStream() {
        return youtube(this.video, {filter: filterVideo, quality: 'lowest'});
        function filterVideo (format) {
            return format.container === 'mp4';
        }
    }

}

module.exports = YoutubeVideo;