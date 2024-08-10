$(document).ready(() => {
    showLoader(false);

    $("#submit").click((event) => {
        event.preventDefault();

        const url = $("#songUrl").val();
        const extension = $("#extension").val().toLowerCase();
        const playlist = $("#playlist").is(":checked");

        httpPost("download", {
            url: url, extension: extension, playlist: playlist
        })
    })
});

const showLoader = (showLoader = true) => {
    const button = $("#submit");
    const loader = $("#loader");

    showLoader ? loader.show() : loader.hide();
    showLoader ? button.hide() : button.show();
}

const showResponseMessage = (success, message) => {
    const container = $("#messageContainer");
    const content = $("#messageContent");
    const style = success ? "success" : "fail";

    container.addClass(`message-${style}`);
    content.text(message);
    container.show();

    setTimeout(() => {
        container.hide();
    }, 3000);
}

const httpPost = (url, data) => {
    showLoader(true);
    $.ajax({
        type: "POST",
        url: "/download",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    }).done((response) => {
        showResponseMessage(response.success, response.message);
        showLoader(false);
    }).fail(() => {
        showResponseMessage(false, "An error has occurred");
        showLoader(false);
    });
}
