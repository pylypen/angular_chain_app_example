import { Pipe, PipeTransform } from '@angular/core';
import { TeamsItem, TeamsList } from './teams.model';

@Pipe({
  name: 'teamsFilterPipe'
})
export class TeamsFilterPipe implements PipeTransform {
    transform(items: Array<TeamsItem>): Array<TeamsItem>{
        if(!items) return new Array<TeamsItem>();
        return items;
    }
}
