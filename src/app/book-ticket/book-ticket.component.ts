import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  movieName = '';
  theatreName = '';
  noOfTicketsAvailable = 0;
  totalSeats: any = [];
  rows = 0;
  cols = 15;
  seatArray: any[][]=[];
  // seatArray: any[][] = []
  selectedSeats:any[] = [];
  booked=0;
ticket:any = {}

  ngOnInit(): void {
    this.movieName = this.auth.getMovie().movieName;
    this.theatreName = this.auth.getMovie().theatreName;
    this.noOfTicketsAvailable = this.auth.getMovie().noOfTicketsAvailable;
    this.getAllSeatsByMovie();
    this.seatArray=this.initializeMatrix();
  } 

  constructor(
    private api: ApiServiceService,
    private auth: AuthService,
    private router : Router,
    private logger : NGXLogger
  ) { 
    this.ticket = {
      "loginId":this.auth.getUserName(),
      "movieName": this.auth.getMovie().movieName,
      "theatreName": this.auth.getMovie().theatreName,
      "seatNumber":this.selectedSeats,
      "noOfTickets":0,
      "imageUrl":this.auth.getMovie().imageUrl
    }
  }
 
  

  public getAllSeatsByMovie() {
    this.api.getSeatsByMovie(this.movieName, this.theatreName).subscribe(
      (response: any) => {
        this.totalSeats = response;
    
        this.totalSeats.forEach((seat:any) => {
          let row=Math.floor((parseInt(seat,10)-1)/10);
          let col=((parseInt(seat,10)-1)%10);
          this.seatArray[row][col]=false;
          this.booked++
          
        });
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  toggleSeatSelection(seatInp:any): void {
    
      if(this.selectedSeats.includes(seatInp)){
        this.selectedSeats=this.selectedSeats.filter(ele=>ele!=seatInp)
      }else{this.selectedSeats.push(seatInp);}
  
    }
   
  

  initializeMatrix(rows: number=6, cols: number=10): any[][] {
    let matrix:any []=[];
    for (let i = 0; i < rows; i++) {
      matrix[i] = [];
      for (let j = 0; j < cols; j++) {
        matrix[i][j] = true; // Initialize with null or any default value
      }
    }
    return matrix;
  }
  bookTickets() {
    this.ticket.noOfTickets = this.selectedSeats.length;
    this.api.bookTicket(this.ticket).subscribe(
      (response) => {
     
        if(confirm("Tickets Booked !!")){this.router.navigate(['/my-tickets']);}
     
      },
      (error) => {
        Swal.fire({
          title:error.error,
          icon:'warning'
        });
        this.logger.error(error.error);
      }
    )
  }

  generateSeatMap(rows: number, seatsPerRow: number): any[][] {
    let len:number = this.totalSeats.length-1;
    console.log(len);
    const seatList: any[][] = [];
    for (let i = 0; i < rows; i++) {
      const element = [];
      for (let j = 0; j < seatsPerRow; j++) {
        if (len >= 0) {
          // console.log(this.totalSeats[len]);
          element.push(this.totalSeats[len]);
          len--;
        }else{
          break;
        }
      }
      seatList.push(element);
    }
    return seatList;
  }

}
