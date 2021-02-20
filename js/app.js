'use strict';

var keywords = [];
var id = $('#temp');
var renderArr = [];
var titleArr = [];
var hornsArr = [];
var pushArr = true;

function Album(image, title, description, keyword, horns) {
    this.image = image;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    if(pushArr){
        keywords.push(this.keyword);
        renderArr.push(this);
        titleArr.push(this.title);
        hornsArr.push(this.horns);
    }
    sortHorns(hornsArr);
    sortTitle(titleArr);
}

Album.prototype.renderAlbum = function() {
    let template = $(id).html();
    $("#mainTemp").append(Mustache.render(template, this));
};

function display() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $('main').empty();
    $('#showKeywords').empty();
    $.ajax('./data/page-1.json', ajaxSettings).then(data => {
        data.forEach(element => {
            pushArr = true;
            let jsAlbum = new Album(element.image_url, element.title, element.
	    description, element.keyword, element.horns);
            jsAlbum.renderAlbum();
        });
        // filtering();
        showKeywords();
        console.log(renderArr);
    });
}

$('document').ready(display);

var uniqueNames = [];

function filtering() {

    $.each(keywords, function(i, el) {
        if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);

    });
}

function showKeywords() {
    // $('#showKeywords').on('change', function() {
    //     $('#mainTemp').children().not(':first-child').remove();
    // });
    for (let index = 0; index < uniqueNames.length; index++) {
        let keyValue = uniqueNames[index];
        $('#showKeywords').append(`<option>${keyValue}</option>`);
    }

}

let showHide = (event) => {
    $('#mainTemp').empty();
    let selectKeyWord = event.target.value;
    renderArr.forEach(v => {
        if (v.keyword == selectKeyWord) {
            v.renderAlbum();
        }
    })
};

// $('#showKeywords').on('change', showHide);
$('select').on('change', showHide);

function showAlbumTwo() {

    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $('main').empty();
    $.ajax('./data/page-2.json', ajaxSettings).then(data => {
        data.forEach(element => {
            pushArr = true;
            let jsAlbum = new Album(element.image_url, element.title, element.
	    description, element.keyword, element.horns);
            jsAlbum.renderAlbum();
        });
        filtering();
    });
}

$('#secP').on('click', showAlbumTwo);
$('#firstP').on('click', display);

function sortHorns(data) {
    data.sort((a, b) => {
        return a.horns - b.horns;
    });
    // console.log(data);
};

function sortTitle(data) {
    data.sort((a, b) => {
        return (a.title > b.title) ? 1 : -1
    })
};

function showHorns() {

    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $('main').empty();
    var data1;
    var data2;
    var allData;
    $.ajax('./data/page-2.json', ajaxSettings).then(data => {
        data2 = data;
        $.ajax('./data/page-1.json', ajaxSettings).then(data => {
            data1 = data;
            allData = data1.concat(data2);
            sortHorns(allData);
            pushArr = false;
            allData.forEach(element => {
                let jsAlbum = new Album(element.image_url, element.title, element.description, element.keyword, element.horns);
                jsAlbum.renderAlbum();
            });
            filtering();
        });
    });
}
showHorns();

function showTitle() {

    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $('main').empty();
    var data1;
    var data2;
    var allData;
    $.ajax('./data/page-2.json', ajaxSettings).then(data => {
        data2 = data;
        $.ajax('./data/page-1.json', ajaxSettings).then(data => {
            data1 = data;
            allData = data1.concat(data2);
            sortTitle(allData);
            pushArr = false;
            allData.forEach(element => {
                let jsAlbum = new Album(element.image_url, element.title, element.description, element.keyword, element.horns);
                jsAlbum.renderAlbum();
            });
            filtering();
        });
    });
}

$('#horns').on('click', showHorns);
$('#title').on('click', showTitle);