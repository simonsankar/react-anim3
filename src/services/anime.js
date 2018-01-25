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
        const ep = $('div.ep', status).text();
        const dub = $('div.dub', status).text();
        const ova = $('div.ova', status).text();
        const ona = $('div.ona', status).text();
        const special = $('div.special', status).text();
        const movie = $('div.movie', status).text();
        const preview = $('div.preview', status).text();

        const title = ent.decode($('a.name', element).text());
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
    const { data } = await axios.get(`${fullURL}/${addr}`);
    const $ = cheerio.load(data);

    const title = ent.decode($('h1').text());
    const url = baseURL + $('a.watch-now').attr('href');

    const subhead = $('div.subhead');
    const ep = $('div.ep', subhead).text();
    const dub = $('div.dub', subhead).text();
    const ova = $('div.ova', subhead).text();
    const ona = $('div.ona', subhead).text();
    const special = $('div.special', subhead).text();
    const preview = $('div.preview', subhead).text();
    const movie = $('div.movie', subhead).text();

    const desc = ent.decode($('p.desc').text());

    const meta = $('div.meta')
      .map((index, el) => {
        if (index !== 4) {
          const label = $('label', el).text();
          const value = ent.decode(
            $('span', el)
              .text()
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
      url,
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
    return genres;
  },

  async getEpisodesList(url) {
    const { data } = await axios.get(`${nocors}${url}`);
    const $ = cheerio.load(data);

    const servers = $('div.servers');
    const serversBody = $('div.widget-body', servers);

    const serverList = $('div.server', serversBody)
      // Map over servers
      .map((index, el) => {
        const server = $(el).attr('data-id'); // Server ID

        //Check for ranges
        const range = $('div.range', el);
        // Ranges ? Map over : empty array
        const ranges = $('span', range)
          .map((index, el) => {
            const rangeID = $(el).attr('data-range-id');
            const rangeText = $(el).text();
            return {
              rangeID,
              rangeText
            };
          })
          .get();

        // Map over episode list(s)
        const episodeRanges = $('ul.episodes', el)
          .map((index, el) => {
            console.log('ranged #', index);
            const episodes = $('li', el)
              .map((index, el) => {
                const episodeID = $('a', el).attr('data-id');
                const episodeNum = $('a', el).text();
                return {
                  episodeID,
                  episodeNum
                };
              })
              .get();
            return {
              episodes
            };
          })
          .get();

        return {
          server,
          ranges,
          episodeRanges
        };
      })
      .get();
    console.log(serverList);
  },

  //Get suggestions from search
  async getSuggestions(keyword) {
    const { data } = await axios.get(`${fullURL}${ajax}${keyword}`);
    console.log(data);
    return data;
  }
};

Anime.getEpisodesList('https://9anime.ch/watch/bleach.6j9');

export default Anime;
