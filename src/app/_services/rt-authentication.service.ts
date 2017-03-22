import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
}  from '@angular/router';



import 'rxjs/add/operator/map'
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import {RestService} from './rt-rest.service';

import { User } from '../_models/user';
import {toPromise} from "rxjs/operator/toPromise";


/*
class cCurrentUser  {
    token:string;
    email:string;
};
*/

const dbgPrint = false;
const dbgPrint_user = false;
const dbgPrint_login = false;
const dbgPrint_setFormObj = true;
const dbgPrint_getFormObj = true;


@Injectable()
export class AuthenticationService {


    private _authenicated: boolean  = false;
    private _currentUser: any = null ;
    private _currentFormObj: any = null;

    private _currentToken : any = null;
    private _currentUserId : string = null;

    // Observable string sources for displayname
    private userDisplayNameSrc = new Subject<string>();



    // Observable string streams
    userDisplayName$ = this.userDisplayNameSrc.asObservable();

    constructor(private http: Http,
                private _rtRestService : RestService){

        /*
        this.auth_getCurrentUser();
        this.auth_getFormObject();
        this.isAuthenticated();
        */


        if (dbgPrint) console.log("_authenicated=",this._authenicated);
        if (dbgPrint)  console.log("_currentUser=",this._currentUser);
        if (dbgPrint)  console.log("_currentFormObj=",this._currentFormObj);
    }

    //------------------------------------------------------------------------------------------------------------------
    private progressValue: Subject<number> = new Subject<number>();

    getProgressValue(): Observable<number> {
        return this.progressValue.asObservable();
    }

    setProgressValue(newValue: number): void {
        //this.progressValue = newValue;
        this.progressValue.next(newValue);
    }

    private progressMode: Subject<string> = new Subject<string>();

    getProgressMode(): Observable<string> {
        return this.progressMode.asObservable();
    }

    setProgressMode(newMode: string): void {
        //this.progressValue = newValue;
        if (newMode === 'indeterminate') this.setProgressValue(0);
        this.progressMode.next(newMode);
    }
    //------------------------------------------------------------------------------------------------------------------


    login_getToken(userId: string, password: string):any {
        //return this.http.post('/api/authenticate', JSON.stringify({ email: email, password: password }))
        //this.setProgressValue(0);
        this.setProgressMode('indeterminate');

        return new Promise((resolve, reject) =>
        {

            this._rtRestService.restPost_login(userId,password)
                .subscribe(response => {

                    if (dbgPrint_login) console.log("In auth,response=", response);

                    //if (response.token)
                    if (response.hasOwnProperty('token'))
                    {
                        let token = response['token'];
                        this.setCurrentToken_local(token);
                        this._currentUserId = userId;

                        //this.auth_getFormObject();

                        //this.setProgressValue(100);
                        this.setProgressMode('determinate');

                        resolve(token);
                    }else reject("Server-Error, response object is invalid");
                },err => {
                    // Log errors are catched in REST-Service
                    //console.log(err);
                    if (dbgPrint_login) console.log("In authService login, User NOT found !!! an uaObj for current user at server, err=",err);

                    reject(err);
                }); //.toPromise();
        });
    }


    auth_getUserData():any
    {
        if (this._currentUserId && this._currentToken)
        {
            return new Promise((resolve, reject) => {
                this._rtRestService.restGet_getUserData(this._currentUserId, this._currentToken)
                    .subscribe(response => {

                        console.log("In auth_getUserData, response=", response);
                        this.setCurrentUser_local(response);
                        resolve(response);

                    }, err => {
                        console.log("In auth_getUserData, error=", err);
                        reject(err);
                    });
            });
        }
    }

    setDisplayName(name: string) {
        this.userDisplayNameSrc.next(name);
    }


    logout()
    {

        console.log("In authService-logout");

        // remove user from local storage to log user out
        localStorage.setItem('lmu_evfmsd_currentUser',null);
        localStorage.setItem('lmu_evfmsd_token',null);
        localStorage.setItem('currentUaObject', null );
        // Service message commands
        this.setDisplayName("");
        this._currentToken = "";
        this._authenicated = false;
        this._currentFormObj = null;
        this._currentUser = null;
    }

