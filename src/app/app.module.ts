

import { NgModule }      		from '@angular/core';
import { BrowserModule } 		from '@angular/platform-browser';
import { FormsModule }   		from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    		from '@angular/http';

import { MaterialModule } 		from '@angular/material/'; //from 'angular2-material';


//import { AppRoutingModule }             from './app-routing';

import { CalendarModule }            from 'primeng/components/calendar/calendar';

import { Ng2UploaderModule }        from 'ng2-uploader/ng2-uploader';
import  'hammerjs';



import {StartPageComponent} from './home/start-page.component';
import { UserApplicationComponent }   from './lmu_uaForm/user-application.component';

import {LoginComponent} from './login/rt-login.component';
import {RtRegisterCompletion} from './register/rt-register-completion.component';

import {getKeyValuePair}        from './_pipes/key-value.pipe';
import {objValuesPipe}          from '../app/_pipes/key-value.pipe';
import {rtFileUploaderComponent} from './rtForm/rt-file-uploader.component';
import {rtInputComponent}       from './rtForm/rt-input.component';
import {rtGridBoxAddComponent}     from './rtForm/rt-grid-box-add.component';

import { AppComponent} 			from './app.component';

import { LmuUserApdComponent } 	from './lmu_uaForm/ua-apd.component';
import { LmuUserPeComponent } 	from './lmu_uaForm/ua-pe.component';
import { LmuUserOpeComponent } 	from './lmu_uaForm/ua-ope.component';
import { LmuUserOiComponent } 	from './lmu_uaForm/ua-oi.component';


// used to create fake backend
//import {fakeBackendProvider}    from './mock-backend.component_ts.bak';
//import { MockBackend, MockConnection } from '@angular/http/testing';
//import { BaseRequestOptions } from '@angular/http';


import {AuthenticationService} from './_services/rt-authentication.service';
import { WindowRefService } from './_services/windowRef.service';
import {ServerConfigs} from './_models/configFile';
import { RestService } from './_services/rt-rest.service';


//declare var $: any;
//declare var jQuery: any;


//let fakeBackendProviderArray = [];
//if (RunningConfigs.runWithFakeBackend) {
//
//    fakeBackendProviderArray = [fakeBackendProvider,
//        MockBackend,
//        BaseRequestOptions];
//}



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        //AppRoutingModule,
        HttpModule,
        MaterialModule.forRoot(),
        //ModalModule.forRoot(),
        CalendarModule,
        Ng2UploaderModule,

        //,Ng2SelectModule
        //,MdIconModule
        //,InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    declarations: [AppComponent,
        StartPageComponent,
        LoginComponent,
        RtRegisterCompletion,
        UserApplicationComponent,
        LmuUserApdComponent,
        LmuUserPeComponent,
        LmuUserOpeComponent,
        LmuUserOiComponent,
        rtFileUploaderComponent,
        rtInputComponent,
        rtGridBoxAddComponent,
        objValuesPipe,
        getKeyValuePair

    ],
    providers: [
        //UserDataService,

        AuthenticationService,

        {provide: Window, useValue: window},
        WindowRefService,
        ServerConfigs,
        RestService,
        // providers used to create fake backend
        //fakeBackendProviderArray,

        //fakeBackendProvider,
        //MockBackend,
        //BaseRequestOptions

        ],
    bootstrap: [AppComponent]

})


export class AppModule { }
