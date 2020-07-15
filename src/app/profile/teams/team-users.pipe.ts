import { Pipe, PipeTransform } from '@angular/core';
import { TeamsItem } from './teams.model';

@Pipe({
  name: 'teamUsersFilterPipe'
})
export class TeamUsersFilterPipe implements PipeTransform {
    transform(items: Array<TeamsItem>, userName: string): Array<TeamsItem>{
      if(!userName) return items;
      if(!items) return new Array<TeamsItem>();
      userName = userName.toLowerCase();
      return items.filter( it => {
        for(let i = 0; i < it.member_preview.length; i++){
          if(it.member_preview[i].displayName().toLowerCase().includes(userName)) return true;
        }
    });
  }
}