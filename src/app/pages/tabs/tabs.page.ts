import { Component } from '@angular/core';

import {
    Tab1Root, Tab2Root, Tab3Root, Tab4Root, Tab5Root, Tab1RootFixing, Tab1RootWalking, Tab1RootMonitoring, Tab1RootSwitching
} from '../pages';

import { environment } from '../../../environments/environment';
import { NavParams } from '@ionic/angular';
import { TaskType } from '../../shared/task-type';

@Component({
    templateUrl: 'tabs.page.html',
})
export class TabsPage {

    tab1Root = Tab1Root;
    tab2Root = Tab2Root;
    tab3Root = Tab3Root;
    tab4Root = Tab4Root;
    tab5Root = Tab5Root;

    public clientType = environment.clientType;
    private rootParams: any;

    constructor(private navParams: NavParams) {
        let params = this.navParams.data;
        this.rootParams = { taskType: params && params.taskType };
        switch (params.taskType) {
            case TaskType.Fixing:
                this.tab1Root = Tab1RootFixing;
                break;
            case TaskType.Walking:
                this.tab1Root = Tab1RootWalking;
                break;
            case TaskType.Monitoring:
                this.tab1Root = Tab1RootMonitoring;
                break;
            case TaskType.Switching:
                this.tab1Root = Tab1RootSwitching;
                break;
        }
    }
}
