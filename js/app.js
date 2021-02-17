'use strict';

var keywords = [];
var id = $('#temp');
var renderArr = []; 

function Album(image, title, description, keyword, horns) {
    this.image = image;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    keywords.push(this.keyword);
    renderArr.push(this)
}


Album.prototype.renderAlbum = function () {
    // let sectionAlbum = $('.sec').clone();
    // sectionAlbum.find('img').attr('src', this.image);
    // sectionAlbum.find('h2').text(this.title);
    // sectionAlbum.find('p').text(this.description);
    // sectionAlbum.removeClass('sec');
    // sectionAlbum.toggleClass(this.keyword);

    // $('main').append(sectionAlbum);
    let template = $(id).html();
    
    $("#mainTemp").append(Mustache.render(template,this));

};

// Album.prototype.renderAlbum = function () {
//     let template = $(letID).html();
//     // console.log(template)
//     // $('.sec').append(Mustache.render(template, this));
    
//     let render = Mustache.render(template,this);
    
//     return render;
//     console.log('test')
// };

function display() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $('main').empty();
    $('#showKeywords').empty();
    $.ajax('../data/page-1.json', ajaxSettings).then(data => {
        data.forEach(element => {
            let jsAlbum = new Album(element.image_url, element.title, element.description, element.keyword, element.horns);
            jsAlbum.renderAlbum();
        });
        uniqueNames = [];
        filtering();
        showKeywords();
    });
}

$('document').ready(display);

var uniqueNames = [];
function filtering() {

    $.each(keywords, function (i, el) {
        if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);

    });
}

function showKeywords() {
    // let showing = $('#showKeywords').clone();
    // showing.removeAttr('showKeywords');
    $('#showKeywords').on('change',function(){
        $('#mainTemp').children().not(':first-child').remove();
    });
    for (let index = 0; index < uniqueNames.length; index++) {
        let keyValue = uniqueNames[index];
        $('#showKeywords').append(`<option>${keyValue}</option>`);
    }

}

let showHide = (event) => {
    $('#mainTemp').empty();
    let selectKeyWord = event.target.value;
    // $('section').hide();
    renderArr.forEach(v=>{
        if (v.keyword == selectKeyWord){
            v.renderAlbum()
            console.log(v.keyword);
        }
    })
    // $(`.${selectKeyWord}`).fadeIn();
    // selectKeyWord.renderAlbum
    // console.log(selectKeyWord);

};
$('#showKeywords').on('change', showHide);
$('select').on('change',showHide);

function showAlbumTwo() {

    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    
    $('main').empty();
    

    $.ajax('../data/page-2.json', ajaxSettings).then(data => {
        data.forEach(element => {
            let jsAlbum = new Album(element.image_url, element.title, element.description, element.keyword, element.horns);
            jsAlbum.renderAlbum();
        });
    });
}

// let clearAndRender = (event) => {
//     $('.sec').hide();
//     let selectImages = event.target.id;
//     $('.secP').hide();
// };

$('#secP').on('click', showAlbumTwo);
$('#firstP').on('click', display);
