import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieComponent } from './add-movie.component';
import { ApiServiceService } from '../services/api-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { Router } from '@angular/router';


describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;
  let apiService:ApiServiceService;
  let router:Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [AddMovieComponent],
      providers: [ApiServiceService,{provide: NGXLogger, useClass: class {}}]
    });
    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ApiServiceService Addmovie method called', () => {
    spyOn(apiService,'addMovie').and.returnValue(of('value'));
    spyOn(router,'navigate');
    component.addMovie("movie");
    expect(apiService.addMovie).toHaveBeenCalledTimes(1);
  });
});
