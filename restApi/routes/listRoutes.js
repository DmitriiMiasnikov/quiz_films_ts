const { Router } = require('express');
const fs = require('fs');
const router = Router();
const Animation = require('./../models/Animation');
const Users = require('./../models/Users');
const Manga = require('./../models/Manga');
const Ranobe = require('./../models/Ranobe');

// /list/:page
router.get(
  '/:page',
  async (req, res) => {
    let countInPage = Number(req.query.counter);
    let page = Number(req.params.page) || 1;
    let sort = req.query.sort;
    let filter = req.query.filter;
    let search = req.query.search;
    let userId = Number(req.query.userId) || 0;
    let userFilter = req.query.userFilter;
    let listName = req.query.listName;
    let list;
    let filtersAll;
    let counterAll;
    let user;
    try {
      if (listName === 'animation') {
        filtersAll = {
          'auditory': ['все', 'сёнэн', 'сэйнэн', 'сёдзё', 'дзёсэй', 'кодомо'],
          'genre': [
            'все', 'комедия',
            'повседневность', 'приключения',
            'фантастика', 'мистика',
            'фэнтези', 'драма',
            'спорт', 'романтика',
            'триллер', 'меха',
            'этти', 'детектив',
            'махо-сёдзё', 'боевые искусства',
            'музыкальный', 'ужасы',
            'образовательный'
          ],
          'type': [
            'все', 'полнометражный', 'короткометражный', 'ТВ', 'OVA'
          ],
          'dateStart': null
        }
        let dateToday = new Date();
        let date = [`${dateToday.getFullYear() - 3} - ${dateToday.getFullYear()}`];
        for (let i = dateToday.getFullYear() - 4; i > 1970; i = i - 4) {
          date.push(`${i - 3} - ${i}`);
        }
        filtersAll['dateStart'] = date;
      } else if (listName === 'manga') {
        // const manga = await Manga.find({});
        // const genre = () => {
        //   let genreItems = [];
        //   manga.forEach(el => {
        //     genreItems.push(el.genre);
        //   });
        //   genreItems = genreItems.flat(1)
        //   const unique = (arr) => Array.from(new Set(arr));
        //   return ['все'].concat(unique(genreItems).filter(el => el));
        // }
        // console.log(genre());
        filtersAll = {
          'genre': [
            'все',         'мистика',
            'драма',       'сэйнэн',
            'приключения', 'фантастика',
            'триллер',     'ужасы',
            'эротика',     'романтика',
            'сёнэн',       'комедия',
            'фэнтези',     'боевые искусства',
            'этти',        'повседневность',
            'меха',        'спорт',
            'дзёсэй',      'история',
            'школа',       'сёдзё',
            'детектив',    'сёнэн-ай',
            'яой',         'самурайский боевик',
            'махо-сёдзё',  'сёдзё-ай',
            'юри',         'вампиры',
            'пародия',     'мистерия',
            'музыкальный'
          ],
          'date': null
        }
        let dateToday = new Date();
        let date = [`${dateToday.getFullYear() - 3} - ${dateToday.getFullYear()}`];
        for (let i = dateToday.getFullYear() - 4; i > 1970; i = i - 4) {
          date.push(`${i - 3} - ${i}`);
        }
        filtersAll['date'] = date;
      } else if (listName === 'ranobe') {
        filtersAll = {
          'language': [
            'все',
            'Китайский',
            'Японский',
            'Корейский',
            'Английский',
          ],
          'genre': ['все', 'Xuanhuan', 'Боевые Искусства',
            'Приключения', 'Фэнтези', 'Экшн',
            'Драма', 'Романтика', 'Josei',
            'Xianxia', 'История', 'Комедия',
            'Sci-fi', 'Научная Фантастика',
            'Триллер', 'Трагедия', 'Shoujo',
            'Истории из жизни', 'Школьная жизнь', 'Спорт',
            'Mature', 'Wuxia', 'Исторический',
            'Психология', 'Сёнэн', 'Yaoi',
            'Меха', 'Гарем',
            'Мистика', 'Сверхъеетественное', 'Сэйнэн',
            'Хоррор', 'Повседневность', 'Ecchi',
            'Детектив', 'Этти', 'Игра', 'Сюаньхуа', 'Шоунен', 'Adult',
            'Постапокалипсис',
            'Не указано', 'Lolicon',
            'Виртуальный Мир']
        }
      }

      if (userId) {
        user = await Users.findOne({ userId: userId });
      }
      // фильтр, сортировка и поиск сразу
      let currentFilter;
      let noFilters;
      Object.keys(filtersAll).forEach(el => {
        if (filtersAll[el].includes(filter)) {
          currentFilter = el;
          noFilters = false;
        }
      })
      if (filter === 'все') {
        currentFilter = 'genre';
        noFilters = true;
      }

      let currentSort;
      switch (sort) {
        case ('name'): { }
        case ('name_reverse'): {
          currentSort = 'nameRu';
          break;
        }
        case ('date'): { }
        case ('date_reverse'): {
          currentSort = 'dateStart';
          break;
        }
        default: currentSort = sort ;break;
      }
      if (listName === 'animation') {
        list = await Animation.find({
          $and: [
            { animationId: userId ? { $in: user.animation[userFilter] } : { $type: 'number' } },
            {
              $or: [
                { [currentFilter]: noFilters ? { $in: filtersAll[currentFilter] } : filter },
                { [currentFilter]: { $regex: filter, $options: 'i' } },
                { [currentFilter]: { $lte: filter.split(' - ')[1], $gte: filter.split(' - ')[0] } }
              ]
            },
            {
              $or: [{ nameRu: { $regex: search, $options: 'i' } },
              { nameEng: { $regex: search, $options: 'i' } },
              { nameRom: { $regex: search, $options: 'i' } },
              { author: { $regex: search, $options: 'i' } }]
            }
          ]
        })
          .sort({ [currentSort]: sort.split('_').length === 2 ? -1 : 1 })
          .skip(countInPage * page - (countInPage))
          .limit(countInPage);
        counterAll = await Animation.find({
          $and: [
            { animationId: userId ? { $in: user.animation[userFilter] } : { $type: 'number' } },
            {
              $or: [
                { [currentFilter]: noFilters ? { $in: filtersAll[currentFilter] } : filter },
                { [currentFilter]: { $regex: filter, $options: 'i' } },
                { [currentFilter]: { $lte: filter.split(' - ')[1], $gte: filter.split(' - ')[0] } }
              ]
            },
            {
              $or: [{ nameRu: { $regex: search, $options: 'i' } },
              { nameEng: { $regex: search, $options: 'i' } },
              { nameRom: { $regex: search, $options: 'i' } },
              { author: { $regex: search, $options: 'i' } }]
            }
          ]
        }).countDocuments({}, {
          skip: countInPage * page - (countInPage),
          limit: countInPage
        })
      } else if (listName === 'manga') {
        list = await Manga.find({
          $and: [
            { mangaId: userId ? { $in: user[listName][userFilter] } : { $type: 'number' } },
            { type: 'манга' },
            {
              $or: [
                { [currentFilter]: noFilters ? { $in: filtersAll[currentFilter] } : filter },
                { [currentFilter]: { $regex: filter, $options: 'i' } },
                { [currentFilter]: { $lte: filter, $gte: filter } }
              ]
            },
            {
              $or: [{ nameRu: { $regex: search, $options: 'i' } },
              { nameEng: { $regex: search, $options: 'i' } },
              { nameRom: { $regex: search, $options: 'i' } },
              { author: { $regex: search, $options: 'i' } }]
            }
          ]
        })
          .sort({ [currentSort]: sort.split('_').length === 2 ? -1 : 1 })
          .skip(countInPage * page - (countInPage))
          .limit(countInPage);
        counterAll = await Manga.find({
          $and: [
            { mangaId: userId ? { $in: user[listName][userFilter] } : { $type: 'number' } },
            { type: 'манга' },
            {
              $or: [
                { [currentFilter]: noFilters ? { $in: filtersAll[currentFilter] } : filter },
                { [currentFilter]: { $regex: filter, $options: 'i' } },
                { [currentFilter]: { $lte: filter.split(' - ')[1], $gte: filter.split(' - ')[0] } }
              ]
            },
            {
              $or: [{ nameRu: { $regex: search, $options: 'i' } },
              { nameEng: { $regex: search, $options: 'i' } },
              { nameRom: { $regex: search, $options: 'i' } },
              { author: { $regex: search, $options: 'i' } }]
            }
          ]
        }).countDocuments({}, {
          skip: countInPage * page - (countInPage),
          limit: countInPage
        })
      } else if (listName === 'ranobe') {
        list = await Ranobe.find({
          $and: [
            { ranobeId: userId ? { $in: user[listName][userFilter] } : { $type: 'number' } },
            {
              $or: [
                { [currentFilter]: noFilters ? { $in: filtersAll[currentFilter] } : filter },
                { [currentFilter]: { $regex: filter, $options: 'i' } },
                { [currentFilter]: { $lte: filter, $gte: filter } }
              ]
            },
            {
              $or: [{ nameRu: { $regex: search, $options: 'i' } },
              { nameEng: { $regex: search, $options: 'i' } },
              { nameRom: { $regex: search, $options: 'i' } },
              { author: { $regex: search, $options: 'i' } }]
            }
          ]
        })
          .sort({ [currentSort]: sort.split('_').length === 2 ? -1 : 1 })
          .skip(countInPage * page - (countInPage))
          .limit(countInPage);
        counterAll = await Ranobe.find({
          $and: [
            { ranobeId: userId ? { $in: user[listName][userFilter] } : { $type: 'number' } },
            {
              $or: [
                { [currentFilter]: noFilters ? { $in: filtersAll[currentFilter] } : filter },
                { [currentFilter]: { $regex: filter, $options: 'i' } },
                { [currentFilter]: { $lte: filter.split(' - ')[1], $gte: filter.split(' - ')[0] } }
              ]
            },
            {
              $or: [{ nameRu: { $regex: search, $options: 'i' } },
              { nameEng: { $regex: search, $options: 'i' } },
              { nameRom: { $regex: search, $options: 'i' } },
              { author: { $regex: search, $options: 'i' } }]
            }
          ]
        }).countDocuments({}, {
          skip: countInPage * page - (countInPage),
          limit: countInPage
        })
      }
      res.status(200).json({ list, page, countInPage, counterAll, filtersAll });
    } catch (e) {
      console.log(e)
    }
  }
)

