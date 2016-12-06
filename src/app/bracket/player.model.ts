// import * as _ from '@types/lodash';
import _ from 'lodash';

export class PlayerArray {
    private knownBrackets = [2, 4, 8, 16, 32];
    private players: Array<string>;
    constructor() {
        this.players = new Array<string>();
    }

    add(player: string) {
        player = player.trim();

        if (player) {
            this.genericAdd(player);
        }
    }

    private genericAdd(player: any) {
        this.players.push(player);

    }

    getAsTeams() {
        this.makeFull();
        this.makeShuffle();
        let val = this.buildTeams();
        val = _.cloneDeep({ teams: val });
        return val;
    }

    private makeFull() {
        let base = this.players.length;
        let closest = _.find(this.knownBrackets, function (o) { return o >= base; });
        let byes = closest - base;

        if (byes > 0) {
            for (let i = base; i < closest; i++) {
                this.genericAdd(null);
            }
        }

    }

    private makeShuffle() {
        this.players = _.shuffle(this.players);
    }

    private buildTeams() {
        let array: string[][] = [[]];
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            if (array[array.length - 1].length < 2) {
                array[array.length - 1].push(player);
            } else {
                array.push([player]);
            }
        }

        return array;
    }
}
