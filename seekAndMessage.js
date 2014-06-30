/**
 * This script generates warm leads on okCupid
 * 
 * They are going to spend a -fraction- of a second on your profile
 * before figuring out if you're their type. Have them do it
 * ahead of time by automatically messaging profiles with a high
 * enough match percent and following up on responders.
 *
 * @author  Miguel Ángel Pérez  miguel-perez.com, @tayokoart
 */
 
 
// 1. Set the message you'd like to send
// 2. Get an authcode by starting a message draft and pulling it from the network tab
//    when an XHR request is made to the server save your draft
// 3. Disable the popup blocker, make sure you're not browsing invisibly, and run this in console

var $cards  = jQuery('#match_results .match_card_wrapper');
// Loop through each card
$cards.each(function(i) {
    var $matchCard      = jQuery(this),
        matchTolerance  = 70;
    
    // Vote if you like them
    function init() {
        var id              = $matchCard.find('.current-rating').attr('id'),
            personality     = id.split('-')[2],
            matchPercent    = parseInt(String($matchCard.find('.percentages').text()).split('%')[0], 10),
            name            = $matchCard.find('.name').text(),
            hasContacted    = $matchCard.find('.last_contact').length;

        // Vote 5 Stars if you tolerate the match percentile and send her a message.
        if(matchPercent >= matchTolerance) {
            if(!hasContacted){
                visitProfile();
                voteFive(personality);
                sendMessage(name);
            }
        }
    }

    function voteFive(personality){
        processVoteNote('vote', 'personality', 5, personality, false, '', '', MatchCardsVoting.vote); // Vote 5 Stars
    }

    function sendMessage(name) {
        var params = {
            ajax: 1,
            sendmsg: 1,
            r1: name,
            subject: 'Hey there (:',
            body: 'To put it succinctly: I think you\'re smart and pretty, and I want to go out with you.', // Set message
            threadid: 0,
            authcode: '1,0,1390448809,0xd10aa04e8facacbb;453ceec0e21b34324a332b1f64d186607bb2a7c4', // Place new auth-code here
            reply: 0,
            from_profile: 1
        };
        new Ajax.Request('/mailbox', {
            parameters: params,
            onSuccess: console.log('Message Sent to' + name + '!')
        });
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

    init();
});
