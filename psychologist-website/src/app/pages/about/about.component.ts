import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PersonCardComponent } from './person-card/person-card.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subject, catchError, switchMap, takeUntil, tap, throwError } from 'rxjs';
import { AboutService, TeamMember } from './about.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FancyButtonComponent } from '../../shared/components/fancy-button/fancy-button.component';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FancyButtonComponent, PersonCardComponent, ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})

export class AboutComponent implements OnInit, OnDestroy {
  @ViewChild('imageInput') imageInput!: ElementRef

  teamMemberForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    tags: new FormControl(''),
    link: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  })
  teammates$!: Observable<TeamMember[]>
  destroy$ = new Subject<void>()

  constructor(private aboutService: AboutService, private alertService: AlertService) { }

  ngOnInit() {
    this.teammates$ = this.aboutService.getTeammates()
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files?.length) {
      //@ts-ignore
      this.teamMemberForm.patchValue({ image: input.files[0] })
    }
  }

  onSubmit() {
    const formValue = this.teamMemberForm.value
    //@ts-ignore //as unknown?
    const file = formValue.image as File

    this.aboutService.uploadFile(file).pipe(
      switchMap((url) => {
        const teamMember: TeamMember = {
          //@ts-ignore
          name: formValue.name,
          //@ts-ignore
          description: formValue.description,
          //@ts-ignore
          tags: formValue.tags.split(','),
          //@ts-ignore
          link: formValue.link,
          img: url
        }
        return this.aboutService.addOrUpdateTeamMember(teamMember)
      }),
      tap(() => {
        this.alertService.showSuccess('Użytkownik dodany pomyślnie.')
        this.teamMemberForm.reset()
        if (this.imageInput && this.imageInput.nativeElement) {
          this.imageInput.nativeElement.value = ''
        }
      }),
      catchError((err: HttpErrorResponse | string) => {
        this.alertService.showErrorMessage(err)
        return throwError(() => err)
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  editTeammate(teamMember: TeamMember) {
    this.teamMemberForm.setValue({
      name: teamMember.name,
      description: teamMember.description,
      tags: teamMember.tags.join(','),
      image: teamMember.img,
      link: teamMember.link
    })
    this.teamMemberForm.patchValue({ image: null })
  }

  deleteTeammate(teamMember: TeamMember){
    if(confirm('Czy na pewno chcesz usunąć współpracownika ' + teamMember.name + '?')) {
        this.aboutService.removeFile(teamMember.img).pipe(
            switchMap(() => this.aboutService.removeTeamMember(teamMember)),
            tap(() => this.alertService.showSuccess('Użytkownik usunięty pomyślnie.')),
            catchError((err: HttpErrorResponse | string) => {
                this.alertService.showErrorMessage(err)
                return throwError(() => err)
            }),
            takeUntil(this.destroy$)
        ).subscribe() 
    }
}
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}