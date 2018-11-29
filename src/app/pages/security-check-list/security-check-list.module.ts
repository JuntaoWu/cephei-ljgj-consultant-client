import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SecurityCheckListPage } from './security-check-list';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        SecurityCheckListPage,
    ],
    imports: [
        SharedModule,
        IonicModule,
        TranslateModule.forChild()
    ],
    exports: [
        SecurityCheckListPage,
    ],
    providers: [

    ]
})
export class SecurityCheckListPageModule { }
