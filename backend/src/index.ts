import cors from "cors";
import "dotenv/config"; //To use .env
import express from "express";
import {ApolloServer} from "apollo-server-express";
import sequelize from "./dbservices/dbcontext";
import typeDefinition from "./typedefs";
import resolverDefinition from "./resolvers";

const app: express.Application = express();
const server= new ApolloServer({typeDefs: typeDefinition, resolvers: resolverDefinition});
server.applyMiddleware({app});
const port: String | Number = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server up and running!`);
});

//check db
sequelize 
    .authenticate()
    .then(() => console.log("Database Connected..."))
    .catch((err) => console.log("Error:" + err));


app.listen(port, () => {
    //seeding
    var reset = process.env.RESET_DATABASE === "true" ? true : false;
    sequelize.sync({ force: reset || false }).then(() => {
        
    });
});

