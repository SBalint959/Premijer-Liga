const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', async function (req, res, next) {
    const sqlPodaciA = `SELECT * FROM GroupA`;
    const sqlPodaciB = `SELECT * FROM GroupB`;
    const sqlPodaciA2 = `SELECT * FROM MatchesA`;
    const sqlPodaciB2 = `SELECT * FROM MatchesB`;
    try {
        const resultPodaciA = (await db.query(sqlPodaciA, [])).rows;
        const rawPodaciA = JSON.stringify(resultPodaciA)
        const jsonPodaciA = JSON.parse(rawPodaciA);
        const resultPodaciB = (await db.query(sqlPodaciB, [])).rows;
        const rawPodaciB = JSON.stringify(resultPodaciB)
        const jsonPodaciB = JSON.parse(rawPodaciB);
        const resultPodaciA2 = (await db.query(sqlPodaciA2, [])).rows;
        const rawPodaciA2 = JSON.stringify(resultPodaciA2)
        const jsonPodaciA2 = JSON.parse(rawPodaciA2);
        const resultPodaciB2 = (await db.query(sqlPodaciB2, [])).rows;
        const rawPodaciB2 = JSON.stringify(resultPodaciB2)
        const jsonPodaciB2 = JSON.parse(rawPodaciB2);

        res.render('datatable', {
            title: 'Baza podataka',
            podaciA: jsonPodaciA,
            podaciB: jsonPodaciB,
            podaciA2: jsonPodaciA2,
            podaciB2: jsonPodaciB2,
            linkActive: 'datatable'
        });
    } catch (err) {
        console.log(err);
    }
    
});

module.exports = router;