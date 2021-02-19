
type Question = {
  options: string[],
  currect: string,
  src: string
}

type InitialStates = {
  list: Array<{
    name: string,
    en: string,
    ru: string,
    type: string,
    src: string,
    questions: Array<Question>
  }>
}

const initialStates: InitialStates = {
  list: [
    {
      "name": "top_250_films",
      "en": "top 250 films",
      "ru": "250 лучших фильмов",
      "type": "films",
      "src": "https://st.kp.yandex.net/im/kadr/3/1/1/kinopoisk.ru-Vikings-3111254.jpg",
      "questions": [
        {
          "options": ["vikings", "some other", "some else", "some more"
          ],
          "currect": "vikings",
          "src": "https://st.kp.yandex.net/im/kadr/3/1/1/kinopoisk.ru-Vikings-3111254.jpg"
        },
        {
          "options": ["vikings", "gfhasfsd", "dfcaasd", "sss"
          ],
          "currect": "vikings",
          "src": "https://st.kp.yandex.net/im/kadr/3/1/1/kinopoisk.ru-Vikings-3111254.jpg"
        }
      ]
    },
    {
      "name": "science_fiction_series",
      "en": "science fiction series",
      "ru": "фантастические сериалы",
      "type": "serials",
      "src": "https://st.kp.yandex.net/im/kadr/2/8/9/kinopoisk.ru-The-Expanse-2891914.jpg",
      "questions": [
        {
          "options": ["Sliders", "Quantum Leap", "Parallels", "Back to the Future"
          ],
          "currect": "Sliders",
          "src": "https://st.kp.yandex.net/im/kadr/6/7/6/kinopoisk.ru-Sliders-676983.jpg"
        },
        {
          "options": ["Firefly", "Farscape", "Dark Matter", "Lexx"
          ],
          "currect": "Firefly",
          "src": "https://st.kp.yandex.net/im/kadr/2/8/7/kinopoisk.ru-Firefly-2872332.jpg"
        },
        {
          "options": ["Doctor Who", "Torchwood", "Sherlock", "The Hitchhiker\"s Guide to the Galaxy"
          ],
          "currect": "Doctor Who",
          "src": "https://st.kp.yandex.net/im/kadr/2/6/8/kinopoisk.ru-Doctor-Who-2682251.jpg"
        },
        {
          "options": ["The X Files", "Fringe", "Supernatural", "Twin Peaks"
          ],
          "currect": "The X Files",
          "src": "https://st.kp.yandex.net/im/kadr/3/1/2/kinopoisk.ru-The-X-Files-3123768.jpg"
        },
        {
          "options": ["Lost", "The Maze Runner", "Heroes", "The Walking Dead"
          ],
          "currect": "Lost",
          "src": "https://st.kp.yandex.net/im/kadr/1/4/1/kinopoisk.ru-Lost-1417327.jpg"
        },
        {
          "options": ["Stargate SG-1", "Farscape", "Battlestar Galactica", "Sliders"
          ],
          "currect": "Stargate SG-1",
          "src": "https://st.kp.yandex.net/im/kadr/1/2/3/kinopoisk.ru-Stargate-SG-1-1238520.jpg"
        },
        {
          "options": ["Babylon 5", "Enterprise", "Battlestar Galactica", "Andromeda"
          ],
          "currect": "Babylon 5",
          "src": "https://st.kp.yandex.net/im/kadr/2/9/8/kinopoisk.ru-Babylon-5-2981646.jpg"
        },
        {
          "options": ["Sense8", "Cloud Atlas", "Orphan Black", "Heroes"
          ],
          "currect": "Sense8",
          "src": "https://st.kp.yandex.net/im/kadr/3/2/1/kinopoisk.ru-Sense8-3216842.jpg"
        },
        {
          "options": ["Battlestar Galactica", "Caprica", "The 100", "The Expanse"
          ],
          "currect": "Battlestar Galactica",
          "src": "https://st.kp.yandex.net/im/kadr/2/0/9/kinopoisk.ru-Battlestar-Galactica-2094426.jpg"
        },
        {
          "options": ["The Expanse", "Altered Carbon", "Dark Matter", "Firefly"
          ],
          "currect": "The Expanse",
          "src": "https://st.kp.yandex.net/im/kadr/2/6/9/kinopoisk.ru-The-Expanse-2694897.jpg"
        }
      ]
    },
    {
      "name": "films_about_space",
      "en": "films about space",
      "ru": "фильмы о космосе",
      "type": "films",
      "src": "https://st.kp.yandex.net/im/kadr/2/5/2/kinopoisk.ru-Interstellar-2529850.jpg",
      "questions": [
        {
          "options": ["Interstellar", "Gravity", "2001: A Space Odyssey", "Inception"
          ],
          "currect": "Interstellar",
          "src": "https://st.kp.yandex.net/im/kadr/2/5/2/kinopoisk.ru-Interstellar-2529850.jpg"
        },
        {
          "options": ["Alien", "Prometheus", "Pandorum", "The Thing"
          ],
          "currect": "Alien",
          "src": "https://st.kp.yandex.net/im/kadr/1/4/6/kinopoisk.ru-Alien-1460112.jpg"
        },
        {
          "options": ["Men in Black", "R.I.P.D.", "Paul", "Kingsman: The Secret Service"
          ],
          "currect": "Men in Black",
          "src": "https://st.kp.yandex.net/im/kadr/2/2/8/kinopoisk.ru-Men-in-Black-2287646.jpg"
        },
        {
          "options": ["Star Wars", "Star Trek", "John Carter", "Starship Troopers"
          ],
          "currect": "Star Wars",
          "src": "https://st.kp.yandex.net/im/kadr/2/6/9/kinopoisk.ru-Star-Wars_3A-Episode-I-The-Phantom-Menace-2696786.jpg"
        },
        {
          "options": ["Armageddon", "2012", "Sunshine", "Independence Day"
          ],
          "currect": "Armageddon",
          "src": "https://st.kp.yandex.net/im/kadr/1/6/9/kinopoisk.ru-Armageddon-1691090.jpg"
        },
        {
          "options": ["Star Trek", "Serenity", "Star Wars", "Guardians of the Galaxy"
          ],
          "currect": "Star Trek",
          "src": "https://st.kp.yandex.net/im/kadr/9/4/1/kinopoisk.ru-Star-Trek-941351.jpg"
        },
        {
          "options": ["Guardians of the Galaxy", "Jupiter Ascending", "Suicide Squad", "The Chronicles of Riddick"
          ],
          "currect": "Guardians of the Galaxy",
          "src": "https://st.kp.yandex.net/im/kadr/2/4/8/kinopoisk.ru-Guardians-of-the-Galaxy-2485197.jpg"
        },
        {
          "options": ["The Martian", "Gravity", "Moon", "Apollo 13"
          ],
          "currect": "The Martian",
          "src": "https://st.kp.yandex.net/im/kadr/3/1/1/kinopoisk.ru-The-Martian-3116438.jpg"
        },
        {
          "options": ["Starship Troopers", "Ender\"s Game", "District 9", "Edge of Tomorrow"
          ],
          "currect": "Starship Troopers",
          "src": "https://st.kp.yandex.net/im/kadr/1/7/4/kinopoisk.ru-Starship-Troopers-1745529.jpg"
        },
        {
          "options": ["Gravity", "Ad Astra", "Mission to Mars", "First Man"
          ],
          "currect": "Gravity",
          "src": "https://st.kp.yandex.net/im/kadr/2/2/4/kinopoisk.ru-Gravity-2242503.jpg"
        }
      ]
    },
    {
      "name": "disaster_films",
      "en": "disaster films",
      "ru": "фильмы катастрофы",
      "type": "films",
      "src": "https://st.kp.yandex.net/im/kadr/4/1/0/kinopoisk.ru-The-Day-After-Tomorrow-41064.jpg",
      "questions": [
        {
          "options": ["The Day After Tomorrow", "2012", "The Happening", "San Andreas"
          ],
          "currect": "The Day After Tomorrow",
          "src": "https://st.kp.yandex.net/im/kadr/1/0/8/kinopoisk.ru-The-Day-After-Tomorrow-1089478.jpg"
        },
        {
          "options": ["Independence Day", "District 9", "War of the Worlds", "Oblivion"
          ],
          "currect": "Independence Day",
          "src": "https://st.kp.yandex.net/im/kadr/1/7/3/kinopoisk.ru-Independence-Day-1730004.jpg"
        },
        {
          "options": ["K-19: The Widowmaker", "U-571", "Crimson Tide", "In Enemy Hands"
          ],
          "currect": "K-19: The Widowmaker",
          "src": "https://st.kp.yandex.net/im/kadr/1/6/6/kinopoisk.ru-K-19_3A-The-Widowmaker-1662057.jpg"
        },
        {
          "options": ["The Perfect Storm", "The Finest Hours", "In the Heart of the Sea", "Poseidon"
          ],
          "currect": "The Perfect Storm",
          "src": "https://st.kp.yandex.net/im/kadr/1/7/3/kinopoisk.ru-The-Perfect-Storm-1732556.jpg"
        },
        {
          "options": ["Titanic", "The Notebook", "Water for Elephants", "Poseidon"
          ],
          "currect": "Titanic",
          "src": "https://st.kp.yandex.net/im/kadr/1/9/6/kinopoisk.ru-Titanic-1965725.jpg"
        },
        {
          "options": ["Sunshine", "Moon", "Event Horizon", "Prometheus"
          ],
          "currect": "Sunshine",
          "src": "https://st.kp.yandex.net/im/kadr/4/9/8/kinopoisk.ru-Sunshine-498517.jpg"
        },
        {
          "options": ["War of the Worlds", "Skyline", "The Mist", "The Day the Earth Stood Still"
          ],
          "currect": "War of the Worlds",
          "src": "https://st.kp.yandex.net/im/kadr/2/2/6/kinopoisk.ru-War-of-the-Worlds-226851.jpg"
        },
        {
          "options": ["Cloverfield", "Chronicle", "Pacific Rim", "Godzilla"
          ],
          "currect": "Cloverfield",
          "src": "https://st.kp.yandex.net/im/kadr/6/8/6/kinopoisk.ru-Cloverfield-686638.jpg"
        },
        {
          "options": ["Knowing", "The Happening", "Signs", "Next"
          ],
          "currect": "Knowing",
          "src": "https://st.kp.yandex.net/im/kadr/8/6/9/kinopoisk.ru-Knowing-869591.jpg"
        }
      ]
    }
  ]
}

export const listReducer = (state = initialStates, action: any) => {
  switch (action.type) {
    case ('asd'): {
      return { ...state }
    }
    default: break;
  }
  return state
}