'use strict';
$(document).ready(function () {
    generateTableAndAddToPage(startingSet);
})

    // Generating the CAH table
function generateTable(fileLines) {
    var numberPerRow = 5;
    var rowsPerPage = 2;

    // Skip the empty lines
    fileLines = fileLines.filter(function pass(line) {
        if (line === null) return false;
        return line.trim() != "";
    });

    // Add empty cards to fill the page
    while (fileLines.length % (numberPerRow * rowsPerPage) != 0) {
        fileLines.push("");
    }

    // Turn slash characters to slash-newlines
    fileLines = $.map(fileLines, function transformLine(line) {
        return line.replace(/\/\//g, "<br/>");
    });

    var tableHtml = "";

    let label = $("#cardLabel").val();

    var isTableBegun = false;
    for (var rowIndex = 0; rowIndex <= (fileLines.length - 1) / numberPerRow; rowIndex++) {
        if (rowIndex % rowsPerPage == 0) {
            isTableBegun = true;
            tableHtml += "<table>";
            tableHtml += "<tbody>";
        }
        tableHtml += "<tr>";
        for (var cellIndex = rowIndex * numberPerRow; cellIndex < (rowIndex + 1) * numberPerRow; cellIndex++) {
            if (cellIndex >= fileLines.length) continue;
            tableHtml += "<td class='textfill'><span>";
            tableHtml += fileLines[cellIndex];
            tableHtml += "</span>";
            tableHtml += "<span class='small-text'>";
            tableHtml += fileLines[cellIndex];
            tableHtml += "</span> </td>";
        }
        tableHtml += "</tr>";
        if (rowIndex % rowsPerPage == rowsPerPage - 1) {
            tableHtml += "</table>";
            tableHtml += "</tbody>";
            isTableBegun = false;
        }
    }

    if (isTableBegun) {
        tableHtml += "</table>";
        tableHtml += "</tbody>";
        isTableBegun = false;
    }

    return tableHtml;
}

function generateTableAndAddToPage(fileLines) {
    var tableHtml = generateTable(fileLines);

    $('#list').html(tableHtml);

    // Adjust font size to fit width
    $('.textfill').textfill({ maxFontPixels: 100 });

    if (COLOUR === 'white-on-black') {
        changeColourToWhiteOnBlack();
    } if (COLOUR === 'black-on-white') {
        changeColourToBlackOnWhite();
    }
}

// Handling the file upload
function handleFileSelection(event) {
    $("#spinner").show();

    var inputFile = event.target.files[0];
    var reader = new FileReader();

    // Closure to use the file content
    reader.onload = (function (theFile) {
        return function (e) {
            var fileContent = e.target.result;
            var fileLines = fileContent.split('\n');
            generateTableAndAddToPage(fileLines);
            $("#spinner").hide();
        };
    })(inputFile);

    // Read in the text file
    reader.readAsText(inputFile, 'utf-8');
}

// Handling selecting an existing card set
function handleCardSetSelection(event) {
    $("#spinner").show();
    var filename = $(event.target).val();
    if (filename === 'none') {
        return;
    }
    var fullpath = filename;
    $.ajax({
        url: fullpath,
        dataType: "text",
        success: function (data) {
            var lines = data.split('\n');
            generateTableAndAddToPage(lines);
            $("#spinner").hide();
        },
        error: function (data, textStatus, errorThrown) {
            alert("Couldn't load the file");
            $("#spinner").hide();
        }
    });
}

// Handling colour changes
function changeColourToBlackOnWhite() {
    $('html').removeClass('white-on-black');
    $('body').removeClass('white-on-black');
    $('table').removeClass('white-on-black');
    $('tr').removeClass('white-on-black');
    $('td').removeClass('white-on-black');
    $('html').addClass('black-on-white');
    $('body').addClass('black-on-white');
    $('table').addClass('black-on-white');
    $('tr').addClass('black-on-white');
    $('td').addClass('black-on-white');
    COLOUR = 'black-on-white';
}

function changeColourToWhiteOnBlack() {
    $('html').removeClass('black-on-white');
    $('body').removeClass('black-on-white');
    $('table').removeClass('black-on-white');
    $('tr').removeClass('black-on-white');
    $('td').removeClass('black-on-white');
    $('html').addClass('white-on-black');
    $('body').addClass('white-on-black');
    $('table').addClass('white-on-black');
    $('tr').addClass('white-on-black');
    $('td').addClass('white-on-black');
    COLOUR = 'white-on-black';
}

var COLOUR = 'black-on-white';

$('#inputFile').bind('change', handleFileSelection);
$('button#colour-black-on-white').bind('click', changeColourToBlackOnWhite);
$('button#colour-white-on-black').bind('click', changeColourToWhiteOnBlack);
$('select#card-set-selector').bind('change', handleCardSetSelection);

var startingSet = [
    '1','2','3','4','5','6','7','8','9','10',
    '11','12','13','14','15','16','17','18','19','20',
    '21','22','23','24','25','26','27','28','29','30',
    '31','32','33','34','35','36','37','38','39','40',
    '41','42','43','44','45','46','47','48','49','50',
    '51','52','53','54','55','56','57','58','59','60',
    '61','62','63','64','65','66','67','68','69','70',
    '71','72','73','74','75','76','77','78','79','80',
    '81','82','83','84','85','86','87','88','89','90',
    '91','92','93','94','95','96','97','98','99','100'
];
changeColourToBlackOnWhite();