import { Component } from '@angular/core';
import { Navbar }       from './components/navbar/navbar';
import { Hero }         from './components/hero/hero';
import { Info }         from './components/info/info';
import { Reels }        from './components/reels/reels';
import { Testimonials } from './components/testimonials/testimonials';
import { SiteFooter }   from './components/site-footer/site-footer';
import { OrderForm }    from './components/order-form/order-form';
import { LegalModal }   from './components/legal-modal/legal-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, Hero, Info, Reels, Testimonials, SiteFooter, OrderForm, LegalModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
