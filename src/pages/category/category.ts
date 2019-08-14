import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CrudProvider } from '../../providers/crud/crud';
import { EditCategoryPage } from '../edit-category/edit-category';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  categories : any[];
  userData:any;
  
  constructor(public navCtrl:NavController,public navParams: NavParams, public crudService: CrudProvider,public toast: ToastController) {
    this.userData = this.navParams.get("menuAccount");
    this.getAllCategory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter CategoryPage');
    this.getAllCategory();
  }

  getAllCategory(){
    this.crudService.getData('category').then((result:any[])=>{
      this.categories = result;
    });
  }

  addCategory(){
    this.navCtrl.push(EditCategoryPage);
  }

  editCategory(category_id: number){
    this.navCtrl.push(EditCategoryPage, {id: category_id});
  }

  removeCategory(param:any){
    this.crudService.deleteData('category',param.id).then((result:any[])=>{
      this.toast.create({
          message: 'Category telah dihapus.',
          duration: 3000,
          position: 'bottom'
        }).present();
        this.getAllCategory();
      })
      .catch((err)=>{
          this.toast.create({
            message: 'Category gagal dihapus.',
            duration: 3000,
            position: 'bottom'
          }).present();
    });
  }
}
