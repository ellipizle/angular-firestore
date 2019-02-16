import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Profile, ProfileStat } from "./crm.model";
import { Observable } from 'rxjs';
@Injectable()
export class CrmService {
    constructor(private firestore: AngularFirestore) { }
    selectedUser:Profile
    getUsers() {
        return this.firestore.collection<Profile>('profiles').valueChanges();
    }

    getProfileStats(username){
        // this.profile = this.firestore.doc<Profile>('user/david');
        // this.profileStatDoc = this.userDoc.collection<ProfileStat>('profileStats').valueChanges();ng 
        return this.firestore.collection<ProfileStat>(`profiles/${username}/profileStats`).valueChanges();
    }
}