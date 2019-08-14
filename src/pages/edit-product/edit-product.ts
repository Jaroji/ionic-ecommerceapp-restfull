import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Product } from '../../models/product/product-model';
import { CrudProvider } from '../../providers/crud/crud';
import { Category } from '../../models/category/category-model';


@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {

  model: Product;
  categories: Category[];
  judul: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private toast: ToastController, private productProvider: CrudProvider, private categoryProvider: CrudProvider) {
    this.model = new Product();
    this.judul = "Add Product";
    if(this.navParams.data.id){
      this.judul = "Edit Product";
      this.productProvider.getData('products',this.navParams.data.id)
      .then((result: any) => {
        //this.model = result;
        this.model.id = this.navParams.data.id;
        this.model.active = result[0].active;
        this.model.name = result[0].name;
        this.model.price = result[0].price;
        this.model.duedate = result[0].duedate;
        this.model.category_id = result[0].category_id;
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
    this.categoryProvider.getData('category')
    .then((result: Category[]) =>{
      this.categories = result;
      console.log(result);
      console.log('berhasil load kategori');
    })
    .catch(() => {
      this.toast.create({
        message: "error load kategori",
        duration: 3000,
        position: "bottom"
      }).present();
    });
  }

  save(){
    this.saveProduct()
    .then(() => {
      this.toast.create({
        message: "Product berhasil disimpan",
        duration: 3000,
        position: "bottom"
      }).present();
      this.viewCtrl.dismiss();
    })
    .catch(()=>{
      this.toast.create({
        message: "Product gagal disimpan",
        duration: 3000,
        position: "bottom"
      }).present();
    });
  }

  private saveProduct(){
    if(this.model.id){
      return this.productProvider.postData(this.model,'products/'+this.model.id);
    }else{
      return this.productProvider.postData(this.model,'products');
    }
  }

}