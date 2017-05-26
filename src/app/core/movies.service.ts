import { Injectable } from '@angular/core' ;
import { Http, Headers,Response } from '@angular/http';

@Injectable()
export class MoviesService {

  private headers = new Headers({
    'Content-Type': 'application/json'
    });

  body_add = {
    "title": "X-MEN: Days of future past",
    "year": 2013,
    "image": "http://www.lyricis.fr/wp-content/uploads/2014/04/X-Men-Days-of-Future-Past-Professor-X.jpg",
    "actors": [
      "55"
    ]
  };

  body_actor ={
    "name": "",
    "birth_year": 0,
    "image": "",
    "movies":[""]
  };

  constructor(private http:Http) {
  }
  getFilms() {
    return this.http.get("http://infinite-eyrie-37587.herokuapp.com/movies" , {headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  addFilm(body_add : any) {
    this.body_add=body_add;
    console.log(this.body_add);
    return this.http.post("http://infinite-eyrie-37587.herokuapp.com/movies",JSON.stringify(this.body_add), {headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  addActor(body_actor : any) {
    this.body_actor=body_actor;
    return this.http.post("http://infinite-eyrie-37587.herokuapp.com/actors",JSON.stringify(this.body_actor), {headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  deleteFilm(id:string){
    return this.http.delete("http://infinite-eyrie-37587.herokuapp.com/movies/"+id)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }



/*  search(nom:string, lieu:number,offset:number,limit:number):Promise<any> {
    this.body.keyword = nom;
    this.body.region = lieu;
    console.log("keyword: "+this.body.keyword+" region: "+this.body.region+" category: "+this.body.categorizationId);

    return this.http.post("http://vynd-business-api.azurewebsites.net/search?offset="+offset+"&limit="+limit, JSON.stringify(this.body), {headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }*/

  getActors() {
    return this.http.get("http://infinite-eyrie-37587.herokuapp.com/actors" , {headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }






  private extractData(res:Response) {
    //console.log(res);
    let body = res.json();
    //console.log(body);
    return body;
  } ;

  private handleError(error:Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg:string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      console.log("da5la thenya") ;
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
