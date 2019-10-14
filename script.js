var prevToken = "";
var nextToken = "";

function fetchVideos(pageToken) {
    $("#result-list").html(""); 
    let key = "AIzaSyBBAzq-9aqOqYePCg4xvklvRTU5o2TkNC4";
    let keyword = $("#searchbar").val();
    let url = "https://www.googleapis.com/youtube/v3/search";

    $.ajax({
        url: url,
        data: {
            part: "snippet",
            q: keyword,
            key: key,
            maxResults: 10,
            pageToken: pageToken,
        },
        method: "GET",
        dataType: "json",
        success: function(responseJSON) {
            responseJSON.items.forEach((el) => {
                let youtubeUrl = "https://www.youtube.com/watch?v=" + el.id.videoId;
                $("#result-list").append(
                	`<li> 
                        <div>
                            <h3><a class="videoTitle" href=${youtubeUrl} target="_blank">${el.snippet.title}</a></h3>
                                <a href=${youtubeUrl} target="_blank"><img src="${el.snippet.thumbnails.medium.url}" /></a>
                        </div>
                    </li>`
                );
            });
            let nextBtn = $("<button  class='nextBtn'>Next Page</button>");
            let previousBtn = $("<button class='previousBtn'>Previous Page</button>");
            if(pageToken != "") {
                prevToken = responseJSON.prevPageToken;
                $("#result-list").append(previousBtn, nextBtn);
            } else {
                prevToken = "";
                $("#result-list").append(nextBtn);
            }
            nextToken = responseJSON.nextPageToken;
        },
        error: function(err) {
            console.log(err);
        }
    });
}

$("#search-btn").on("click", function(e) {
    e.preventDefault();

    if ($("#searchbar").val() === "") {
        $("#result-list").html("");
        console.log("ERROR: no search term");
    } else {
        fetchVideos("");
    }
});

$("#result-list").on("click", ".nextBtn", (e) => {
    e.preventDefault();
    fetchVideos(nextToken);
    return;
});

$("#result-list").on("click", ".previousBtn", (e) => {
    e.preventDefault();
    fetchVideos(prevToken);
    return;
});