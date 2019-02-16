import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrmListComponent } from "./crm-list.component";
import { CrmDetailComponent } from "./crm-detail.component";
import { CrmComponent } from "./crm";

const routes: Routes = [
    {
        path: '',
        component: CrmListComponent,
        children: [
            {
                path: '',
                component: CrmComponent,
            },
            {
                path: ':id/detail',
                component: CrmDetailComponent,
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CrmRoutingModule { }
