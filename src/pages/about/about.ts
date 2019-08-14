import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CrudProvider } from '../../providers/crud/crud';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  responseData : any;
  userDetails: any;
  //pengganti data model
  userData = {"username":"","password":"","position":"","phone":"","email":"","affiliation":"","datemodified":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: CrudProvider, private toastController: ToastController) {
    //mengambil data dari localstorage
    this.userData = this.navParams.get("menuAccount");
  }


  updateProfile(){
    if(!this.userData.username || !this.userData.password || !this.userData.position || !this.userData.phone || !this.userData.email || !this.userData.affiliation){
      this.showToast("Please fill user profile completely!");
      return null;
    }
    //this.userData.datemodified = Date.now();
    //memanggil method postData yang ada di Provider user:CrudProvider
    let headers = new Headers();
    this.user.postData(this.userData,'user',).then((result)=>{
      this.responseData = result;
      console.log(result);
      if(this.responseData.affectedRows>=1){
          //Jika simpan data berhasil maka munculkan pesan toast
          this.showToast('Update data user berhasil')  
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  //Helper
  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