    isAuthenticated()
    {

        //if (this._currentUserId && this._currentToken)

        this.auth_getCurrentUser();

        if (this._currentUser)
        {
            //console.log("in isAuthenticated , this._currentUser=",this._currentUser);

            // for reloading page with valid currentUser
            if (this._currentToken)
            {
                this._authenicated = true;
                if (this._currentUser.fullname.length > 0) this.setDisplayName(this._currentUser.fullname);
                else this.setDisplayName(this._currentUser.username);
            }
        }
        //console.log("In AuthenticationService, isAuthenticated, _authenicated= ",this._authenicated);

        return this._authenicated;
    }

    //-----------------------------------------------------------------------------------------------------------------

    setCurrentUser_local(user):boolean{

        let retValue=false;
        if (dbgPrint_user) console.log("In AuthenticationService,setCurrentUser_local: user=",user);

        let tempString = user;
        //JSON.stringify(tempString);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('lmu_evfmsd_currentUser',JSON.stringify(tempString) );

        this._currentUser = user;

        //if (JSON.parse(localStorage.getItem('currentUser'))) retValue=true;

        if (dbgPrint_user) console.log("In AuthenticationService,setCurrentUser_local: this._currentUser=",this._currentUser);

        return retValue;
    }

    setCurrentToken_local(token):boolean{

        let retValue=false;
        console.log("In AuthenticationService,setCurrentToken_local: token=",token);

        let tempString = token;
        //JSON.stringify(tempString);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('lmu_evfmsd_token',JSON.stringify(tempString) );

        this._currentToken = token;


        //console.log("In AuthenticationService,setCurrentToken_local: token=",this._currentToken);

        return retValue;
    }


    auth_getCurrentUser():any
    {

        if (dbgPrint_user) console.log("In auth_getCurrentUser");

        this._currentUser = (JSON.parse(localStorage.getItem('lmu_evfmsd_currentUser')));

        return this._currentUser;
    }

    //-----------------------------------------------------------------------------------------------------------------


    auth_getFormObject():any
    {

        if (dbgPrint_getFormObj) console.log("In authService 1,auth_getFormObject,this._currentFormObj=",this._currentFormObj);

        if (dbgPrint_getFormObj) console.log("In authService 1,auth_getFormObject,localStorage.getItem('currentUaObject'=",localStorage.getItem('currentUaObject'));

        if ((!this._currentFormObj)
            || (this._currentFormObj === null)
            || (typeof this._currentFormObj !== 'object')
            || (Object.keys(this._currentFormObj ).length === 0))
        {

            let tmpUa = localStorage.getItem('currentUaObject');

            if ((!tmpUa)
                || (tmpUa === null)
                || (typeof tmpUa !== 'object')
                || (Object.keys(tmpUa).length === 0))
            {

                if (dbgPrint_getFormObj) console.log("tmpUa 1=", tmpUa);

                this.auth_getFormObject_Server(this._currentUser)
                    .then(response => {
                        if (response) {

                            if (dbgPrint_getFormObj) console.log("In auth_getFormObject,after auth_getFormObject_Server response=", response, "this._currentFormObj=", this._currentFormObj);
                            //this.auth_setFormObj(this._currentFormObj);
                            return response;
                        }
                        /*else {
                            }
                            if (dbgPrint_getFormObj) console.log("In auth_getFormObject,after auth_getFormObject_Server response=", response);
                            //this.auth_setFormObj({});
                            */
                        })
                    .catch(exp => {
                            console.log("in auth_getFormObject, error at auth_getFormObject_Server , err=", exp);
                            //this.auth_setFormObj({});
                        return {};
                        }
                    );

            }
            else //found valid obj for currentUser in localStorage
            {
                //this.auth_setFormObj(tmpUa);
                this._currentFormObj = JSON.parse(tmpUa);
                return this._currentFormObj;
            }
        }
        else return this._currentFormObj;

    }


