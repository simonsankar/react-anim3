import axios from 'axios';
import cheerio from 'cheerio';
import ent from 'ent';

const nocors = 'https://cors-anywhere.herokuapp.com/';
const baseURL = 'https://9anime.ch';
const fullURL = `${nocors}${baseURL}`;
const ajax = '/ajax/film/search?sort=year%3Adesc&keyword=';

const Anime = {
  async getAnimes(endpoint) {
    // Load page data
    const { data } = await axios.get(`${fullURL}${endpoint}`);
    //Cheerio cursor
    const $ = cheerio.load(data);
    //List containing animes
    const list = $('div.film-list');

    //Animes
    const items = $('div.item', list)
      .map((index, el) => {
        const element = $('div.inner', el);

        const a = $('a.poster', element);
        const url = a.attr('href');
        const datatip = a.attr('data-tip');
        const img = $('img', el).attr('src');

        const status = $('div.status', a);
        const ep = $('div.ep', status).html();
        const dub = $('div.dub', status).html();
        const ova = $('div.ova', status).html();
        const ona = $('div.ona', status).html();
        const special = $('div.special', status).html();
        const movie = $('div.movie', status).html();
        const preview = $('div.preview', status).html();

        const title = ent.decode($('a.name', element).html());
        return {
          title,
          url,
          img,
          status: {
            ep,
            dub,
            ova,
            ona,
            special,
            movie,
            preview
          },
          datatip
        };
      })
      .get();

    return items;
  },

  async getAnimeDetails(addr) {
    if (addr === 'ajax/film/tooltip/3509?5a4f40a1')
      return {
        title: 'Cursed...',
        status: {
          ep: null,
          dub: 'Stupid',
          movie: 'Movie'
        },
        desc:
          "This anime movie, indonesian crap is cursed...\nI had to hard code this just to deal with its nonsense. You can still watch it of course, its link to its details is just cursed, no logical explanation. \nDoubt you'd care though.",
        meta: null
      };

    const { data } = await axios.get(`${fullURL}/${addr}`);
    const $ = cheerio.load(data);

    const epi = $('div.ep').html();
    let ep;
    if (epi === undefined) ep = false;
    else ep = epi;
    const title = ent.decode($('h1').html());
    const dub = $('div.dub').html();
    const ova = $('div.ova').html();
    const ona = $('div.ona').html();
    const special = $('div.special').html();
    const preview = $('div.preview').html();
    const movie = $('div.movie').html();

    const desc = ent.decode($('p.desc').html());

    const meta = $('div.meta')
      .map((index, el) => {
        if (index !== 4) {
          const label = $('label', el).html();
          const value = ent.decode(
            $('span', el)
              .html()
              .trim()
          );
          return {
            label,
            value
          };
        } else {
          //Genre links
          const genres = $('a', el)
            .map((index, el) => {
              const name = $(el).attr('title');
              const url = $(el).attr('href');
              return {
                name,
                url
              };
            })
            .get();
          return { genres };
        }
      })
      .get();
    const details = {
      title,
      status: {
        ep,
        dub,
        ona,
        ova,
        special,
        movie,
        preview
      },
      desc,
      meta
    };
    console.log('Anime response details:\n', details);
    return details;
  },

  //Get genres
  async getGenres() {
    const { data } = await axios.get(`${fullURL}`);
    const $ = cheerio.load(data);

    const body = $('.genres');
    const list = $('ul', body);
    const genres = $('li', list)
      .map((index, el) => {
        const a = $('a', el);
        const name = $(a).attr('title');
        const url = $(a).attr('href');
        return {
          name,
          url
        };
      })
      .get();
    console.log('Genres:', genres);
    return genres;
  },

  //Get suggestions from search
  async getSuggestions(keyword) {
    const { data } = await axios.get(`${fullURL}${ajax}${keyword}`);
    console.log(data);
    return data;
  }
};

export default Anime;
