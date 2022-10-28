const express = require('express');
const router = express.Router();
const db = require('../db');
const openApiSpec = require('../openapi.json');


router.get('/', async function (req, res, next) {
   const sqlPodaci = `SELECT * FROM topplayerteams NATURAL JOIN topplayers ORDER BY playerplaced`;
   try {
      const resultPodaci = (await db.query(sqlPodaci, [])).rows;
      var rawPodaci = JSON.stringify(resultPodaci);
      const response =  JSON.parse(rawPodaci);
      

      if (response.length > 0) {
         res.contentType = "application/json";
         res.statusCode = 200;
         res.statusMessage = "OK";

         
         return res.json({"status": "OK", "message": "Fetched department objects", response});
         /*
         let contextObj = {
            "@vocab": "http://schema.org",
            "gamename":"game",
            "platforms":"gamePlatform",
            "releasedate":"datePublished"
         }
         let newObj = {
            "@context":contextObj
         };
         for(const [key, value] of Object.entries(dbquery_1.rows[0])){
            newObj[key] = value;
         }
         dbquery_1.rows[0]["@context"] = contextObj;
         res.json({
            "status": "OK",
            "message": "Successfuly fetched data.",
            "result": newObj
         });

         if (resultPodaci) {
            let contextObjekt = {
                "@vocab": "https://schema.org/car",
                "broj_brzina":"numberOfForwardGears",
                "tezina_kg":"weight",
                "sirina_mm":"width"
            }
            let newObj = {
                "@context":contextObjekt
            };
            for(const [key, value] of Object.entries(resultPodaci[0])){
                newObj[key] = value;
            }
            resultPodaci[0]["@context"] = contextObjekt;
        }
         */
      }
      else {
         res.contentType = "application/json";
         res.statusCode = 404;
         return res.json({"status": "There is no connected data in database", "message": "Not Fetched department object", "response": null});
      }
   }
   catch (err) {
      res.contentType = "application/json";
         res.statusCode = 501;
         return res.json({"status": "Not Found", "message": "Ne postoji niti jedan igrac", "response": null});
   }
});


router.get('/openApi', async function (req, res, next) {
   console.log(openApiSpec);
   try {

      res.contentType = "application/json";
      res.statusCode = 200;
      res.statusMessage = "OK";

      return res.json({"status": "OK", "message": "Fetched department object", "result": openApiSpec});
   }
   catch (err) {
      return res.status(501).send();
   }

});

router.get('/:id',async function (req, res, next) {
   const id = req.params.id;
   
   const sqlPodaci = `SELECT * FROM topplayerteams NATURAL JOIN topplayers 
                      WHERE topplayerteams.playerPlaced = ${id}`;
   try {
      testId = parseInt(id);
      const resultPodaci = (await db.query(sqlPodaci, [])).rows;

      if (resultPodaci) {
         let contextObject = {
            "@vocab": "http://schema.org",
            "teamname": "http://schema.org/SportsTeam",
            "coach": "http://schema.org/coach",
            "city": "http://schema.org/city"
         }
         let newObject = {
            "@context":contextObject
         };
         for(const [key, value] of Object.entries(resultPodaci[0])){
            newObject[key] = value;
        }
        resultPodaci[0]["@context"] = contextObject;
      }
      
      const rawPodaci = JSON.stringify(resultPodaci)
      const response = JSON.parse(rawPodaci);

      if (response.length > 0) {
         res.contentType = "application/json";
         res.statusCode = 200;
         res.statusMessage = "OK";

         return res.json({"status": "OK", "message": "Fetched department object", response});
      }
      else {
         res.contentType = "application/json";
         res.statusCode = 404;
         return res.json({"status": "Not Found", "message": "Igrac sa zadanim id-em ne postoji", "response": null});
      }
   }
   catch (err) {
      res.contentType = "application/json";
         res.statusCode = 404;
         return res.json({"status": "Not Found", "message": "Nevaljan id", "response": null});
   }
});

router.post('/', async function(req, res, next) {
   const topPlayer = req.body;
   try {
      const sql2 = `INSERT INTO topplayers VALUES (
         ${topPlayer.playerplaced}, '${topPlayer.firstname}', 
         '${topPlayer.lastname}', ${topPlayer.seasonpoints}, ${topPlayer.pointpergame});`;

      const sql1 = `INSERT INTO topplayerteams VALUES (
         ${topPlayer.playerplaced}, ${topPlayer.teamid}, '${topPlayer.teamname}',
         '${topPlayer.country}', '${topPlayer.city}', '${topPlayer.eastorwest}',
         '${topPlayer.yearfounded}', ' ${topPlayer.coach}', '${topPlayer.placedlastseason}',
         '${topPlayer.winloserecordlastseason}', '${topPlayer.previouslybestplaced}', ${topPlayer.numberoftitles});`;

      console.log(sql1);
      console.log(sql2);

      const result2 = await db.query(sql2, []);
      const result1 = await db.query(sql1, []);

      res.contentType = "application/json";
      res.statusCode = 200;
      res.statusMessage = "OK";
      return res.json({"status": "OK", "message": "Input inserted succesfully"});


   }
   catch(err) {
      console.log(err);
      return res.status(501).send();
   }

});


