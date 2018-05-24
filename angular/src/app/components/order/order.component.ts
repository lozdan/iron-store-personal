import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CookieService } from '../../services/cookie.service';
import { SessionService } from '../../services/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private myOrders: OrderService,
    private myCookie: CookieService,
    private mySession: SessionService
  ) { }

  ngOnInit() {
    if (this.myCookie.getCookie("user"))
      console.log(JSON.parse(this.myCookie.getCookie('user')));
  }

  newOrder() {
    const products = JSON.parse(this.myCookie.getCookie("browser__settings"));
    let subtotal = 0;
    let tax = 6;

    products.forEach( singleProduct => {
      subtotal += singleProduct.price;
    })

    const order = {
      userId: JSON.parse(this.myCookie.getCookie("user"))._id,
      products: products,
      tax: tax,
      subtotal: subtotal,
      total: (subtotal * tax) / 100
    }

    this.myOrders.createOrder(order)
      .subscribe(
        order => console.log(order),
        err => console.log(err)
      );
  }

}