import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { CrudProvider } from '../../providers/crud/crud';
import { Category } from '../../models/category/category-model';

@Component({
  selector: 'page-edit-category',
  templateUrl: 'edit-category.html',
})
export class EditCategoryPage {

  judul: string;
  category:any;
  categoryData : Category;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private toast: ToastController, private crudService:CrudProvider) {
    this.judul = "Add Category";
    this.categoryData = new Category();
    if(this.navParams.data.id){
      this.judul = "Edit Category";
      this.crudService.getData('category',navParams.data.id).then((result)=>{
        this.category = result;
        this.categoryData.name = result[0].name;
        this.categoryData.id = result[0].id;
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCategoryPage');
  }

  save(){
    this.saveCategory().then(() => {
      this.toast.create({
        message: "Category berhasil disimpan",
        duration: 3000,
        position: "bottom"
      }).present();
      this.viewCtrl.dismiss();
    }).catch(()=>{
      this.toast.create({
        message: "Category gagal disimpan",
        duration: 3000,
        position: "bottom"
      }).present();
    });
  }

  private saveCategory(){
    if(this.categoryData.id){
      return this.crudService.postData(this.categoryData,'category/'+this.categoryData.id);
    }else{
      return this.crudService.postData(this.categoryData,'category');
    }
  }

}