import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../shared/Course.model';

@Pipe({
  name: 'coursesFilterPipe'
})
export class CoursesFilterPipe implements PipeTransform { // Pipe for search couse by course name
    transform(items: Array<Course>, searchText: string): Array<Course> {
        if(!searchText) return items;
        if(!items) return [];
        return items.filter( it => {
            return it.name.toLowerCase()
            .includes(searchText.toLowerCase());
        });
    }
}

@Pipe({
    name: 'coursesFilterByIDPipe'
})

export class CoursesFilterByIDPipe implements PipeTransform { // Pipe for search course by Team ID
    transform(items: Array<Course>, search_id: number): Array<Course> {
        if(!search_id) return items;
        if(!items) return [];
        return items.filter( it => {
            if(it.teams && it.teams.length) {
                for(let i = 0; i < it.teams.length; i++){
                    if(it.teams[i].id === search_id) return true;
                }
            }
        });
    }
}