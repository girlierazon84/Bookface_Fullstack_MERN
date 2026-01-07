import type { Express } from "express";
import UserController from "../controllers/UserController";


const usersUrl = "/users";
const usersUrlWithId = `${usersUrl}/:userId`;
const searchUsersUrl = "/searchUser";
const verifyUserUrl = "/verifyUser";

const routes = (app: Express) => {
    app.post(usersUrl, UserController.createUser);
    app.post(verifyUserUrl, UserController.verifyUser);

    app.get(usersUrl, UserController.getAllUsers);
    app.get(usersUrlWithId, UserController.getUserWithId);
    app.get(searchUsersUrl, UserController.getUserWithQuery);

    app.put(usersUrlWithId, UserController.updateUser);
    app.delete(usersUrlWithId, UserController.deleteUser);
};

export default { routes };
