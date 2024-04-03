import { Injectable } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Observable, first, from, map, switchMap } from 'rxjs';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})

export class AboutService {
    constructor(private storage: Storage, private firestore: Firestore) { }

    //   getQuote(): Observable<TeamMember[]> {
    //     const contactDocRef = doc(this.firestore, 'collection/people')
    //     return docData(contactDocRef).pipe(map((response: any) => response.teammates as TeamMember[]))
    //   }
    getTeammates(): Observable<TeamMember[]> {
        const peopleDocRef = doc(this.firestore, 'collection/people')
        return docData(peopleDocRef, { idField: 'id' }).pipe(
          map((response: any) => response.teammates || [])
        )
      }

    uploadFile(file: File) {
        const filePath = `teamMembers/${new Date().getTime()}_${file.name}`
        const storageRef = ref(this.storage, filePath)

        const uploadTask = uploadBytesResumable(storageRef, file)

        //@ts-ignore
        return from(uploadTask).pipe(
            switchMap((result) => getDownloadURL(result.ref))
        )
    }

    addOrUpdateTeamMember(teamMember: TeamMember) {
        const peopleDocRef = doc(this.firestore, 'collection/people')
        return docData(peopleDocRef, { idField: 'id' }).pipe(
            first(),
            switchMap((doc: any) => {
              const existingTeamMembers: TeamMember[] = doc.teammates || []
              const index = existingTeamMembers.findIndex(t => t.name === teamMember.name)
      
              if (index > -1) {
                existingTeamMembers[index] = teamMember
              } else {
                existingTeamMembers.push(teamMember)
              }
              return from(setDoc(peopleDocRef, { teammates: existingTeamMembers }))
            })
          )
    }
}

export interface TeamMember {
    name: string,
    tags: string[]
    description: string
    link: string
    img: string
}
