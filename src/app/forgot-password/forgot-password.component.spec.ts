import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiServiceService } from '../services/api-service.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let apiService:ApiServiceService;
  let router:Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
        MatSnackBarModule,
        MatIconModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [ForgotPasswordComponent],
      providers: [ApiServiceService,{provide: NGXLogger, useClass: class {}}]
    });
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ApiServiceService forgotPassword method called', () => {
    spyOn(apiService,'forgotPassword').and.returnValue(of('value'));
    spyOn(router,'navigate');

    component.forgot("");
    expect(apiService.forgotPassword).toHaveBeenCalledTimes(1);
  });
});
