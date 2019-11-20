import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";			
import { Observable } from 'rxjs';			
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private storageName: string = "Configuracoes";

  constructor(private _http: HttpClient) { }

  gravarConfiguracoes(data: any) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
  }

  gravarParteDasConfiguracoes(data: any) {
    var data = JSON.parse(localStorage.getItem(this.storageName));
    for(let rede_social in data){
      console.log(data[rede_social]['rede_social'])
    }
    //localStorage.setItem(this.storageName, JSON.stringify(data));
  }

  retornarConfiguracoes() {
    let data = localStorage.getItem(this.storageName);
    return JSON.parse(data);
  }

  limparConfiguracoes() {
    localStorage.removeItem(this.storageName);
  }

  limparTudo() {
    localStorage.clear()
  }

  lojas():Observable<object> {	
      var url = "https://demo7744832.mockable.io/pages";
      return this._http.get(url).pipe(map((resposta:Response) => <object>resposta));               
  }

}
