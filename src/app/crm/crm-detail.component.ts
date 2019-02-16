import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from "@angular/router";
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CrmService } from "./crm-service";
import { Profile, ProfileStat } from "./crm.model";
import { Router } from "@angular/router";
@Component({
    selector: 'app-crm-detail',
    templateUrl: './crm-detail.component.html',
    styleUrls: ['./style.scss']
})
export class CrmDetailComponent implements OnInit, OnDestroy {
    selectedUser: Profile;
    private unsubscribe$: Subject<void> = new Subject<void>();
    pending: boolean
    detail: Observable<Profile>;
    stat: Observable<ProfileStat>;
    public line: any;

    constructor(
        private crmService: CrmService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
            const id = res["id"]
            this.getProfileStat(id)
        })
    }

    getProfileStat(id: string) {
        this.pending = true;
        this.crmService.getProfileStats(id).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(res => {
            this.pending = false;
            this.realFormat(res)
        }, error => {
            this.pending = false;
            console.log(error)
        })
    }

    realFormat(arr: ProfileStat[]) {
        let time = []
        let posts = []
        let followers = []
        let following = []
        for (var i = 0; i < arr.length; i++) {
            // let d = new Date(arr[i].when * 1000)
            time.push(new Date(arr[i].when).toLocaleDateString("en-US"))
            // time.push(d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear())
            posts.push(arr[i].posts)
            following.push(arr[i].following)
            followers.push(arr[i].followers)
        }
        let chartOptionx = {
            tooltip: {
                feature: {
                    saveAsImage: {}
                },
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['posts', 'followers', 'following']
            },
            dataZoom: [{
                show: true,
            }],
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: time
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    // interval: 1000
                }
            ],
            series: [
                {
                    name: 'posts',
                    type: 'line',
                    // areaStyle: { normal: {} },
                    data: posts,

                },
                {
                    name: 'followers',
                    type: 'line',
                    // areaStyle: { normal: {} },
                    data: followers
                },
                {
                    name: 'following',
                    type: 'line',
                    // areaStyle: { normal: {} },
                    data: following,
                },
            ]
        };
        this.line = chartOptionx;
        // return { time: time, posts: posts, followers: followers, following: following }
    }

    ngOnInit() {
        if (this.crmService.selectedUser) {
            this.selectedUser = this.crmService.selectedUser
        } else {
            this.router.navigate(["/crm"])
        }
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
