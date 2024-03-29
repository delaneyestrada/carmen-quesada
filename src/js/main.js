import '../css/main.scss';
import { googleApiKey } from './config';
import Modal from 'bootstrap/js/dist/modal';


document.addEventListener('DOMContentLoaded', function () {
  const storage = window.sessionStorage;

  const getYouTubeVideos = async (playlistId, apiKey, numResults) => {
    var url = new URL('https://www.googleapis.com/youtube/v3/playlistItems'),
      params = {
        key: apiKey,
        part: 'snippet',
        playlistId: playlistId,
        maxResults: 10,
      };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key]),
    );

    const response = await fetch(url);
    const data = await response.json();
    const videos = await data.items;

    return videos;
  };

  const buildYouTubeSplide = (playlistId, apiKey, numResults) => {
    getYouTubeVideos(playlistId, apiKey, numResults)
      .then((data) => {
        console.log(data);
        data.forEach((video) => {
          var thumbnail = video.snippet.thumbnails.high.url;

          if ('standard' in video.snippet.thumbnails) {
            thumbnail = video.snippet.thumbnails.standard.url;
          }
          if (
            'maxres' in video.snippet.thumbnails &&
            window.innerWidth > 1000
          ) {
            thumbnail = video.snippet.thumbnails.maxres.url;
          }
          var videoId = video.snippet.resourceId.videoId;
          var videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
          var youtubeSplide = document.querySelector('.youtube .splide__list');

          var slide = document.createElement('div');
          slide.classList.add('splide__slide');
          slide.setAttribute('data-splide-youtube', videoUrl);

          var thumbnailEl = document.createElement('img');
          thumbnailEl.setAttribute('src', thumbnail);

          slide.appendChild(thumbnailEl);
          youtubeSplide.appendChild(slide);
        });
      })
      .then(() => {
        new Splide('#video-splide', {
          type: 'loop',
          perPage: 1,
          fixedWidth: '100%',
          focus: 'center',
          heightRatio: 0.5625,
          video: {
            loop: true,
          },
        }).mount(window.splide.Extensions);
      });
  };

  const switchLanguage = (lang) => {
    const languages = {
      'en-US': 'es-MX',
      'es-MX': 'en-US',
    };
    let show = document.querySelectorAll(`[lang=${lang}]`);
    let hide = document.querySelectorAll(`[lang=${languages[lang]}]`);
    console.log(show);
    console.log(hide);
    show.forEach((el) => {
      el.classList.remove('hide-lang');
    });
    hide.forEach((el) => {
      el.classList.add('hide-lang');
    });
  };

  if (storage.getItem('lang') != null) {
    switchLanguage(storage.getItem('lang'));
  }

  document.getElementById('content').classList.remove('hide');
  document.getElementById('spinner-container').classList.add('hide');

  const langSelectors = document.querySelectorAll('.lang-select');
  langSelectors.forEach((selector) => {
    selector.addEventListener('click', (e) => {
      let lang = e.target.dataset.lang;
      switchLanguage(lang);
      storage.setItem('lang', lang);
    });
  });
  if (
    window.location.pathname.split('/')[1] == 'media' ||
    window.location.pathname.split('/')[1] == 'media.html'
  ) {
    buildYouTubeSplide('PLeletbHqm_D6fHNkgn9Y9YQcUMxITAx1a', googleApiKey, 10);
  } else if (
    window.location.pathname.split('/')[1] == 'student-gallery' ||
    window.location.pathname.split('/')[1] == 'student-gallery.html'
  ) {
    buildYouTubeSplide('PLeletbHqm_D4bDsVuQsLMEvY2J-yX0UGV', googleApiKey, 20);
    new Splide('#photo-splide', {
      type: 'loop',
      perPage: 3,
      autoWidth: true,
      autoplay: true,
      interval: 3000,
      pauseOnHover: true,
      focus: 'center',
      gap: '1em',
      breakpoints: {
        870: {
          perPage: 2,
        },
        500: {
          perPage: 1,
        },
      },
    }).mount(window.Splide.Extensions);

    if(window.innerWidth > 500) {
    const slides = document.querySelectorAll('.splide__slide')
    slides.forEach(slide => {
      const delta = 6;
      let startX;
      let startY;

      slide.addEventListener('mousedown', (e) => {
        startX = e.pageX;
        startY = e.pageY;
      })
      slide.addEventListener('mouseup', (e) => {
        const diffX = Math.abs(e.pageX - startX);
        const diffY = Math.abs(e.pageY - startY);
        console.log(e.pageX, startX)
        console.log(e.pageY, startY)
        if (diffX < delta && diffY < delta) {
          let src = e.target.getAttribute('src')
          document.querySelector('#modal-image').setAttribute('src', src);
          var myModal = new Modal(document.getElementById('myModal'), {})
          myModal.show();
        }
      })
    })
  }
  } 
});
