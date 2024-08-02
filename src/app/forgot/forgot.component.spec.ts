import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotComponent } from './forgot.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiServiceService } from '../services/api-service.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('ForgotComponent', () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;
  let apiService:ApiServiceService;
  let router:Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
        MatIconModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [ForgotComponent],
      providers: [ApiServiceService,{provide: NGXLogger, useClass: class {}}]
    });
    fixture = TestBed.createComponent(ForgotComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ApiServiceService forgotPassword method called', () => {
    spyOn(apiService,'forgot').and.returnValue(of('value'));
    spyOn(router,'navigate');

    component.forgotPassword("");
    expect(apiService.forgot).toHaveBeenCalledTimes(1);
  });
});
