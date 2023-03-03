import { makeAutoObservable, action, observable } from "mobx";

export class UserStore {
    private userName = '';

    navRouter = '';

    defaultNavRouter = "/system";
    defaultHomeNavRouter = '/home/index'
    constructor() {
        makeAutoObservable(this);
        if (!this.navRouter) {
            this.navRouter = this.defaultNavRouter
        }
    }
    get UserName() {
        return this.userName;
    }
    set UserName(userName: string) {
        this.userName = userName;
    }
    get NavRouter() {
        return this.navRouter
    }
    set NavRouter(navRouter: string) {
        this.navRouter = navRouter;
    }
    get getDefaultNavRouter() {
        return this.defaultNavRouter
    }

    get getDefaultHomeNavRouter() {
        return this.defaultHomeNavRouter
    }
}

export const userStore = new UserStore();