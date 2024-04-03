import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonCardComponent } from './person-card/person-card.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subject, catchError, switchMap, take, takeUntil, tap, throwError } from 'rxjs';
import { AboutService, TeamMember } from './about.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, PersonCardComponent, ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})

export class AboutComponent implements OnInit, OnDestroy {

  teamMemberForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    tags: new FormControl(''),
    link: new FormControl('', Validators.required),
    image: new FormControl(null, Validators.required)
  })
  teammates$!: Observable<TeamMember[]>
  destroy$ = new Subject<void>()
  
  constructor(private aboutService: AboutService, private alertService: AlertService) {}

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
        };
        return this.aboutService.addOrUpdateTeamMember(teamMember);
      }),
      tap(() => {
        this.alertService.showSuccess('Użytkownik dodany pomyślnie.')
        this.teamMemberForm.reset()
      }),
      catchError((err: HttpErrorResponse | string) => {
        this.alertService.showErrorMessage(err)
        return throwError(() => err)
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  editTeammate(teammate: TeamMember){

  }
  
  deleteTeammate(teammate: TeamMember){

  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}