import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { MastListPage } from './mast-list';

@NgModule({
    declarations: [
        MastListPage,
    ],
    imports: [
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
