import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'environments/environment';

const routes: Routes = [
    { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', pathMatch: 'full' },
    { path: 'version-check', loadChildren: './pages/version-check/version-check.module#VersionCheckPageModule', pathMatch: 'full' },
    { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: !environment.production })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
