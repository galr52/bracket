import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PlayerArray } from './player.model';
var PouchDB = require('pouchdb');
var shortid = require('shortid');

var db = new PouchDB('http://localhost:5984/tournament');
let self: any;

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
  private _id;
  private _rev;

  constructor() { 
    this._id = shortid.generate();
    self = this;
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }

  private initBracket() {
    let container = $(this.el.nativeElement);
    container.bracket({
      init: this.players.getAsTeams(),
      save: this.saveFn,
      dir: 'rl',
      userData: 'http://myapi'
    });
  }

  saveFn(data, userData) {
    console.log('POST ' + userData + ' ' + data);
    let json = JSON.stringify(data);
    console.log('POST ' + userData + ' ' + json);

    data._id = self._id;
    data._rev = self._rev;

    db.put(data).then(function (response) {
      // handle response
      self._rev = response.rev;
      console.log(response);
    }).catch(function (err) {
      console.log(err);
    });
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