    private auth_getFormObject_Server(currentUser):any{

        if (dbgPrint_getFormObj)  console.log("1 In  rt-auth-service: auth_getFormObject_Server ,currentUser=",currentUser);

        let retValue=false;

        return new Promise((resolve, reject) => {
            this._rtRestService.restGet_formObject(this._currentUserId, this._currentToken)
                .subscribe(
                    response => {


                       // if (dbgPrint_getFormObj) console.log("In auth_getFormObject_Server after rest-call, response=",response);

                        let uaObject = response; //JSON.parse(response);


                        if (dbgPrint_getFormObj) console.log("In auth_getFormObject_Server after rest-call, uaObject=",uaObject);

                        if (!uaObject || Object.keys(uaObject).length === 0)  //NO object found at server
                        {

                            uaObject = {
                                subFormGroup_apd: {},
                                subFormGroup_ac: {},
                                subFormGroup_ac2: {},
                                subFormGroup_oi: {},
                            }

                            if (dbgPrint_getFormObj) console.log("1 NOT found !!! an uaObj for current user at server");
                        }
                        else {

                            let tmpObj: any = uaObject;
                            //uaObject = JSON.parse(tmpObj);

                            if (dbgPrint_getFormObj) console.log("Found uaObj for current user at server, =", uaObject);

                            if (typeof uaObject !== 'object') {
                                uaObject = {
                                    subFormGroup_apd: {},
                                    subFormGroup_ac: {},
                                    subFormGroup_ac2: {},
                                    subFormGroup_oi: {},
                                }

                                if (dbgPrint_getFormObj) console.log("Found uaObj for current user at server,but s not an object.\ " +
                                    "So we have redefine it=", uaObject);

                            }
                        }

                        this.auth_setFormObj(uaObject);
                        resolve(true);
                    },
                    err => {
                        // Log errors are catched in REST-Service
                        //console.log(err);
                        if (dbgPrint_getFormObj) console.log("2 NOT found !!! an uaObj for current user at server, err=",err);

                        reject(false);
                    });
        });

    }

    //------------------------------------------------------------------------------------------------------------

    auth_setFormObj(uaObj:any,sendToServer:boolean=false)
    {
        //console.log("In authService, auth_setFormObj 1:given uaObj=",uaObj);

        var tmpUaObj = "";
        if (uaObj.subFormGroup_apd[0] != undefined) tmpUaObj = uaObj.subFormGroup_apd[0];
        else tmpUaObj = uaObj;   //.subFormGroup_apd;

        if (typeof tmpUaObj !== 'object') uaObj = JSON.parse(tmpUaObj) ;

        this._currentFormObj = tmpUaObj;

        if (dbgPrint_setFormObj)console.log("In authService, auth_setFormObj 2 ,tmpUaObj=",tmpUaObj);


        //Important --> localStorage use json-format
            let tmpString: string = JSON.stringify(tmpUaObj);
            tmpString = tmpString.replace(/\//g, '-');
            if (dbgPrint_setFormObj) console.log("In auth_setFormObj, tmpString",tmpString);

            //this._currentUser['uaObj'] = tmpString;
            //this.setCurrentUser_local(this._currentUser);


            //let tmpString = this._currentFormObj;

            localStorage.setItem('currentUaObject', tmpString );//JSON.stringify(tmpString));


        if (sendToServer) this.auth_setFormObj_Server(tmpString);

    }

    private auth_setFormObj_Server(stringifyObj)
    {

        //var localStorage_formObj = localStorage.getItem('currentUaObject');

        this._rtRestService.restPatch_formObject(this._currentUserId,this._currentToken,this._currentFormObj)
            .subscribe(
                (data) => {console.log("set UaObj to server successfull with data=",data)}, //this.data = data, // Reach here if res.status >= 200 && <= 299
                (err) => {console.log("set UaObj to server failure , err=",err)}); // Reach here if fails;

        /*
        if (dbgPrint_setFormObj) console.log("In auth_setFormObj_Server this._currentUser",this._currentUser);
        if (dbgPrint_setFormObj) console.log("In auth_setFormObj_Server stringifyObj=",stringifyObj);

        this._rtRestService.restPost_setUaObject(this._currentUser,stringifyObj)
            .subscribe(
                (data) => {console.log("set UaObj to server successfull with data=",data)}, //this.data = data, // Reach here if res.status >= 200 && <= 299
                (err) => {console.log("set UaObj to server failure , err=",err)}); // Reach here if fails;
*/
    }


    //------------------------------------------------------------------------------------------------------------




}


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {

        if (dbgPrint) console.log("in AuthGuard, checklogin, this.authService.isAuthenticated()= ", this.authService.isAuthenticated());

        if (this.authService.isAuthenticated()) { return true; }
        else {

            //console.log("in AuthGuard, checklogin : false");

            // Store the attempted URL for redirecting
            //this.authService.redirectUrl = url;

            // Navigate to the login page with extras
            this.router.navigate(['/login','in']);
            return false;
        }
    }
}



