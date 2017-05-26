import {Component, OnInit, ViewChild} from '@angular/core';
import {MoviesService} from "../core/movies.service";
import {Popup} from "ng2-opd-popup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('popupfilm') popupfilm: Popup;
  @ViewChild('popupactor') popupactor: Popup;
  @ViewChild('addmovie') addmovie: Popup;
  @ViewChild('addactor') addactor: Popup;


  film_clicked = {
    "_id": "",
    "id": 0,
    "title": "tt",
    "year": 91,
    "image": "https://resizing.flixster.com/rISYpBLeHyrIBxMGrgmBLOTOqUo=/206x305/v1.bTsxMTE5MTI3NjtqOzE3MzY0OzEyMDA7NTA5Ozc1NQ",
    "__v": 0,
    "actors": [
      "59049c8a734d1d32590ee1b6"
      ]
  };

  actor_clicked = {
    "_id":"",
    "id": 0,
    "name": "wassim",
    "birth_year": 1994,
    "image": "http://www.famousbirthdays.com/headshots/casey-affleck-2.jpg",
    "__v": 0,
    "movies": [
      "59049e54734d1d32590ee225",
      "59049b5f734d1d32590ee177"
    ]
  };
  actors = [{
    "_id":"",
    "id": 0,
    "name": "test",
    "birth_year": 0,
    "image": "",
    "__v": 0,
    "movies": [
      ""
    ]
  }];

  actors2 = [{
    "_id":"",
    "id": 0,
    "name": "",
    "birth_year": 0,
    "image": "",
    "__v": 0,
    "movies": [
      ""
    ]
  }];

  films = [{
    "_id": "",
    "id": 0,
    "title": "",
    "year": 0,
    "image": "",
    "__v": 0,
    "actors": [
      ""
    ]
  }] ;

  films2 = [{
    "_id": "",
    "id": 0,
    "title": "",
    "year": 0,
    "image": "",
    "__v": 0,
    "actors": [
      ""
    ]
  }] ;

  options = {
    header: "Actor",
    color: "#5cb85c", // red, blue....
    widthProsentage: 40, // The with of the popou measured by browser width
    animationDuration: 1, // in seconds, 0 = no animation
    showButtons: true, // You can hide this in case you want to use custom buttons
    confirmBtnContent: "OK", // The text on your confirm button
    cancleBtnContent: "Cancel", // the text on your cancel button
    confirmBtnClass: "btn btn-default", // your class for styling the confirm button
    cancleBtnClass: "btn btn-default", // you class for styling the cancel button
    animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
  }

  body_add = {
    "title": "",
    "year": 0,
    "image": "",
    actors :[
      ""
    ]
  };
  body_actor ={
    "name": "",
    "birth_year": 0,
    "image": "",
    "movies":[""]
  };


  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.moviesService.getFilms()
      .then(data => {

      this.films=data ;
      console.log(this.films);
        for (let i=0;i<(data.length >=4 ?4:data.length);i++) {
          this.films2.push(data[i]);
        }
        this.films2.shift();
        this.films.sort(function(a, b) {
          return (a.id) - (b.id);
        });
      });

    this.moviesService.getActors()
      .then(data => {
        this.actors=data ;
        for (let i=0;i<(data.length >=4 ?4:data.length);i++) {
          this.actors2.push(data[i]);
        }
        this.actors2.shift();




      });

    this.popupactor.options=this.options ;
    this.popupactor.options.header="Actor" ;
    this.popupfilm.options=this.options;
    this.addmovie.options=this.options;
    this.addactor.options=this.options;
    this.popupfilm.options.header="Film";
    this.addactor.options.header="Add Actor";


  }

  getActorsById (id:string) {
console.log(id);
    if (this.actors.length<2) {return "chargement ..."}
    else {
      return (this.actors.find(x => (x._id == id ))).name;
    }
  }

  getFilmById (id:string) {
    if (this.films.length<2) {return "chargement ..."}
    else {
      return (this.films.find(x => (x._id == id ))).title;
    }
  }

  clickFilm (id:string) {
    if (this.films.find(x => (x._id == id ))) {
      let filmToShow = (this.films.find(x => (x._id == id )));
      this.film_clicked=filmToShow ;
      this.addactor.options.header="Film";
      this.popupfilm.show(this.popupfilm.options);
    }
  }


  clickActor (id:string) {
    if (this.actors.find(x => (x._id == id ))) {
      let actorToShow = (this.actors.find(x => (x._id == id )));
      this.actor_clicked=actorToShow ;
      this.addactor.options.header="Actor";
      this.popupactor.show(this.popupactor.options);
    }
  }

  SubmitMovie() {
    this.moviesService.addFilm(this.body_add).then(data=> {
      console.log(data);
      location.reload();
    });
    console.log(this.body_add);
  }

  AddActor () {
    this.addactor.options.header="Add Actor";
    this.addactor.show(this.addactor.options);
  }

  SubmitActor() {
    this.moviesService.addActor(this.body_actor).then(data=> {
      location.reload();
    });
  }

  AddMovie () {
    this.addactor.options.header="Add Movie";
    this.addmovie.show(this.addmovie.options);
  }

  DeleteFilm (id:string) {
    console.log("delete entered");
    this.moviesService.deleteFilm(id)
      .then(data=> {
        location.reload();
      });
  }
}
