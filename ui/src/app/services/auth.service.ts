import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";

@Service()
export class AuthService {

    private http = inject(HttpClient);

    signup(user: any) {
        return this.http.post('http://localhost:3000/signup', user);
    }

    login(credentials: any) {
        return this.http.post('http://localhost:3000/login', credentials);
    }

}