import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { ApiServiceService } from '../services/api-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let apiService:ApiServiceService;
  let nGXLogger:NGXLogger;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatTableModule],
      declarations: [AdminComponent],
      providers: [ApiServiceService,{provide: NGXLogger, useClass: class {}}]
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
   
    fixture.detectChanges();
  });
 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllMovies on initialization', () => {
    spyOn(apiService, 'search').and.returnValue(of([]));

    component.ngOnInit();

    expect(apiService.search).toHaveBeenCalled();
    expect(component.allMovies).toEqual([]);
  });
  it('ApiServiceService deleteMovie method called', () => {
    // nGXLogger = TestBed.inject(NGXLogger);
    // spyOn(nGXLogger,'info');
    spyOn(apiService,'deleteMovie').and.returnValue(of('value'));
    component.deleteMovie("movie","");
    expect(apiService.deleteMovie).toHaveBeenCalledTimes(1);
  });
  it('ApiServiceService updateTicketStatus method called', () => {
    // nGXLogger = TestBed.inject(NGXLogger);
    // spyOn(nGXLogger,'info');
    spyOn(apiService,'updateTicketStatus').and.returnValue(of('value'));
    component.updateTicketStatus("movie","");
    expect(apiService.updateTicketStatus).toHaveBeenCalledTimes(1);
  });

});
