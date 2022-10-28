const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');
const db = require('../db');
const app = express();
const fs = require('fs');
const { Parser } = require('json2csv');


const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '4ArGK9pV6XX1x2I0ap6zosH2rQEjbpFMyaxXVHlkhp9jMMIyh7M9qxubr54SUZJ5',
  baseURL: 'http://localhost:3000',
  clientID: '9UNrlmRyzaM1Fitl3Y5Hb8OhDUaC4jD4',
  issuerBaseURL: 'https://dev-xxdzkni1.us.auth0.com'
};

router.use(auth(config));


router.get('/profile', requiresAuth(), (req, res) => {
   if(req.oidc.user === undefined){
       res.send("Access denied. You are not logged in!")
   }
   else{
   res.render('profile', {
     title: "Profile - " + req.oidc.user.nickname,
     data: req.oidc.user
   });
   }
});

router.get('/update', async function (req, res, next) {
    if(req.oidc.user === undefined){
        res.send("Access denied. You are not logged in!")
    } else {
        const sqlPodaci =  `SELECT * FROM topplayerteams NATURAL JOIN topplayers`;
        try {
            const resultPodaci = (await db.query(sqlPodaci, [])).rows;

            fs.writeFile('./NLLTeams.json', JSON.stringify(resultPodaci, null, 3), (err) => {
                if(err){
                    console.log(err);
                }
            });
            const parser = new Parser({
                escapedQuote: '"'
            });
            try{
                let csvFile = parser.parse(resultPodaci);
                fs.writeFile('./NLLTeams.csv', csvFile,(err) => {
                    if(err){
                        console.log(err);
                    }
                });
           }
            catch(err){
                console.log(err);
            }
            res.render('updatedFiles');

        } catch (err) {
            console.log(err);
        }
    }

});

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Main page',
        data: req.oidc.user
    });
});

module.exports = router;