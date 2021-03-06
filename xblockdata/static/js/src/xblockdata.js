/* Javascript for DataBlockXBlock. */
function DataBlockXBlock(runtime, element) {
    $(window).on('unload', window_unfocused);
    $(window).on("focus", window_focused);
    $(window).on("blur", window_unfocused);
    setInterval(focus_check, 300 * 1000);

    var start_focus_time = undefined;
    var last_user_interaction = undefined;

function focus_check() {
    if (start_focus_time != undefined) {
        var curr_time = new Date();
        //Lets just put it for 4.5 minutes                                                                                
    if((curr_time.getTime() - last_user_interaction.getTime()) > (270 * 1000)) {
            //No interaction in this tab for last 5 minutes. Probably idle.                                               
            window_unfocused();
        }
    }
}

function window_focused(eo) {
    last_user_interaction = new Date();
    if (start_focus_time == undefined) {
    start_focus_time = new Date();                                                               
    }
}

function window_unfocused(eo) {
    if (start_focus_time != undefined) {
    var stop_focus_time = new Date();
    var total_focus_time = stop_focus_time.getTime() - start_focus_time.getTime();
    start_focus_time = undefined;
    var message = {};
        message.type = "time_spent";
        message.domain = document.domain;
        message.time_spent = total_focus_time;
        chrome.extension.sendMessage("", message);
    }
}
    function updateCount(result) {
        $('.count', element).text(result.count);
        $('.problem_id', element).text(result.problem_id);
    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    $('p', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success: function(result){
                updateCount(result);

            }
        });
    });
    $('#button').click(function(){
        $(this)
        $(".problem_id").toggle();
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
         $('ul', '.modal-actions')
            .append(
                $('<li>', {class: "action-item"}).append(
                    $('<a />', {class: "action-primary", id: "chx_submit", text: "Save"})
                )
    );
}
