import { ChatService } from '../../services/chat.service';
import { Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async signIn() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.chatService.signIn(this.credentialForm.value).then(
      async (res) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Please confirm your sign in again.',
          buttons: ['OK'],
        });
        await alert.present();
        this.router.navigateByUrl('/movies', { replaceUrl: true });
      },
      async (err) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Please enter correct email and password',
          message: err.message,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }
  // async signUp() {
  //   const loading = await this.loadingController.create();
  //   await loading.present();
  //   this.chatService.signUp(this.credentialForm.value)
  //     .then(
  //       (user) => {
  //         loading.dismiss();
  //         this.router.navigateByUrl('/chat', { replaceUrl: true });
  //       },
  //       async (err) => {
  //         loading.dismiss();
  //         const alert = await this.alertController.create({
  //           header: 'Sign up failed',
  //           message: err.message,
  //           buttons: ['OK'],
  //         });

  //         await alert.present();
  //       }
  //     );
  // }

  get email() {
    return this.credentialForm.get('email');
  }
  get password() {
    return this.credentialForm.get('password');
  }
}
