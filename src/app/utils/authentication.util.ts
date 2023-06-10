import { JwtHelperService } from '@auth0/angular-jwt';
import { Cookie } from 'ng2-cookies';
import { AuthConstant } from '../constants/auth.constant';

export class AuthenticationUtil {
  constructor() // @Inject(DOCUMENT) public document: any,
  {}

  public static saveToken(token: string) {
    Cookie.delete(AuthConstant.ACCESS_TOKEN_KEY);
    Cookie.set(AuthConstant.ACCESS_TOKEN_KEY, token);
  }

  public static removeToken() {
    Cookie.delete(AuthConstant.ACCESS_TOKEN_KEY);
  }

  public static getToken() {
    return Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);
  }

  public static isLoggedIn(): boolean {
    return Cookie.check(AuthConstant.ACCESS_TOKEN_KEY);
  }

  public static getUserUid() {
    let decodeToken = this.decodeToken();
    return decodeToken.user_id;
  }

  public static decodeToken() {
    let token: any = this.getToken();
    let helper = new JwtHelperService();
    let decodeToken = helper.decodeToken(token);
    return decodeToken;
  }

  public static isTokenExpired() {
    let token: any = this.getToken();
    let helper = new JwtHelperService();
    return helper.isTokenExpired(token);
  }

  public static deleteAllCookie() {
    Cookie.deleteAll();
  }
}
