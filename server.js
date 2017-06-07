const express = require('express');
const Promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: Promise
});
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const cors = require('cors');
const config = require('./config');
const db = pgp(config);
const unirest = require('unirest');
const API_KEY = 'j1p2aYOGhrmshKNdsy6zUADm0IORp1RpoQZjsnEWbgWpbiYahJ';

const app = express();
app.use(bodyParser.json());
app.use(cors());



app.post('/api/signup', (req, resp, next) => {
  let data = req.body;
  bcrypt.hash(data.password, 10)
    .then((encryptedPassword) =>
      db.one(`
        insert into users
        values (default, $1, $2, $3)
        returning username, email
        `,
        [
          data.username,
          encryptedPassword,
          data.email
        ]
      )
    )
    .then(data => resp.json(data))
    .catch(next);
});


app.post('/api/login', (req, resp, next) => {
  let username = req.body.username;
  let password = req.body.password;
  db.oneOrNone(
    'select * from users where username = $1',
    username)
    .then(user => {
      if (user === null) {
        resp.json({
          error: 'User not found'
        })
      }
      return [user,
        bcrypt.compare(password, user.password)]
    })
    .spread((user, matches) => {
      if (matches) {
        let token = uuid.v4();
        return [
          user,
          db.one(
            `insert into login_session values
            ($1, default, $2) returning *`,
            [token, user.id]
          )
        ];
      } else {
        return [
          // Incorrect password
        ]
      }
    })
    .catch(next)
    .spread((user, loginSession) => {
      if (user === undefined) {
        resp.json({
          error: 'Incorrect password'
        })
      }
      if (user !== undefined) {
        resp.json({
          username: user.username,
          email: user.email,
          auth_token: loginSession.token,
          id: user.id
        });
      }
    });
});

app.get('/api/search', (req, resp, next) => {
  let term = req.headers.term;
  let url = ('https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/' + term);
  unirest.get(url)
    .headers({
      'Accept': 'application/json',
      'X-Mashape-Key': API_KEY
    })
    .end(function (response) {
      resp.json({
        results: response.body
      });
    });
});

app.get('/api/cardDetails', (req, resp, next) => {
  let cardId = req.headers.id;
  let url = ('https://omgvamp-hearthstone-v1.p.mashape.com/cards/' + cardId);
  unirest.get(url)
    .headers({
      'Accept': 'application/json',
      'X-Mashape-Key': API_KEY
    })
    .end(function (response) {
      resp.json({
        results: response.body
      });
    });
});

app.post('/api/createDeck', (req, resp, next) => {
  let deck_name = req.body.deckName;
  let user_id = req.body.userId;
  let playerClass = req.body.playerClass;
  db.one(`
    insert into
    decks
    values (default, $1, $2, $3)
    returning
    id, name, user_id
    `,
    [
      deck_name,
      user_id,
      playerClass
    ]
  )
  .then(data => resp.json(data))
  .catch(next);
});

app.get('/api/fetchDecks', (req, resp, next) => {
  let user_id = req.headers.userid;
  db.any(`
    select
    id, name, class
    from
    decks
    where
    user_id = $1
    `,
    [
      user_id
    ]
  )
  .then(data => resp.json(data))
  .catch(next);
})

app.get('/api/fetchCards', (req, resp, next) => {
  let deck_id = req.headers.deckid;
  db.any(`
    select
    cards.*, deck_has_cards.*
    from
    cards
    inner join
    deck_has_cards
    on
    cards.api_id = deck_has_cards.card_id
    where
    deck_has_cards.deck_id = $1
    order by
    cards.cost, cards.name
    `,
    [
      deck_id
    ]
  )
  .then(data => resp.json(data))
  .catch(next);
})

app.get('/api/matchDeck', (req, resp, next) => {
  let deck_name = req.headers.deck_name;
  let user_id = req.headers.user_id;
  db.one(`
    select
    id, name, class
    from
    decks
    where
    name = $1
    and
    user_id = $2
    `,
    [
      deck_name,
      user_id
    ]
  )
  .then(data => resp.json(data))
  .catch(next);
})

app.post('/api/addToDeck', (req, resp, next) => {
  let details = req.body.details;
  let deck = req.body.deck;
  let name = details.name;
  let cardSet = details.cardSet;
  let type = details.type;
  let rarity = details.rarity;
  let cost = details.cost;
  let attack = details.attack;
  let health = details.health;
  let text = details.text;
  let flavor = details.flavor;
  let artist = details.artist;
  let collectible = details.collectible;
  let race = details.race;
  let playerClass = details.playerClass;
  let img = details.img;
  let imgGold = details.imgGold;
  let locale = details.locale;
  let faction = details.faction;
  let cardId = details.cardId;
  db.one(`
    insert into
    deck_has_cards
    values (default, $1, $2)
    returning
    deck_id;
    `,
    [
      cardId, // $1
      deck // $2
    ])
    .then(db.one(`
      insert into
      cards
      values (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      returning
      name;
      `,
      [
        name, // $1
        cardSet, // $2
        type, // $3
        rarity, // $4
        cost, // $5
        attack, // $6
        health,  // $7
        text, // $8
        flavor, // $9
        artist, // $10
        collectible, // $11
        playerClass, // $12
        img, // $13
        imgGold, // $14
        locale, // $15
        race, // $16
        cardId, // $17
        faction, // $18
      ]
    )
  )
    .catch(next);
})


app.use((err, req, resp, next) => {
  if (err.message === "duplicate key value violates unique constraint \"Users_username_key\"") {
    resp.json({
      message: 'duplicate username attempted'
    })
  }
  else {
    resp.status(500);
    resp.json({
      message: err.message,
      stack: err.stack.split('\n')
    });
  }
});

app.listen(4000, () => console.log('Listening on 4000.'));
