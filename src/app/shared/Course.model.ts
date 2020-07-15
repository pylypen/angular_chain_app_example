import {Serializable} from "./Serializeble.interface";
import {Media_file} from "./Media_file.model";
import {User} from "./User.model";
import {Lesson} from "./Lesson.model";

export class Course implements Serializable<Course> {
    public id: number = null;
    public name: string = '';
    public subtitle: string = '';
    public description: string = '';
    public featured_background: Media_file = new Media_file();
    public thumbnail: Media_file = new Media_file();
    public completion: string | number = 0;
    public author: User = new User();
    public lessons: Array<Lesson> = [];
    public users: Array<User> = [];
    
    public teams: Array<any> = []; // Team id, which course belongs to
    deserialize(input: any) {
        if (input) {
            this.id = input.id;
            this.name = input.name;
            this.subtitle = input.subtitle;
            this.description = input.description;
            this.featured_background = new Media_file().deserialize(input.featured_background);
            this.thumbnail = new Media_file().deserialize(input.thumbnail);
            this.completion = input.completion;

            //optional params
            if (input.author) {
                this.author = new User().deserialize(input.author);
            }
            if (this.teams) this.teams = input.teams;
            if (input.lessons && input.lessons.length) {
                let lesson: Lesson;
                for (let i in input.lessons) {
                    lesson = new Lesson().deserialize(input.lessons[i]);
                    this.lessons.push(lesson);
                }
            }

            if (input.users && input.users.length) {
                for (let i in input.users) {
                    this.users.push(new User().deserialize(input.users[i]));
                }
            }
        }
        return this;
    }

}
