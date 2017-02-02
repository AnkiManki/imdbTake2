let moviesContainer = $('#myTable');

let addMoviesToTable = function (movies, moviesContainer) {
    moviesContainer.append(`<tr>
            <td>${movies.rank}</td>
            <td>${movies.title}</td>
            <td>${movies.year}</td>
            <td>${movies.rating}</td>
            <td><a href="http://www.imdb.com${movies.link}"><img src="${movies.poster}"/></a></td>
        </tr>`);
};

let pageSize = 20;
let pageNumber = 1;
let movies = [];
let filterMovies = [];

let titleAz = false;

let removeRows = function (moviesContainer) {
    moviesContainer.html('');
}

let displayPage = function (pageNumber, pageSize, movies, moviesContainer) {
    removeRows(moviesContainer);
    let startIndex = (pageNumber - 1) * pageSize;
    let endIndex = pageNumber * pageSize;
    let displayMovies = movies.slice(startIndex, endIndex)
    displayMovies.forEach(b => addMoviesToTable(b, moviesContainer))
    $('#text').text(`Page ${pageNumber} of 13`)
}

$(() => {
    $("#previous").on('click', () => {
        if (pageNumber > 1) {
            pageNumber -= 1;
        }
        displayPage(pageNumber, pageSize, filterMovies, moviesContainer);
    })

    $("#next").on('click', () => {
        let maxPageNumber = (movies.length / pageSize | 0) + 1;
        if (pageNumber < maxPageNumber) {
            pageNumber += 1;
        }
        displayPage(pageNumber, pageSize, filterMovies, moviesContainer);
    })

    $("#searchItem").on('keyup', () => {
        let searchItem = $("#searchItem").val();
        if (!searchItem)
            return;
        searchItem = searchItem.toLowerCase();

        filterMovies = movies.filter(b => {
            if (b.title.toLowerCase().indexOf(searchItem) !== -1)
                return true;
            if (b.year.toLowerCase().indexOf(searchItem) !== -1)
                return true;
            return false;
        })
        pageNumber = 1;
        displayPage(pageNumber, pageSize, filterMovies, moviesContainer);
    })

    $('#title').on('click', () => {
        if (!titleAz) {
            titleAz = true;
            movies.sort(function (a, b) {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return a.title[1] - b.title[1];
            });
        } else {
            titleAz = false;
            movies.sort(function (a, b) {
                if (a.title < b.title) return 1;
                if (a.title > b.title) return -1;
                return a.title[1] - b.title[1];
            });
        }
        displayPage(pageNumber, pageSize, filterMovies, moviesContainer);
    })

    $('#year').on('click', () => {
        if (!titleAz) {
            titleAz = true;
            movies.sort(function (a, b) {
                if (a.year < b.year) return -1;
                if (a.year > b.year) return 1;
                return a.year[1] - b.year[1];
            });
        } else {
            titleAz = false;
            movies.sort(function (a, b) {
                if (a.year < b.year) return 1;
                if (a.year > b.year) return -1;
                return a.year[1] - b.year[1];
            });
        }
        displayPage(pageNumber, pageSize, filterMovies, moviesContainer);
    })

    $('#rating').on('click', () => {
        if (!titleAz) {
            titleAz = true;
            movies.sort(function (a, b) {
                return a.rating - b.rating
            });
        } else {
            titleAz = false;
            movies.sort(function (a, b) {
                return b.rating - a.rating
            });
        }
        displayPage(pageNumber, pageSize, filterMovies, moviesContainer);
    })

    $('#rank').on('click', () => {
        if (!titleAz) {
            titleAz = true;
            movies.sort(function (a, b) {
                return a.rank - b.rank;
            });
        } else {
            titleAz = false;
            movies.sort(function (a, b) {
                return b.rank - a.rank;
            });
        }
        displayPage(pageNumber, pageSize, filterMovies, moviesContainer);
    })


    $.ajax('https://raw.githubusercontent.com/VampDude/JsonTest/master/json', {
        complete: (data) => {
            let result = JSON.parse(data.responseText);
            movies = result;
            filterMovies = movies;
            displayPage(pageNumber, pageSize, filterMovies, moviesContainer);
        }
    });
})
