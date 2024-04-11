import { Injectable } from '@angular/core';
import { Firestore, arrayRemove, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, first, from, map, switchMap } from 'rxjs';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})

export class AboutService {
    constructor(private storage: Storage, private firestore: Firestore) { }

    getTeammates(): Observable<TeamMember[]> {
        const peopleDocRef = doc(this.firestore, 'collection/people')
        return docData(peopleDocRef, { idField: 'id' }).pipe(
          map((response: any) => response.teammates || [])
        )
      }

    uploadFile(file: File) {
        const filePath = `teamMembers/${file.name}`
        const storageRef = ref(this.storage, filePath)

        const uploadTask = uploadBytesResumable(storageRef, file)

        //@ts-ignore
        return from(uploadTask).pipe(
            switchMap((result) => getDownloadURL(result.ref))
        )
    }

    removeFile(fileUrl: string) {
        const fileRef = ref(this.storage, fileUrl)
        return from(deleteObject(fileRef))
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

    removeTeamMember(teamMember: TeamMember): Observable<void> {
        const peopleDocRef = doc(this.firestore, 'collection/people');
        return from(updateDoc(peopleDocRef, {
          teammates: arrayRemove(teamMember)
        }))
    }
}

export interface TeamMember {
    name: string,
    tags: string[]
    description: string
    link: string
    img: string
}
