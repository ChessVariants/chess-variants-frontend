import Cookies, { CookieChangeListener, CookieGetOptions, CookieSetOptions } from "universal-cookie";

export default class CookieService {

    private cookies: Cookies;
    private static cookieService?: CookieService;

    private constructor() {
        this.cookies = new Cookies();
    }

    public static getInstance() {
        if (this.cookieService === null || this.cookieService === undefined) {
            this.cookieService = new CookieService();
        }
        return this.cookieService;
    }

    public set(cookieType: Cookie, value: string, options?: CookieSetOptions): void {
        this.cookies.set(cookieType, value, options);
    }
 
    public get(cookieType: Cookie, options?: CookieGetOptions): any {
        return this.cookies.get(cookieType, options);
    }

    public remove(cookieType: Cookie, options?: CookieSetOptions): void {
        return this.cookies.remove(cookieType, options);
    }

    public addChangeListener(callback: CookieChangeListener): void {
        this.cookies.addChangeListener(callback);
    }

    public removeChangeListener(callback: CookieChangeListener): void {
        this.cookies.removeChangeListener(callback);
    }
}

export enum Cookie {
    JwtToken = "jwtToken",
    Username = "username",
}