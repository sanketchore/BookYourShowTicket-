import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('setMovie And getMovie', () => {
    const setmovie = { movieName: 'Avatar', theatre: 'Prithvi Theatre' };
    service.setMovie(setmovie);
    let movie=service.getMovie();
      expect(movie).toEqual(setmovie);
   
  });
  it('setCustomer And getCustomer', () => {
    const customer = { name: 'John Doe', email: 'john@example.com' };
    service.setCustomer(customer);
    let res=service.getCustomer();
      expect(res).toEqual(customer);
   
  });
  it('setRole And getRole', () => {
    service.setRole("ADMIN");
    let res=service.getRole();
      expect(res).toEqual("ADMIN");
   
  });
  it('setUserName And getUserName', () => {

    service.setUserName("12");
    let res=service.getUserName();
      expect(res).toEqual("12");
   
  });
  it('setToken And getToken', () => {
    service.setToken("customer");
    let res=service.getToken();
      expect(res).toEqual("customer");
   
  });
  it('isLoggedIn', () => {
    service.setRole("ADMIN");
    let role=service.getRole();
    service.setToken("customer");
    let token=service.getToken();
    let res=service.isLoggedIn();
      expect(res).toEqual(role&&token);
   
  });
  it('setCustomer And getCustomer', () => {
    const customer = { name: 'John Doe', email: 'john@example.com' };
    service.setCustomer(customer);
    let res=service.getCustomer();
      expect(res).toEqual(customer);
   
  });
  it('setCustomer And getCustomer', () => {
    const customer = { name: 'John Doe', email: 'john@example.com' };
    service.setCustomer(customer);
    let res=service.getCustomer();
      expect(res).toEqual(customer);
   
  });
});
