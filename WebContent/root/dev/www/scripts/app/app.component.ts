///<reference path="_references.ts"/>
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app',
    template: `
    <header class="main-header">
        <a class="logo" href="http://arccompetition.ajdeveloppement.org">
            <span class="logo-mini"><b>A</b>C</span>
            <span class="logo-lg"><b>Arc</b>Competition</span>
        </a>
         <nav class="navbar navbar-static-top" role="navigation">
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <!---->
            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li><a href="#"><i class="fa fa-gears"></i></a></li>
                </ul>
            </div>
            <div class="navbar-custom-menu navbar-titre navbar-custom-menu-left">Gestion des competitions de Tir à l'Arc</div>
        </nav>
    </header>
   
    <!-- Sidebar -->
    <aside class="main-sidebar">
        <!-- user panel (Optional) -->
        <div class="logo-panel">
        <div class="image">
            <img src="images/fnd.jpg" alt="ArcCompetion" />
        </div>
        <!--<div class="pull-left info">
            <span class="masquable"><br />Gestion des competitions de Tir à l'Arc</span>
        </div>-->
        </div>

        <!-- Search Form (Optional) -->
        <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
            <input type="text" name="q" class="form-control" placeholder="Recherche...">
            <span class="input-group-btn">
            <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
            </span>
        </div>
        </form>

        <ul class="sidebar-menu">
            <li class="header">Gestion</li>
            <li [routerLinkActive]="['active']"><a [routerLink]="['dashboard']"><i class="fa fa-dashboard"></i><span>Tableau de bord</span></a></li>
            <li [routerLinkActive]="['active']"><a [routerLink]="['competition']"><i class="fa fa-asterisk"></i><span>Compétitions</span></a></li>

            <li class="header">Base de données</li>
            <li [routerLinkActive]="['active']"><a [routerLink]="['persons']"><i class="fa fa-users"></i><span>Personnes</span></a></li>
            <li [routerLinkActive]="['active']"><a [routerLink]="['entities']"><i class="fa fa-building"></i><span>Entités</span></a></li>
            <li [routerLinkActive]="['active']"><a [routerLink]="['rules']"><i class="fa fa-book"></i><span>Réglements</span></a></li>

            <li class="header">Divers</li>
            <li [routerLinkActive]="['active']"><a [routerLink]="['importexport']"><i class="fa fa-refresh"></i><span>Import/Export</span></a></li>
            <li [routerLinkActive]="['active']"><a [routerLink]="['tools']"><i class="fa fa-briefcase"></i><span>Outils</span></a></li>
        </ul>
    </aside>
    <div class="content-wrapper">
        <router-outlet></router-outlet>     
    </div>
    `
})
export class AppComponent implements OnInit {
    constructor(private route : ActivatedRoute) {

    }

    ngOnInit() {
        //this.route.
    }
}