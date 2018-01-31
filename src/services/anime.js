import axios from 'axios';
import cheerio from 'cheerio';
import ent from 'ent';

const nocors = 'https://cors-anywhere.herokuapp.com/';
const baseURL = 'https://9anime.ch';
const fullURL = `${nocors}${baseURL}`;
const search = '/ajax/film/search?sort=year%3Adesc&keyword=';
const episode = '/ajax/episode/info?';

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

        const title = ent.decode($('a.name', element).text());
        const a = $('a.poster', element);
        const url = a.attr('href').slice(17); //Just the /watch/<anime>
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

  // Trending anime
  async getTrendingAnimes() {
    const { data } = await axios.get(fullURL);
    const $ = cheerio.load(data);

    const hotnew = $('div.widget.hotnew.has-page');
    const trending = $('div[data-name="trending"]', hotnew);
    const pages = $('div.page', trending)
      .map((index, el) => {
        const list = $('div.film-list', el);

        const items = $('div.item', list)
          .map((index, el) => {
            const element = $('div.inner', el);
            const title = ent.decode($('a.name', element).text());
            const a = $('a.poster', element);
            const url = a.attr('href').slice(17); //Just the /watch/<anime>
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
      })
      .get();
    // console.log(pages);
    return pages;
  },

  async getAnimeDetails(addr) {
    const { data } = await axios.get(`${fullURL}/${addr}`);
    const $ = cheerio.load(data);

    const title = ent.decode($('h1').text());
    const url = $('a.watch-now').attr('href');

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

  // Get watching/current anime details
  async getCurrentAnimeDetails(url) {
    const { data } = await axios.get(`${fullURL}${url}`);
    const $ = cheerio.load(data);

    const title = ent.decode($('h1.title').text());
    const alias = ent.decode($('p.alias').text());
    const desc = ent.decode($('div.desc').text());

    return {
      title,
      alias,
      desc
    };
  },

  async getFeaturedAnimes() {
    const { data } = await axios.get(`${fullURL}`);
    const $ = cheerio.load(data);

    const wrapper = $('div.items.swiper-wrapper');
    const items = $('div.item', wrapper)
      .map((index, el) => {
        const image = $(el)
          .attr('style')
          .slice(22)
          .slice(0, -1);
        const info = $('div.info', el);
        const title = $('a.name', info).text();
        const url = $('a.name', info)
          .attr('href')
          .slice(17);
        const desc = $('p', info).text();

        return {
          title,
          desc,
          url,
          image
        };
      })
      .get();
    return items;
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

  // Get episode lists
  async getEpisodesList(url) {
    const { data } = await axios.get(`${fullURL}${url}`);
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

        // Map over episode range(s)
        const episodeRanges = $('ul.episodes', el)
          .map((index, el) => {
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
    return serverList;
  },

  // Get video
  async getVideo(vid, server) {
    const query = `id=${vid}&server=${server}`;
    const { data } = await axios.get(`${fullURL}${episode}${query}`);
    return data.target;
  },

  //Get suggestions from search
  async getSuggestions(keyword) {
    const { data } = await axios.get(`${fullURL}${search}${keyword}`);
    console.log(data);
    return data;
  }
};

Anime.getSuggestions('ki');
export default Anime;
