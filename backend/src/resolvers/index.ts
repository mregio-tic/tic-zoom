import {userResolver} from "./user.resolver";
import * as _ from "lodash";

const resolverMerge= _.merge({}, userResolver);

export default resolverMerge;