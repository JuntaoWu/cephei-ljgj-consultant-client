import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { MastListPage } from './mast-list';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        MastListPage,
    ],
    imports: [
        SharedModule,
        IonicModule,
        TranslateModule.forChild()
    ],
    exports: [
        MastListPage,
    ],
    providers: [

    ]
})
export class MastListPageModule { }
