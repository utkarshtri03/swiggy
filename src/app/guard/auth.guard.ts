import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService, 
    private router: Router) {}

  async canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> {
      const roleType = route.data.type;
      try {
        const type = await this.authService.checkUserAuth();
        if(type) {
          if(type == roleType) return true;
          else {
            let url = '/tabs';
            if(type == 'admin') url = '/admin';
            this.navigate(url);
          }
        } else {
          this.checkForAlert(roleType);
        }
      } catch(e) {
        console.log(e);
        this.checkForAlert(roleType);
      }
  }

  navigate(url) {
    this.router.navigateByUrl(url, {replaceUrl: true});
    return false;
  }

  async checkForAlert(roleType) {
    const id = await this.authService.getId();
    if(id) {
      // check network
      console.log('alert: ', id);
      this.showAlert(roleType);
    } else {
      this.authService.logout();
      this.navigate('/login');
    }
  }

  showAlert(role) {
    this.alertCtrl.create({
      header: 'Authentication Failed',
      message: 'Please check your Internet Connectivity and tr again',
      buttons: [
        {
          text: 'Logout',
          handler: () => {
            this.authService.logout();
            this.navigate('/login');
          }
        },
        {
          text: 'Retry',
          handler: () => {
            let url = '/tabs';
            if(role == 'admin') url = '/admin';
            this.navigate(url);
          }
        }
      ]
    })
    .then(alertEl => alertEl.present());
  }
}
