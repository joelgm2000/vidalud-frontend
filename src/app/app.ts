import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar }     from './components/navbar/navbar';
import { SiteFooter } from './components/site-footer/site-footer';
import { OrderForm }  from './components/order-form/order-form';
import { LegalModal } from './components/legal-modal/legal-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, SiteFooter, OrderForm, LegalModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
