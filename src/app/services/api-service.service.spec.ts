import { TestBed, tick } from '@angular/core/testing';

import { ApiServiceService } from './api-service.service';
import { HttpClientTestingModule, HttpTestingController,  } from '@angular/common/http/testing';

describe('ApiServiceService', () => {
  let service: ApiServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers:[ApiServiceService]
    });
    service = TestBed.inject(ApiServiceService);
    httpMock = TestBed.inject(HttpTestingController);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to register', () => {
    const customer = { name: 'John Doe', email: 'john@example.com' };
    const response = 'Success';

    service.register(customer).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/v1.0/moviebooking/register');
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });



 

  it('should send a POST request to login', () => {
    const customer = { name: 'John Doe', email: 'john@example.com' };
    const response = 'Success';

    service.login(customer).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/v1.0/moviebooking/login');
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('should send a GET request to search', () => {
    const movieName="Avtar";
    const response = 'Success';
    service.search(movieName).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne("http://localhost:9090/api/v1.0/moviebooking/movies/search/" + movieName);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should send a GET request to searchByMovieId', () => {
    const movieName = "Avatar";
    const theatreName = "Prithvi Theatre";
    const response = 'Success';

    service.searchByMovieId(movieName,theatreName).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/v1.0/moviebooking/moviebooking/search/'+movieName+"/"+theatreName);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should send a POST request to forgotPassword', () => {
    const userName = "123";
    const password = "123";
    const response = 'Success';

    service.forgotPassword(userName,password).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/v1.0/moviebooking/' + userName + '/change');
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('should send a POST request to addMovie', () => {
    const addMovie = "Avatar";
    const response = 'Success';

    service.addMovie(addMovie).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/v1.0/moviebooking/addMovie');
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('should send a DELETE request to deleteMovie', () => {
    const movieName = "Avatar";
    const theatreName = "Prithvi Theatre";
    const response = 'Success';

    service.deleteMovie(movieName,theatreName).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/v1.0/moviebooking/'+ movieName + '/' + theatreName+'/delete');
    expect(req.request.method).toBe('DELETE');
    req.flush(response);
  });

  it('should send a PUT request to updateTicketStatus', () => {
    const movieName = "Avatar";
    const theatreName = "Prithvi Theatre";
    const response = 'Success';

    service.updateTicketStatus(movieName,theatreName).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/v1.0/moviebooking/'+ movieName + '/' + theatreName+'/update');
    expect(req.request.method).toBe('PUT');
    req.flush(response);
  });

  it('should send a GET request to viewTickets', () => {
    
    const response = 'Success';

    service.viewTickets().subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/v1.0/moviebooking/all/12');
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });
  it('should send a POST request to bookTicket', () => {
    const ticket = { movieName: 'Avatar', theaterName: 'Prithvi Theatre' };
    const response = 'Success';

    service.bookTicket(ticket).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/v1.0/moviebooking/'+ticket.movieName+'/add');
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });
  it('should send a GET request to getSeatsByMovie', () => {
    const movieName = "Avatar";
    const theatreName = "Prithvi Theatre";
    const response = 'Success';

    service.getSeatsByMovie(movieName,theatreName).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/v1.0/moviebooking/getallbookedtickets/'+movieName+"/"+theatreName);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });
  it('should send a GET request to getTicketById', () => {
    const ticketId = 12;
    const response = 'Success';

    service.getTicketById(ticketId).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/v1.0/moviebooking/moviebooking/ticketById/'+ticketId);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

});
