import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SecurityCheckListPage } from './security-check-list';

@NgModule({
    declarations: [
        SecurityCheckListPage,
    ],
    imports: [
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
