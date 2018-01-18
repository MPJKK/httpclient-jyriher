import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-http-test',
    templateUrl: './http-test.component.html',
    styleUrls: ['./http-test.component.scss']
})
export class HttpTestComponent implements OnInit {

    tulos = 'Moro';
    apitulos = 'Moro taas!';
    lentotulos = [];
    apiosoite = 'http://media.mw.metropolia.fi/wbma';
    kuvaosoite = 'http://media.mw.metropolia.fi/wbma/uploads/';
    flightResults = 'http://impact.brighterplanet.com';

    constructor(private http: HttpClient) {
    }

    getJson() {
        interface Myinterface {
            license: string;
        }

        this.http.get<Myinterface>('assets/package.json').subscribe((data) => {
            console.log(data);
            this.tulos = data.license;
        });
    }

    getFlightData() {
        interface Myinterface {
            decisions: any;
        }

        this.http.get<Myinterface>(this.flightResults + '/flights.json').subscribe(data => {
            console.log(data);
            this.lentotulos.push(data);
            console.log(this.lentotulos);
        });
    }

    getFromApi() {
        this.http.get(this.apiosoite + '/media').subscribe(data => {
            console.log(data[0].filename);
            this.apitulos = this.kuvaosoite + data[0].filename;
        });
    }

    ngOnInit() {
        this.getJson();
        this.getFromApi();
        this.getFlightData();
    }

}
