import {Pool} from "pg";
const db = new Pool({
    user:"postgres",
    host:"localhost",
    database:"V_EATS",
    password:"rk@vit",
    port:5432
})
/*
const db = new Pool({
    connectionString:process.env.DATABASE_URL
})
    */
export default db;
