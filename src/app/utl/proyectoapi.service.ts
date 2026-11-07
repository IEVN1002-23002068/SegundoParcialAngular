import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AlumnosUtl } from "./alumnos/alumnosUtl";
import { MaestrosUtl } from "./maestros/maestros-utl";

@Injectable({
  providedIn: 'root'
})
export class ProyectoapiService {

  private readonly baseUrl = 'http://127.0.0.1:5000/api/alumnos';
  private readonly baseUrlMaestros = 'http://127.0.0.1:5000/api/maestros';

  constructor(private http: HttpClient) { }

  public getAlumnos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/`);
  }

  public getAlumno(mat: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${mat}`);
  }

  agregarNuevoAlumno(datos: AlumnosUtl): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/`, datos);
  }

  modificarAlumno(mat: string, datos: AlumnosUtl): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${mat}`, datos);
  }

  public EliminaAlumno(mat: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${mat}`);
  }


  public getMaestros(): Observable<any> {
    return this.http.get<any>(`${this.baseUrlMaestros}/`);
  }

  public getMaestro(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrlMaestros}/${id}`);
  }

  agregarNuevoMaestro(datos: MaestrosUtl): Observable<any> {
    return this.http.post<any>(`${this.baseUrlMaestros}/`, datos);
  }

  modificarMaestro(id: string | number, datos: MaestrosUtl): Observable<any> {
    return this.http.put<any>(`${this.baseUrlMaestros}/${id}`, datos);
  }

  public EliminaMaestro(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrlMaestros}/${id}`);
  }
}