import { Component,OnDestroy,Input } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../app/_services/rt-authentication.service';
import { Subscription }   from 'rxjs/Subscription';
import {Location} from '@angular/common';

import {UserApplicationComponent} from '../app/lmu_uaForm/user-application.component';

@Component({
	selector: 'my-app',
	template: `
		<div class="container">
		
  <my-userApplication></my-userApplication>
  
    </div>
		
		<!-- 
		
		
		<div class="container">
		
			<header>
				
				<div class="header_images_container">
					<div  class="header_images_item">
						<a href="http://www.uni-muenchen.de">
							<img  src="assets/images/header_images/lmu1.png" alt="lmu_logo_1">
						</a>
					</div>
					<div  class="header_images_item">
						<a href="http://www.uni-muenchen.de">
							<img  src="assets/images/header_images/lmu2.png" alt="lmu_logo_2">
						</a>
					</div>
					<div  class="header_images_item">
						<a href="http://www.uni-muenchen.de">
							<img  src="assets/images/header_images/lmu3.png" alt="lmu_logo_3">
						</a>
					</div>
					<div  class="header_images_item" id="header_images_item_ds">
						<a href="http://www.m-datascience.mathematik-informatik-statistik.uni-muenchen.de">
							<img  src="assets/images/header_images/lmu_ds.png" alt="lmu_logo_ds">
						</a>
					</div>
				</div>
				
				
								
				<div class="header_row" id="header_row_menu_userInfo">
				
					<div id="header_menu_column">
					
						<div class="header_userInfo_field">
							<div class="header_userInfo_item_button"  [mdMenuTriggerFor]="mainmenu">
						   		
						   		<i class="mdi mdi-menu mdi-24px"></i>
						   </div>
						</div>
												
										  
						<md-menu #mainmenu="mdMenu">
							<button md-menu-item   (click)="routeTo('startPage')"> startPage  </button>
							<button md-menu-item  *ngIf="_authenticationService.isAuthenticated()"  (click)="routeTo('userApplication')"> User Application form </button>
							<button  md-menu-item *ngIf="!_authenticationService.isAuthenticated()"  (click)="showLoginModal()"> Login </button>
							<button  md-menu-item *ngIf="_authenticationService.isAuthenticated()"  (click)="showLoginModal()"> Logout </button>
						</md-menu>
												
						
					</div>
					<div id="header_userInfo_column">
						<div *ngIf="!_authenticationService.isAuthenticated()" class="header_userInfo_field" (click)="showLoginModal()">
				
							<div class="header_userInfo_item">
								<i class="mdi mdi-account-outline"></i>
							</div>
							
							<div class="header_userInfo_item">|</div>
							<div class="header_userInfo_item_button">Login</div>
							
						</div>
						<div *ngIf="_authenticationService.isAuthenticated()"  class="header_userInfo_field" (click)="showLoginModal()">
				
							<div class="header_userInfo_item">
								<i class="mdi mdi-account"></i>
							</div>
				
							<div class="header_userInfo_item">{{displayname}}</div>
							
							<div class="header_userInfo_item" >|</div>
							<div class="header_userInfo_item_button">Logout</div>
														
						</div>
												
					</div>
					
				</div>
			
			</header>
		
			<div> 
							
				<md-progress-bar color="accent" mode="{{progressBar_mode}}" value="{{progressBar_value}}"></md-progress-bar>
				
				<div class="content-main"> 			
						<router-outlet></router-outlet>
				</div>
			
			</div>
									
			<footer>
				<div id="lmuFooter">
				
					<div class="footerItem">
						<a class="a_lmu"  href="http://test-datascience.ifi.lmu.de/impressum" title="Impressum"> Impressum </a>
					</div>
					
					<div class="footerItem">
						<a class="a_lmu"  href="http://test-datascience.ifi.lmu.de/datenschutz" title="Datenschutz"> Datenschutz </a>
					</div>
					
					<div class="footerItem">
						<a class="a_lmu" href="http://test-datascience.ifi.lmu.de/contact-info" title="Kontakt"> Kontakt </a>
					</div>
				
				</div>
			</footer>
		</div>
		-->
		`,
	providers: [UserApplicationComponent],
	//styleUrls: ['app.component.css']
   // styles:[css]
	})


/*
export class AppComponent implements OnDestroy{

    progressBar_value:number=0;
    progressBar_mode:string='determinate';

    displayname:string;
    subscription: Subscription;

	constructor(private _router: Router,
				public _authenticationService: AuthenticationService,
                private _location: Location
				//,public modal: Modal
	){
        this.subscription = _authenticationService.userDisplayName$.subscribe(
            newDisplayName => {
                this.displayname = newDisplayName;
            });

        _authenticationService.getProgressValue().subscribe((value) => this.progressBar_value = value);
        _authenticationService.getProgressMode().subscribe((mode) => this.progressBar_mode = mode);

        var cookies = document.cookie;
        console.log("cookies = ",cookies);

	}

		showLoginModal():void{

		    console.log("In app.componet before navigate to 'login' _location=",this._location.path());

			if (this._authenticationService.isAuthenticated())  this._router.navigate(['/login','out',this._location.path()]);
			else this._router.navigate(['/login','in',this._location.path()]);

		}

		routeTo(route:string)
		{
			this._router.navigate([route]);
		}



        ngOnDestroy() {
            // prevent memory leak when component destroyed
            this.subscription.unsubscribe();
        }
	}
*/


export class AppComponent{

  constructor( public uaFormComp:UserApplicationComponent)
  {
      var cookies = document.cookie;
      console.log("cookies = ",cookies);

    this.uaFormComp.ngOnInit();
  }

}
