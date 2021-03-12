import { ChatService } from '../../services/chat.service';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
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
  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.chatService.signUp(this.credentialForm.value).then(
      async (user) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Please confirm your sign up again.',
          buttons: ['OK'],
        });
        await alert.present();
        this.router.navigateByUrl('/movies', { replaceUrl: true });
      },
      async (err) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Please enter correct email and password',
          // message: err.message,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  get email() {
    return this.credentialForm.get('email');
  }
  get password() {
    return this.credentialForm.get('password');
  }
}
