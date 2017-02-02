let container = $('.lister-list tr');
let movies = [];

container.each(function () {
    let rank = $(this).find('.titleColumn').text().trim().split(".")[0];
    let title = $(this).find('.titleColumn').find('a').text();
    let year = $(this).find('.titleColumn').find('span').text();
    let rating = $(this).find('.ratingColumn').find('strong').text();
    let poster = $(this).find('.posterColumn').find('img').attr('src');
    let link = $(this).find('.posterColumn').find('a').attr('href');

    if (title) movies.push({
        rank,
        title,
        year,
        rating,
        poster,
        link
    })
});
