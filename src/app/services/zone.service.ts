import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private apiBaseUrl = 'https://www.skillmuni.in/SkillmuniApi2022/api';
  private apiBaseUrlSul = 'https://www.skillmuni.in/SULAPIProduction_new/api';

  private learningZoneApiUrl = `${this.apiBaseUrl}/GetAcademicTiles?UID=2509&OID=130`;
  private skillZoneApiUrl = `${this.apiBaseUrl}/GetSkillTiles?UID=2509&OID=130`;
  private countryApiUrl = `${this.apiBaseUrl}/getCategoryTileListForNonLearning?UID=2509&OID=130&tile_type=2`;
  private entrepreneurApiUrl = `${this.apiBaseUrl}/getCategoryTileListForNonLearning?UID=2509&OID=130&tile_type=3`;

  constructor(private http: HttpClient) { }

  getZones() {
    return [
      {
        name: 'Placement Zone',
        description: 'Take assessments to match jobs with your skills and needs. Opportunities are waiting!',
        img: 'assets/zones/Placement zone.png',
        route: 'placement-zone',
      },
      {
        name: 'International Zone',
        description: 'Compare countries, find top institutes, and register your interest – we’ll guide you all the way!',
        img: 'assets/zones/International zone.png',
        route: 'international-zone',
      },
      {
        name: 'Entrepreneur Zone',
        description: 'Test your Entrepreneurial Quotient, share ideas, find collaborators, and explore new paths!',
        img: 'assets/zones/Entrepreneur zone.png',
        route: 'entrepreneur-zone',
      },

    ];
  }

  getLearningZoneCards(): Observable<any[]> {
    return this.http.get<any[]>(this.learningZoneApiUrl);
  }

  getSkillZoneCards(): Observable<any[]> {
    return this.http.get<any[]>(this.skillZoneApiUrl);
  }

  getBriefTiles(id_academic_tile: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/getBriefTiles?UID=2509&OID=130&AcademicTileId=${id_academic_tile}`);
  }

  getPlaces(): Observable<any> {
    return this.http.get<any>(this.countryApiUrl);
  }

  getBriefListForStudyAbroad(tileCode: string): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/getBriefListForStudyAbroad?UID=2509&OID=130&ENC=${tileCode}`);
  }

  getBriefListwithAcademy(tileCode: string, id_academic_tile: string = '36'): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrlSul}/getBriefListwithAcademy?UID=2509&OID=130&ENC=${tileCode}&id_academy=${id_academic_tile}`);
  }

  getEntrepreneurOpportunities(): Observable<any> {
    return this.http.get<any>(this.entrepreneurApiUrl);
  }

  getAssessmentData(briefCode: string): Observable<any> {
    const apiUrl = `${this.apiBaseUrlSul}/Assessment/GetAssessmentSheet?brfcode=${briefCode}&UID=7871&OID=130&ACID=36&BriefTileID=109`;
    return this.http.get<any>(apiUrl);
  }

  submitAssessment(payload: { brfcode: string, answers: string, resultStatus: number }): Observable<any> {
    const apiUrl = `${this.apiBaseUrlSul}/Assessment/SubmitAssessment`;
    return this.http.post<any>(apiUrl, payload);
  }
  

}
