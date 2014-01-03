//Run in console while a boost is active, make sure you're not browsing invisibly.
var autoVisitMatches = function(){
    jQuery('#spotlight .thumbs .match').each(function(){
        var match   = jQuery(this),
            url     = match.attr('href'),
            popup   = window.open(url);
        
        // Removes Matches I have already Opened
        match.remove();

        // Closes window after it loads
        popup.addEventListener('load', function(){
            popup.close();
        });
    });
};
setInterval(autoVisitMatches, 1000);
