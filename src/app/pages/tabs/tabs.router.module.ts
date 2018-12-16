import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { HeroPage } from '../hero/hero.page';

const routes: Routes = [
    {
        path: 'root',
        component: TabsPage,
        children: [
            { path: '', redirectTo: '/tabs/root/(home:home)', pathMatch: 'full' },
            { path: 'home', outlet: 'home', component: HomePage },
            { path: 'hero', outlet: 'hero', component: HeroPage },
        ],
    },
    {
        path: '',
        redirectTo: '/tabs/root/(home:home)',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
