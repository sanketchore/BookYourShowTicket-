import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiServiceService } from '../services/api-service.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let apiService:ApiServiceService;
  let router:Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
      MatSnackBarModule,
      FormsModule,
      MatInputModule,
      MatIconModule,
      BrowserAnimationsModule
      ],
      declarations: [RegisterComponent],
      providers:[ApiServiceService,{provide: NGXLogger, useClass: class {}}]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ApiServiceService register method called', () => {
    spyOn(apiService,'register').and.returnValue(of('value'));
    spyOn(router,'navigate');

    component.register("movie");
    expect(apiService.register).toHaveBeenCalledTimes(1);
  });
});
