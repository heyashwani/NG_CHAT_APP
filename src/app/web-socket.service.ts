import { Injectable } from '@angular/core';
import { Observable, observable, Subscriber } from 'rxjs';
import * as io from 'socket.io-client';
// import { io } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  

  socket:any;
  readonly url:string = "http://localhost:4000"
  constructor() { 

    // this.socket = io.connect(this.url)
  }

  listen(eventName:string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName, (data:any) =>{
        subscriber.next(data)
      })
    })
  }

  emit(eventName:string, data:any){
    this.socket.emit(eventName,data)

    
  }
}
