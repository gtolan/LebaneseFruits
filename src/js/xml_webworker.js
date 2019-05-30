


self.addEventListener('message', function(event){
    console.log(event, "xml ww")
    if(event.data.action === "fetch"){
        //do work
        // var options = event.data.options;


        var catInput = event.data.catInput;
        var pageNum = event.data.page;
        var categ = event.data.cat
        var url = 'https://backend.appolicious.com/wp-json/wp/v2/posts?per_page=12&' + catInput + 'page=' + pageNum + '&_jsonp';
        var xhr = new XMLHttpRequest();


        //console.log('start xml webworker')
        xhr.open('GET', url , true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200){
                //   //console.log(xhr.responseText);
                //console.log('got xml response -webworker')
                var text = xhr.responseText;
                postMessage({result:"success",data: text, category: categ, page: pageNum})
                //  return resolve(text)
            }else if(xhr.readyState == 4 && xhr.status == 400){
                ////console.log(xhr.responseText);
                var resp = JSON.parse(xhr.responseText);

                var code = resp.code;
                //console.log(code);
                //console.log(code.indexOf("invalid_page_number"));

                if(resp.code.indexOf("rest_post_invalid_page_number") > 1 ) {
                    //console.log('last page...');
                    postMessage({result:"fail-lastpage", category: categ, page: pageNum})
                    // xmlFallback.addSentinel();
                    close();
                }
                //console.log('handle xml fail for', categ)
                //handleReq.responseFail(cat, fetchTests);
                postMessage({result:"fail", category: categ, page: pageNum})
                // return reject(text)
            }

        };
        xhr.send();


    }else if(event.data.action === "related-articles"){

        var article = event.data.article;
        var term = article["Article-data"].title.rendered;
        var add = "https://beta.appolicious.com/relatedArticles/";
        var term = article["Article-data"].title.rendered;
        var url = add + term;


        var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('GET', url , true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200){

                var text = xhr.responseText;
                text = JSON.parse(text);
                var result = relatedArt.removeDuplicatesAndLimitAmount(text)
                postMessage({result:"success", relatedData: result})
                return;
            }else if(xhr.readyState == 4 && xhr.status == 400){
                //////console.log(xhr.responseText);
                postMessage({result:"fail"})

                ////console.log('relate data fail', resp)
                return false;
            }else if(xhr.readyState == 4 && xhr.status == 504){
                //////console.log(xhr.responseText);
                postMessage({result:"fail"})
                return;
            }
        };

        xhr.send();





    }else if (event.data.action === "youtube") {
        var url = event.data.url;
        console.log('yt fetch')
        var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('GET', url , true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200){
                console.log('yt fetch')
                var text = xhr.responseText;
                text = JSON.parse(text);
                console.log(text)
                postMessage({result:"success", data: text})
                close();
            }else if(xhr.readyState == 4 && xhr.status == 400){
                //////console.log(xhr.responseText);
                postMessage({result:"fail"})

                ////console.log('relate data fail', resp)
                return false;
            }else if(xhr.readyState == 4 && xhr.status == 504){
                //////console.log(xhr.responseText);
                postMessage({result:"fail"})
                close();
            }
        };


        xhr.send();


    }else if (event.data.action === "author-fetch"){
        //do work
        var url = event.data.url;

        var xhr = new XMLHttpRequest();


        //console.log('start AUTHOR xml webworker')
        xhr.open('GET', url , true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200){
                //   //console.log(xhr.responseText);
                //console.log('got xml author WW response -webworker')
                var text = xhr.responseText;
                postMessage({result:"success",data: text})
                close();
                //  return resolve(text)
            }else if(xhr.readyState == 4 && xhr.status == 400){

                postMessage({result:"fail"})
                close();
            }

        };
        xhr.send();

    }


})




var relatedArt = {

    removeDuplicatesAndLimitAmount: function(articles){
        var articleOb = [];
        var articleIDs = {};
        var scores = {};
        var scorArr = [];
        var removeDupes = {};
        for(var i = 0;i < articles.length;i++){
            var ID = articles[i].id;
            var score = articles[i].score;
            removeDupes[ID] = articles[i];
        }

        var removedDuplicatesArr = []
        var keys = Object.keys(removeDupes);
        for(var i = 0;i < keys.length;i++){
            var artkey = keys[i]
            var articleVal = removeDupes[artkey]
            removedDuplicatesArr.push(articleVal)
        }

        articles = removedDuplicatesArr;
        //console.log(articles, "artilces arfter dupe removal")


        for(var i = 0;i < articles.length;i++){
            var ID = articles[i].id;
            var artic = articles[i];
            var score = articles[i].score;
            if(scores.hasOwnProperty(score)){
                var scorInc = score + i
                scores[scorInc] = articles[i];
            }else {
                scores[score] = articles[i];
            }
            if(!articleIDs.hasOwnProperty(ID)){
                articleIDs[ID] = true;
                articleOb.push(artic);
                scorArr.push(score);
            }
        }

        //console.log("scores", scores);
        var scoresArr = Object.keys(scores);
        scoresArr = scoresArr.sort(function(a, b){return b - a});
        //console.log(scoresArr);

        scoresArr = scoresArr.splice(0,4);
        var scoressArranged =[];
        for(var i = 0;i < scoresArr.length;i++){
            var item = scoresArr[i]
            var topScoredArt = scores[item];
            scoressArranged.push(topScoredArt);
        }
        //console.log("scoressArranged", scoressArranged);
        return relatedArt.santizieMissingThumbnailImages(scoressArranged);


    },

    santizieMissingThumbnailImages: function(articles){
        //console.log('sanitizing thumb images')
        for(var i = 0;i < articles.length;i++){
            if(articles[i].better_featured_image && articles[i].better_featured_image !== null){
                if(articles[i].better_featured_image.media_details.sizes.thumbnail){
                    if(!articles[i].better_featured_image.media_details.sizes.thumbnail.source_url) {
                        articles[i].better_featured_image.media_details.sizes.thumbnail.source_url = "https://static.pexels.com/photos/193004/pexels-photo-193004.jpeg";
                    }
                }else {
                    articles[i].better_featured_image.media_details.sizes.thumbnail = {"source_url":"https://static.pexels.com/photos/193004/pexels-photo-193004.jpeg"};
                }
            }else {
                articles[i].better_featured_image = {media_details:{sizes:{thumbnail:{"source_url":"https://static.pexels.com/photos/193004/pexels-photo-193004.jpeg"}}}}
            }
        }
        return articles;
    },

}
