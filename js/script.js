document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark={
        Name : siteName,
        Url : siteUrl
    }

    // console.log(bookmarks);
    // localStorage.setItem('test', 'hello world')
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));

    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }
    document.getElementById('myForm').reset();

    fetchBookmarks();

//prevents form from submitting by default
    e.preventDefault();
}


function deleteBookmark(Url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i =0;i < bookmarks.length;i++){
        if(bookmarks[i].Url == Url){
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}


function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarkResults = document.getElementById('bookmarkResults');
    bookmarkResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].Name;
        var url = bookmarks[i].Url;

        bookmarkResults.innerHTML += '<div class="well">'+
                                     '<h3>'+name+
                                     ' <a class="btn btn-success" target="_blank" href="'+url+'">Visit</a> ' +
                                     ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                     '</h3>'+
                                     '</div>';
    }
}

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }
    return true;
}