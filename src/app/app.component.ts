import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { io } from 'socket.io-client';
import * as io from 'socket.io-client';
import { WebSocketService } from './web-socket.service';

declare var $:any;

const SOCKET_ENDPOINT = "http://localhost:4000"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'ang_chat_app';

  msg:any;
  socket: any;

  constructor(private webService:WebSocketService) { }

  ngOnInit(): void {
    // this.webService.listen('chat-message').subscribe((data:any)=>{
    //   if(data){
    //     console.log("msg recieved from server",data)
    //   this.msg = data.message
    //   }
      

    // })


    this.setupSocketConnection()

    
  }

  setupSocketConnection() {
    this.socket = io.connect(SOCKET_ENDPOINT);
    console.log("connection",this.socket)
    this.socket.on('chat-message', (data: any) => {
    if (data) {
      this.comingInsert(data.message)
    
     }
   });
 }

 SendMessage(val:any) {
  this.socket.emit('chat-message', {
    username:"ashwani",
    message:val
  });

  this.myInsert(val)
  
}

myInsert(val:any){
  // var h = document.getElementById("main");
  // h.insertAdjacentHTML("afterend", "<article class='send_box'><p>"+val+"</p></article>"); 

  // $("<article class='send_box'><p>"+val+"</p></article>").insertAfter("#main");
  $('#main').append("<article class='send_box'><p>"+val+"</p></article>");
  console.log("called")
}

comingInsert(val:any){
  var h = document.getElementById("main");


  // h.insertAdjacentHTML("afterend", "<aside class='coming_box'><p>"+val+"</p></aside>"); 
  // insertAfter("<aside class='coming_box'><p>"+val+"</p></aside>",  h.lastChild);

  $('#main').append("<aside class='coming_box'><p>"+val+"</p></aside>");
  console.log("called")
}

  sendMsg(val:any){
    this.webService.emit('chat-message',{
      username:"ashwani",
      message:val
  })
  }
















  display: any;
    center: google.maps.LatLngLiteral = {
        lat: 27.1766701,
        lng: 78.0080745
    };
    zoom = 4;
    moveMap(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.center = (event.latLng.toJSON());
    }
    move(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.display = event.latLng.toJSON();
    }
}
