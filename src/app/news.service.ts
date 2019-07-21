import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { NewsApiService } from 'angular-news-api';
// import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewsService {


    /**
     * Consume the NewsApiService here, make sure
     * to set the language to 'en' english and built
     * in the search functionality using the 'q'
     * variable in API calls to news-api
     */
    api_key = '964c4f01f6274e9180529385031197de';

    constructor(private _http: HttpClient) { }
    
    initArticles() {
        return this._http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + this.api_key);
    }
    getArticlesByText(source: String) {
        return this._http.get('https://newsapi.org/v2/top-headlines?q=' + source + '&apiKey=' + this.api_key);
    }

}
