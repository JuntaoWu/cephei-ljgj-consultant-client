import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', pathMatch: 'full' },
    { path: 'version-check', loadChildren: './pages/version-check/version-check.module#VersionCheckPageModule', pathMatch: 'full' },
    { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', pathMatch: 'full' },
    { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule', pathMatch: 'full' },
    { path: 'hero', loadChildren: './pages/hero/hero.module#HeroPageModule' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
