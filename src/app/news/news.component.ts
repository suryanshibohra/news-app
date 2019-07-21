import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NewsService } from '../news.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
    @ViewChild('searchArticle') searchArticle: ElementRef;
    public articles: any[] = [];
    public sources: any[] = [];
    public search: string;
    public status: string;
    public inputText:string="";
    
    constructor(
        private _newsService: NewsService
    ) {

    }

    public ngOnInit() {
        this.fetchArticles();
    }

    private fetchArticles(search?: string): void {
        // Dummy article for navigation purpose,
        // replace with newsService usage
        //load articles
        this.status=statusValues.loading;
        this._newsService.initArticles().subscribe((data) =>{
            this.status=statusValues.success;
            this.articles = data['articles']
        });
        // this.articles.push({
        //     title: 'dummy article'
        // });
    }

    private keyUpHandler(event: any) {
        if(this.inputText){
            fromEvent(this.searchArticle.nativeElement, 'keyup').pipe(
                // get value
                map((event: any) => {
                return event.target.value;
                })
                // if character length greater then 2
                ,filter(res => res.length > 2)
                // Time in milliseconds between key events
                ,debounceTime(800)        
                // If previous query is diffent from current   
                ,distinctUntilChanged()
                // subscription for response
                )
                .subscribe((text: string) => {
                    this.status = statusValues.loading;
                    this._newsService.getArticlesByText(text).subscribe((data) => {
                        this.status = statusValues.success;
                        this.articles = data['articles']
                    }, (err) => {
                        this.status = statusValues.error;
                    });
                });
            }else{
                this.fetchArticles();
            }
        }
    }
export enum statusValues {
    loading = "loading",
    error = "error",
    noData = "noData",
    success = "success"
}
   


