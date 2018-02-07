import axios from 'axios';
import cheerio from 'cheerio';
import ent from 'ent';

const nocors = 'https://secret-ocean-49799.herokuapp.com/';
const baseURL = 'https://9anime.is';
const fullURL = `${nocors}${baseURL}`;
const episode = '/ajax/episode/info?';
const search = '/ajax/film/search?sort=year%3Adesc&keyword=';
const minimal = '/search?keyword=qw1'; // Requests a page with no animes (smaller data)

const Anime = {
  // Dynamic, genreal purpose
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
  async getQuickListsAnimes() {
    const { data } = await axios.get(fullURL);
    const $ = cheerio.load(data);

    const hotnew = $('div.widget.hotnew.has-page');
    const quickLists = $('div[data-name]', hotnew)
      .map((index, el) => {
        const pages = $('div.page', el)
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
        return { pages };
      })
      .get();
    return quickLists;
  },
  // Featured anime
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
  // Top Anime (Daily/Week/Monthly/) TO BE IMPLEMENTED
  async getTopAnime() {
    const { data } = await axios.get(`${fullURL}${minimal}`);
    const $ = cheerio.load(data);

    const ranking = $('div.widget.ranking');
    const body = $('div.widget-body', ranking);
    const days = $(`div.content[data-name]`, body)
      .map((index, day) => {
        const itemTop = $('div.item-top', day);
        const aTop = $('a.thumb', itemTop);
        const detailTop = $('div.detail', itemTop);
        const infTop = $('div.info', detailTop);
        const top = {
          rank: $('i', detailTop).text(),
          url: $(aTop)
            .attr('href')
            .slice(17),
          img: $('img', aTop).attr('src'),
          title: $('a', infTop).text()
        };

        const rest = $('div.item', day)
          .map((index, el) => {
            const rank = $('i', el).text();
            const url = $('a.thumb', el)
              .attr('href')
              .slice(17);
            const a = $('a.thumb', el);
            const img = $('img', a).attr('src');
            const datatip = a.attr('data-tip');
            const info = $('div.info', el);
            const title = $('a.name', info).text();

            return {
              rank,
              url,
              datatip,
              title,
              img
            };
          })
          .get();
        return {
          top,
          rest
        };
      })
      .get();
    return days;
  },
  // Total pages
  async getTotalPages(endpoint) {
    const { data } = await axios.get(`${fullURL}${endpoint}`);
    const $ = cheerio.load(data);

    const pageWrapper = $('div.paging-wrapper');
    const form = $('form', pageWrapper);
    const total = $('span.total', form).text();
    return total;
  },
  // Anime details
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

    const player = $('div.widget.player');
    const title = ent.decode($('h1.title', player).text());
    const cover = $('div.cover', player)
      .attr('style')
      .slice(23)
      .slice(0, -2);

    const info = $('div.widget.info');
    const alias = ent.decode($('p.alias', info).text());
    const desc = ent.decode($('div.desc', info).text());
    const img = $('img', info).attr('src');

    return {
      title,
      alias,
      desc,
      cover,
      img
    };
  },

  //Get genres
  async getGenres() {
    const { data } = await axios.get(`${fullURL}${minimal}`);
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
  async getSuggestions(keyword) {
    const { data } = await axios.get(`${fullURL}${search}${keyword}`);
    const $ = cheerio.load(data.html);
    const items = $('div.item')
      .map((index, el) => {
        const img = $('img.thumb', el).attr('src');
        const info = $('div.info', el);
        const url = $('a.name', info).attr('href');
        const title = $('a.name', info).text();
        const status = ent.decode($('p', info).text());

        return {
          title,
          img,
          status,
          url
        };
      })
      .get();
    return items;
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
  async getFilterOptions() {
    const { data } = await axios.get(`${fullURL}${minimal}`);
    const $ = cheerio.load(data);

    const main = $('div#main');
    const form = $('form.filters', main);

    const filters = $('div.filter.dropdown', form)
      .map((index, el) => {
        const title = $('button', el)
          .clone() //clone the element
          .children() //select all the children
          .remove() //remove all the children
          .end() //again go back to selected element
          .text()
          .trim();
        const items = $('li', el)
          .map((index, el) => {
            const text = $('label', el).text();
            const name = $('input', el).attr('name');
            const value = $('input', el).attr('value');
            const key = $('input', el).attr('id');
            return {
              text,
              key,
              value,
              name
            };
          })
          .get();
        return { title, items };
      })
      .get();
    return filters;
  }
};

export default Anime;