router.delete('/:id', async function(req,res, next) {
   const id = req.params.id;

   const sql1 = `DELETE FROM topplayers WHERE playerplaced = '${id}'`;
   const sql2 = `DELETE FROM topplayerteams WHERE playerplaced = '${id}'`;
   try {
      await db.query(sql2, []);
      await db.query(sql1, []);
      res.contentType = "application/json";
      res.statusCode = 200;
      res.statusMessage = "OK";
      return res.json({"status": "OK", "message": "Obrisan objekt s id-em "+id});
   }
   catch (err) {
      console.log(err);
      return res.status(501).send();
   }
   
});

router.put('/:id', async function(req,res, next) {
   const id = req.params.id;
   const topPlayerPodaci = req.body;

   try {
      if (topPlayerPodaci.teamname != undefined) {
         const sql = `UPDATE topplayerteams SET teamname = '${topPlayerPodaci.teamname}' WHERE playerplaced = ${id}`;
         await db.query(sql, []);
      }
      if (topPlayerPodaci.country != undefined) {
         const sql = `UPDATE topplayerteams SET country = '${topPlayerPodaci.country}' WHERE playerplaced = ${id}`;
         await db.query(sql, []);
      }
      if (topPlayerPodaci.city != undefined) {
         const sql = `UPDATE topplayerteams SET city = '${topPlayerPodaci.city}' WHERE playerplaced = ${id}`;
         await db.query(sql, []);
      }
      if (topPlayerPodaci.eastorwest != undefined) {
         const sql = `UPDATE topplayerteams SET eastorwest = '${topPlayerPodaci.eastorwest}' WHERE playerplaced = ${id}`;
         await db.query(sql, []);
      }
      if (topPlayerPodaci.yearfounded != undefined) {
         const sql = `UPDATE topplayerteams SET yearfounded = '${topPlayerPodaci.yearfounded}' WHERE playerplaced = ${id}`;
         await db.query(sql, []);
      }
      if (topPlayerPodaci.coach != undefined) {
         const sql = `UPDATE topplayerteams SET coach = '${topPlayerPodaci.coach}' WHERE playerplaced = ${id}`;
         await db.query(sql, []);
      }
      if (topPlayerPodaci.placedlastseason != undefined) {
         const sql = `UPDATE topplayerteams SET placedlastseason = '${topPlayerPodaci.placedlastseason}' WHERE playerplaced = ${id}`;
         await db.query(sql, []);
      }
      if (topPlayerPodaci.winloserecordlastseason != undefined) {
         const sql = `UPDATE topplayerteams SET winloserecordlastseason = '${topPlayerPodaci.winloserecordlastseason}' WHERE playerplaced = ${id}`;
         await db.query(sql, []);
      }
      if (topPlayerPodaci.previouslybestplaced != undefined) {
         const sql = `UPDATE topplayerteams SET previouslybestplaced = '${topPlayerPodaci.previouslybestplaced}' WHERE playerplaced = ${id}`;
         await db.query(sql, []);
      }
      if (topPlayerPodaci.numberoftitles != undefined) {
         const sql = `UPDATE topplayerteams SET numberoftitles = '${topPlayerPodaci.numberoftitles}' WHERE playerplaced = ${id}`;
         await db.query(sql, []);
      }
      if (topPlayerPodaci.firstname != undefined) {
         const sql = `UPDATE topplayers SET firstname = '${topPlayerPodaci.firstname}' WHERE playerplaced = ${id}`;
         await db.query(sql, []);
      }
      if (topPlayerPodaci.lastname != undefined) {
         const sql = `UPDATE topplayers SET lastname = '${topPlayerPodaci.lastname}' WHERE playerplaced = ${id}`;
         await db.query(sql, []);
      }
      if (topPlayerPodaci.seasonpoints != undefined) {
         const sql = `UPDATE topplayers SET seasonpoints = '${topPlayerPodaci.seasonpoints}' WHERE playerplaced = ${id}`;
         await db.query(sql, []);
      }
      if (topPlayerPodaci.pointpergame != undefined) {
         const sql = `UPDATE topplayers SET pointpergame = '${topPlayerPodaci.pointpergame}' WHERE playerplaced = ${id}`;
         await db.query(sql, []);
      }

      res.contentType = "application/json";
      res.statusCode = 200;
      res.statusMessage = "OK";
      return res.json({"status": "OK", "message": "Objekt uspjesno azuriran "+id});
   }
   catch(err) {
      console.log(err);
      return res.status(501).send();
   }
})

router.all('*', async function (req, res, next) {
   res.contentType = "application/json";
   res.statusCode = 501;
   return res.json({"status": "Not Implemented", "message": "Nevaljan argument", "response": null});
});

module.exports = router;