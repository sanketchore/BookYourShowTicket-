import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiServiceService } from '../services/api-service.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NGXLogger } from 'ngx-logger';
import { of, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService:ApiServiceService;
  let authService:AuthService;
  let router:Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        MatInputModule,
        MatGridListModule,
        BrowserAnimationsModule
      ],
      declarations: [HomeComponent],
      providers:[ApiServiceService,{provide: NGXLogger, useClass: class {}}]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getAllMovies on initialization', () => {
    spyOn(apiService, 'search').and.returnValue(of([]));

    component.getAllMovies();

    expect(apiService.search).toHaveBeenCalled();
    expect(component.allMovies).toEqual([]);
  });
  it('should call searchByKeyword ', () => {
    spyOn(component, 'getAllMovies');

    component.searchByKeyword("");

    expect(component.getAllMovies).toHaveBeenCalled();
  });
  it('should call onResize ', () => {
    spyOn(component, 'onResize');

    component.onResize("");

    expect(component.onResize).toHaveBeenCalled();
  });
  it('should call bookTickets ', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue('true');
    spyOn(authService, 'setMovie');
    spyOn(router, 'navigate');

    component.bookTickets("");

    expect(authService.setMovie).toHaveBeenCalled();
  });
});
