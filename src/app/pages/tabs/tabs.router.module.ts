import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { CurrentTaskPage } from '../current-task/current-task';
import { MyTaskPage } from '../my-task/my-task';
import { AddTaskPage } from '../add-task/add-task';

const routes: Routes = [
    {
        path: 'tabs/:taskType',
        component: TabsPage,
        redirectTo: 'tabs/:taskType/current-task',
        children: [
            {
                path: ':taskType/current-task',
                outlet: 'current-task',
                component: CurrentTaskPage
            },
            {
                path: ':taskType/my-task',
                outlet: 'my-task',
                component: MyTaskPage
            },
            {
                path: ':taskType/add-task',
                outlet: 'add-task',
                component: AddTaskPage
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
