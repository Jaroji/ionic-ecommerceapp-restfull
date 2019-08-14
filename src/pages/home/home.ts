import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, MenuController, ToastController } from 'ionic-angular';
import { CrudProvider } from '../../providers/crud/crud';
import { EditProductPage } from '../edit-product/edit-product';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Product } from '../../models/product/product-model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products:any[] = [];
  product: Product;
  onlyInactives: boolean = false;
  searchText='';
  userDetails: any;
  //pengganti data model
  userData = {"username":"","password":"","position":"","phone":"","email":"","affiliation":"","datemodified":""};


  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, menu: MenuController, private toast: ToastController, private productProvider: CrudProvider, private favoriteProvider: FavoriteProvider) {
    
    menu.enable(true);
    //mengambil data dari localstorage
    const data = JSON.parse(localStorage.getItem('userData')); 
    this.userDetails = data;
    if(this.userDetails!=null){
      this.userData.username = this.userDetails[0].username; 
      this.userData.password = this.userDetails[0].password;
      this.userData.email = this.userDetails[0].email; 
      this.userData.phone = this.userDetails[0].phone;
      this.userData.affiliation = this.userDetails[0].affiliation;
      this.userData.position = this.userDetails[0].position; 
    }

    this.getAllProducts();
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  ionViewDidEnter(){
    this.getAllProducts();
  }

 getAllProducts(){
   this.productProvider.getData('products')
   .then((result:any[])=>{
      this.products = result;
      console.log(result[0]);
   })
   .catch((err)=>{
      console.log(err);
   });
 }

 addProduct(){
  this.navCtrl.push(EditProductPage);
 }

 editProduct(id: number){
  this.navCtrl.push(EditProductPage, {id: id});
 }

 removeProduct(param){
   this.productProvider.deleteData('products',param.id)
   .then((result)=>{
        this.toast.create({
          message: 'Product telah dihapus.',
          duration: 3000,
          position: 'bottom'
        }).present();
   })
   .catch((err)=>{
    this.toast.create({
      message: 'Product gagal dihapus.',
      duration: 3000,
      position: 'bottom'
    }).present();
   });
 }

 filterProducts(ev: any){
    this.productProvider.getData('productsearch',this.searchText)
    .then((result:any[])=>{
      this.products = result;
      console.log(result[0]);
    })
    .catch((err)=>{
      console.log(err);
    });
 }

 addToFavorite(product: Product){
   this.favoriteProvider.get(product.id).then((result: boolean)=>{
     if(result){
       console.log("Product sudah menjadi favorite :", result);
        this.toast.create({
          message: "Product sudah menjadi favorite!",
          duration: 3000,
          position: "bottom"
        }).present();
     }else{
        console.log("Product belum favorite!");
        this.favoriteProvider.addFavorite(product).then(() => {
          this.toast.create({
            message: "Product berhasil ditambahkan ke favorite!",
            duration: 3000,
            position: "bottom"
          }).present();
        });
     }
     this.getAllProducts();
   });
  }
}
