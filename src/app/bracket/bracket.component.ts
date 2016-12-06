import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PlayerArray } from './player.model';
declare var $: JQueryStatic;

@Component({
  // moduleId: module.id,
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})
export class BracketComponent implements OnInit, AfterViewInit {
  @ViewChild('brackets') el: ElementRef;
  private players: PlayerArray;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }

  private initBracket() {
    let container = $(this.el.nativeElement);
    container.bracket({
      init: this.players.getAsTeams(),
      save: this.saveFn,
      userData: 'http://myapi'
    });
  }

  saveFn(data, userData) {
    console.log('POST ' + userData + ' ' + data);
    let json = JSON.stringify(data);
    console.log('POST ' + userData + ' ' + json);
    /* You probably want to do something like this
    jQuery.ajax("rest/"+userData, {contentType: 'application/json',
                                  dataType: 'json',
                                  type: 'post',
                                  data: json})
    */
  }

  generate(players: string) {
    this.players = new PlayerArray();
    let allPlayers = players.split(',');

    for (let i = 0; i < allPlayers.length; i++) {
      this.players.add(allPlayers[i]);
    }

    this.initBracket();
  }
}
