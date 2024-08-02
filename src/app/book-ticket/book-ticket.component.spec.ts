import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTicketComponent } from './book-ticket.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiServiceService } from '../services/api-service.service';
import { AuthService } from '../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { NGXLogger } from 'ngx-logger';
import { of, window } from 'rxjs';
import { Router } from '@angular/router';

describe('BookTicketComponent', () => {
  let component: BookTicketComponent;
  let fixture: ComponentFixture<BookTicketComponent>;
  // let authService : jasmine.SpyObj<AuthService>;
  let apiService:ApiServiceService;
  let authService:AuthService;
  let router:Router;
  // let window:any;
  
  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService',['getMovie','getUserName']);
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        MatIconModule
      ],
      declarations: [BookTicketComponent],
      providers:[ApiServiceService,AuthService,
        // {provide:AuthService,useValue:authSpy},
        {provide: NGXLogger, useClass: class {}}
      ]
    });

    // authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    // authService.getMovie.and.returnValue({
    //   movieId:{
    //     movieName:'testMovie',
    //     theatreName:'testTheatre'
    //   },
    //   id:1,
    //   imageUrl:'someString',
    //   costOfTicket:100,
    // noOfTicketsAllotted:100,
    // noOfTicketsSold: 2,
    // ticketStatus:'Book ASAP'    
    // });

    fixture = TestBed.createComponent(BookTicketComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
    authService = TestBed.inject(AuthService);
    // window = TestBed.inject(window);
    router = TestBed.inject(Router);
    // spyOn(authService,'getUserName').and.returnValue({movieName:"",theatreName:""})
    spyOn(authService,'getUserName');
    let totalSeats:any[]=[];
    spyOn(totalSeats,'forEach');
    spyOn(authService,'getMovie').and.returnValue({movieName:"",theatreName:"",imageUrl:""});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ApiServiceService getSeatsByMovie method called', () => {
    spyOn(apiService,'getSeatsByMovie').and.returnValue(of([]));
    component.getAllSeatsByMovie();
    expect(apiService.getSeatsByMovie).toHaveBeenCalledTimes(1);
  });
  it('ApiServiceService bookTicket method called', () => {
    spyOn(apiService,'bookTicket').and.returnValue(of('value'));
    spyOn(router,'navigate');
    // spyOn(window,'confirm').and.returnValue(true);
    component.bookTickets();
    expect(apiService.bookTicket).toHaveBeenCalledTimes(1);
  });
  it('ApiServiceService toggleSeatSelection method called', () => {
    // spyOn(apiService,'getSeatsByMovie').and.returnValue(of('value'));
    component.toggleSeatSelection("");
    // expect(apiService.getSeatsByMovie).toHaveBeenCalledTimes(1);
  });
  it('ApiServiceService initializeMatrix method called', () => {
    // spyOn(apiService,'getSeatsByMovie').and.returnValue(of('value'));
    component.initializeMatrix();
    // expect(apiService.getSeatsByMovie).toHaveBeenCalledTimes(1);
  });
});