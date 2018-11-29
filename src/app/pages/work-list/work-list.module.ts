import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { WorkListPage } from './work-list';
import { WorkListService } from './work-list.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        WorkListPage,
    ],
    imports: [
        SharedModule,
        IonicModule,
        TranslateModule.forChild()
    ],
    exports: [
        WorkListPage
    ],
    providers: [
        WorkListService
    ]
})
export class WorkListPageModule { }