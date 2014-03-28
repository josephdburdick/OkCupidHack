
// This file is outdated, see seekAndMessage.js



var count           = 0,
    repeat          = 3,  // Number of times to run the script, ussually 18 profiles per run.
    matchTolerance  = 60; // Match percent tolerance 

// Master Loop
function cardLoop() {
    console.log('Start Loop');
    count ++;

    var $cards          = jQuery('#match_results .match_card_wrapper'),
        totalCards      = $cards.length;

    // Loop through each card
    $cards.each(function(i) {
        var $matchCard      = jQuery(this);
        
        // Vote if you like her
        function voteFiveStars() {
            var id              = $matchCard.find('.current-rating').attr('id'),
                personality     = id.split('-')[2],
                matchPercent    = parseInt(String($matchCard.find('.percentages').text()).split('%')[0], 10);
            // Vote 5 Stars if you tolerate the match percentile
            if(matchPercent >= matchTolerance) {
                processVoteNote('vote', 'personality', 5, personality, false, '', '', MatchCardsVoting.vote); // Vote 5 Stars
            } else {
                processVoteNote('vote', 'personality', 1, personality, false, '', '', MatchCardsVoting.vote); // Vote 1 Stars
            }
        }

        // Visit them and close the window
        function visitProfile() {
            var url     = $matchCard.find('.name').attr('href'),
                popup   = window.open(url);

            // Closes window after it loads
            popup.addEventListener('load', function(){
                popup.close();
            });
        }

        // Remove the card to save memory
        function removeCard() {
            $matchCard.remove();
        }

        // Space things out for performance
        function init() {
            voteFiveStars();
            visitProfile();
            removeCard();
            console.log('Examined Card');
        }

        init();


        // Reached the end of the cards, get more
        if(i + 1 === totalCards && count < repeat) {
            MatchAjaxLoader.get_next();
            setTimeout(function(){ cardLoop(); }, 5000);
        }
    });
}

cardLoop();
