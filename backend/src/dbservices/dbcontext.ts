import "dotenv/config"; //To use .env
import { Sequelize } from "sequelize-typescript";
import { User } from "../entities/user.entity";

const models: any = [User];

const dburl =
    process.env.DATABASE_URL ||
    "postgres://sa:adminadmin@localhost:5432/talk_zoom";
const ssl = process.env.DB_SSL || false;

var sequelize = new Sequelize(dburl, {
    storage: ":memory:",
    dialect: "postgres",
    models: models
});


export default sequelize;