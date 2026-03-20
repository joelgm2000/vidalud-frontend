import { Component } from '@angular/core';
import { Navbar }       from './components/navbar/navbar';
import { Ticker }       from './components/ticker/ticker';
import { Hero }         from './components/hero/hero';
import { Features }     from './components/features/features';
import { Testimonials } from './components/testimonials/testimonials';
import { OrderForm }    from './components/order-form/order-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Navbar,
    Ticker,
    Hero,
    
    Testimonials
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}