import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTicketsComponent } from './my-tickets.component';
import { ApiServiceService } from '../services/api-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';

describe('MyTicketsComponent', () => {
  let component: MyTicketsComponent;
  let fixture: ComponentFixture<MyTicketsComponent>;
  let apiService:ApiServiceService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatGridListModule
      ],
      declarations: [MyTicketsComponent],
      providers: [ApiServiceService,{provide: NGXLogger, useClass: class {}}]
    });
    fixture = TestBed.createComponent(MyTicketsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call viewTickets on initialization', () => {
    spyOn(apiService, 'viewTickets').and.returnValue(of([]));

    component.viewTickets();

    expect(apiService.viewTickets).toHaveBeenCalled();
    expect(component.myTickets).toEqual([]);
  });
});
