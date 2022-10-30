const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', async function (req, res, next) {
    const sqlPodaciA = `SELECT * FROM GroupA`;
    const sqlPodaciB = `SELECT * FROM GroupB`;
    const sqlPodaciA2 = `SELECT * FROM MatchesA`;
    const sqlPodaciB2 = `SELECT * FROM MatchesB`;
    const sqlPodaciA3 = `SELECT * FROM ScheduleA`;
    const sqlPodaciB3 = `SELECT * FROM ScheduleB`;
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
        const resultPodaciA3 = (await db.query(sqlPodaciA3, [])).rows;
        const rawPodaciA3 = JSON.stringify(resultPodaciA3)
        const jsonPodaciA3 = JSON.parse(rawPodaciA3);
        const resultPodaciB3 = (await db.query(sqlPodaciB3, [])).rows;
        const rawPodaciB3 = JSON.stringify(resultPodaciB3)
        const jsonPodaciB3 = JSON.parse(rawPodaciB3);

        res.render('datatable', {
            title: 'Baza podataka',
            podaciA: jsonPodaciA,
            podaciB: jsonPodaciB,
            podaciA2: jsonPodaciA2,
            podaciB2: jsonPodaciB2,
            podaciA3: jsonPodaciA3,
            podaciB3: jsonPodaciB3,
            linkActive: 'datatable'
        });
    } catch (err) {
        console.log(err);
    }
    
});
module.exports = router;