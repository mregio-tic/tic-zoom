import { User } from "../entities/user.entity"

export const userResolver = {
    Query: {
        getAllUsers() {
            return User.findAll();
        },
        getOneUser(parent: any, args: any) {
            var _username = args.username;
            return User.findOne({where: { username: _username}});
        }
    },

    Mutation: {
        async createUser(parent: any, args: any) {
            const user = args;
            await User.create(user);
            return user;
        }
    }
}
