import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CrmService } from "./crm-service";
import { Profile } from "./crm.model";
@Component({
    selector: 'app-crm-list',
    templateUrl: './crm-list.component.html',
    styleUrls: ['./style.scss']
})
export class CrmListComponent implements  OnDestroy {
    title = 'firestore';
    pending: boolean;
    selectedUser: Profile;
    users: Profile[]
    private unsubscribe$: Subject<void> = new Subject<void>();
    constructor(private crmService: CrmService, private router: Router) {
        this.getUsers()
    }

    displayDetail(user: Profile) {
        this.crmService.selectedUser = user;
        this.router.navigate(["/crm", user.username, "detail"])
    }

    getUsers() {
        this.pending = true;
        this.crmService.getUsers().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
            this.users = res;
            this.pending = false;
        }, error => {
            this.pending = false;
            console.log(error)
        })
    }
    
    // ngOnInit() {
    //     if (this.crmService.selectedUser) {
    //         this.selectedUser = this.crmService.selectedUser
    //     } else {
    //         this.router.navigate(["/crm"])
    //     }
    // }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
