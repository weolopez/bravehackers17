import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-single-player',
    templateUrl: './single-player.component.html'
})
export class SinglePlayerComponent implements OnInit {
    sources: Array<Object>;

    constructor() {
        this.sources = [
            {
                src: 'https://www.youtube.com/watch?v=4dtLsR561FU&t=7s',
                type: "video/mp4"
            }
        ];
    }

    ngOnInit() {
    }
}
