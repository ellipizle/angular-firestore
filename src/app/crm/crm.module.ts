import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CrmListComponent } from "./crm-list.component";
import { CrmDetailComponent } from "./crm-detail.component";
import { CrmComponent } from "./crm";
import { CrmRoutingModule } from './crm-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { CrmService } from "./crm-service";
import {
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
} from '@angular/material';
@NgModule({
    imports: [
        CommonModule,
        CrmRoutingModule,
        NgxEchartsModule,
        MatCardModule,
        MatDividerModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
    ],
    declarations: [
        CrmListComponent,
        CrmComponent,
        CrmDetailComponent
    ],
    providers: [
        CrmService
    ]
})
export class CrmModule { }
