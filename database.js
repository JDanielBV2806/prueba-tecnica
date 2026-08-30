import {CreatePool} from 'mysql2/promise';
//recibe como parametro un objeto de js
const pool = CreatePool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'Prueba01'
});

export default pool;