// получение информации об одном аниме
// /list/id/:id
router.get(
  '/id/:id',
  async (req, res) => {
    try {
      let userId = Number(req.query.userId) || 0;
      let id = Number(req.params.id);
      let listName = req.query.listName;
      // добавляет последние 10 аниме в массив lastViewed[listName]
      const userToUpdate = await Users.findOne({ userId: userId }, 'lastViewed');
      let newLastViewed;
      if (userToUpdate) {
        newLastViewed = userToUpdate.lastViewed;
        if (!newLastViewed[listName].includes(id)) {
          newLastViewed[listName].push(id);
          if (newLastViewed[listName].length > 10) {
            newLastViewed[listName].shift()
          }
        }
        await Users.updateOne({ userId: userId }, { lastViewed: newLastViewed })
      }
      let selectedDescription;
      if (listName === 'animation') {
        selectedDescription = await Animation.findOne({ animationId: id });
      } else if (listName === 'manga') {
        selectedDescription = await Manga.findOne({ mangaId: id });
      } else if (listName === 'ranobe') {
        selectedDescription = await Ranobe.findOne({ ranobeId: id });
      }
      res.status(200).json({ selectedDescription });
    } catch (e) {
      console.log(e)
    }
  }
)

// получить случайное аниме, мангу, ранобе
// /list/randomId/
router.get(
  '/randomItems/id',
  async (req, res) => {
    try {
      let randomItems = {}
      const lastAnimation = await Animation.find({}, 'animationId').countDocuments({});
      const randomAnimationId = Math.floor(Math.random() * lastAnimation) + 1;
      randomItems.animation = await Animation.findOne({}).skip(randomAnimationId).limit(1);;

      const lastManga = await Manga.find({ type: 'манга' }, 'mangaId').countDocuments({});
      const randomMangaId = Math.floor(Math.random() * lastManga) + 1;
      randomItems.manga = await Manga.findOne({ type: 'манга' }).skip(randomMangaId).limit(1);

      const lastRanobe = await Ranobe.find({}, 'ranobeId').countDocuments({});
      const randomRanobeId = Math.floor(Math.random() * lastRanobe) + 1;
      randomItems.ranobe = await Ranobe.findOne({}).skip(randomRanobeId).limit(1);
      res.status(200).json({ randomItems });
    } catch (e) {
      console.log(e)
    }
  }
)

