const {Pool} = require('pg');

const pool = new Pool({
    user: 'web2',
    host: 'dpg-cdd5p3qen0htugjdctig-a.frankfurt-postgres.render.com',
    database: 'premijer',
    password: 'rtkGL9GNpNH9y8Y96PSyxd7uZ5R3BPCu',
    port: 5432,
    ssl: true
});

module.exports = {
    query: (text, params) => {
        const start = Date.now();
        return pool.query(text, params)
            .then(res => {
                const duration = Date.now() - start;
                return res;
            });
    },
    pool: pool
}