// получить случайную десятку по жанру
// /list/randomId/
router.get(
  '/randomItems/byGenre',
  async (req, res) => {
    try {
      const genres = [
        'комедия',
        'повседневность', 'приключения',
        'фантастика', 'мистика',
        'фэнтези', 'драма',
        'спорт', 'романтика',
        'триллер', 'меха',
        'этти', 'детектив',
        'махо-сёдзё', 'боевые искусства',
        'музыкальный', 'ужасы',
        'образовательный'
      ]
      let animation = {};
      let manga = {};
      let randomGenreAnimation, lastAnimation = 0;
      while (lastAnimation < 10) {
        randomGenreAnimation = genres[Math.floor(Math.random() * genres.length)];
        lastAnimation = await Animation.find({ genre: randomGenreAnimation }, 'animationId').countDocuments({});
      }
      const randomAnimationId = Math.floor(Math.random() * (lastAnimation - 10)) + 1;
      animation[randomGenreAnimation] = await Animation.find({ genre: randomGenreAnimation }).skip(randomAnimationId).limit(10);

      let randomGenreManga, lastManga = 0;
      while (lastManga < 10) {
        randomGenreManga = genres[Math.floor(Math.random() * genres.length)];
        lastManga = await Manga.find({ type: 'манга', genre: randomGenreManga }, 'mangaId').countDocuments({});
      }
      const randomMangaId = Math.floor(Math.random() * (lastManga - 10)) + 1;
      manga[randomGenreManga] = await Manga.find({ type: 'манга', genre: randomGenreManga }).skip(randomMangaId).limit(10);

      res.status(200).json({ animation, manga });
    } catch (e) {
      console.log(e)
    }
  }
)


module.exports = router;