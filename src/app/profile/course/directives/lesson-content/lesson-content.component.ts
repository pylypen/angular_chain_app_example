import {Component, ElementRef, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Lesson} from "../../../../shared/Lesson.model";
import {VgAPI} from "videogular2/core";
import {Media} from "../../../../shared/Media.model";
import {DomSanitizer, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";
import { CourseService } from "../../course.service";
import { Get_lesson_media_types_response } from "../../edit/curriculum/lesson-edit/lesson-edit.model";

@Component({
    selector: 'lesson-content',
    templateUrl: './lesson-content.component.html',
    styleUrls: ['./lesson-content.scss']
})

export class LessonContentComponent implements OnChanges {

    @Input('data')
    lesson: Lesson = new Lesson();

    current_video: Media;
    current_video_index: number = 0;

    current_audio: Media;
    current_audio_index: number = 0;

    current_articulate: Media = new Media();
    current_articulate_index: number = 0;

    current_embed: Media = new Media();
    current_embed_index: number = 0;

    saveYTUrl: SafeResourceUrl = null;
    saveArticulateUrl: SafeResourceUrl = null;

    video_api: VgAPI;
    audio_api: VgAPI;

    used_media: Array<Media> = new Array<Media>();

    constructor(private el: ElementRef,
                private courseService: CourseService,
                private sanitizer: DomSanitizer) {

    }

    ngOnInit(){
    }


    ngOnChanges(changes: SimpleChanges) {
        this.courseService.getLessonMediaTypes(this.lesson.id).subscribe((res: Get_lesson_media_types_response) => {
            this.used_media = res.data.uses;
        })
        
        if (this.lesson.video_media.length) {
            this.current_video = this.lesson.video_media[0];
            if (this.current_video.media_extension.media_type.name == 'Embed' && this.current_video.media_extension.media_extension == 'youtube') {
                this.saveYTUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.current_video.file.src);
            }
        }
        if (this.lesson.audio_media.length) {
            this.current_audio = this.lesson.audio_media[0];
        }

        if(this.lesson.embed_youtube_media.length){
            this.current_embed = this.lesson.embed_youtube_media[0];
            this.saveYTUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.current_embed.file.src);
        }

    }

    videoPlayerReady(video_api: VgAPI) {
        this.video_api = video_api;
        this.video_api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    }

    audioPlayerReady(audio_api: VgAPI) {
        this.audio_api = audio_api;

        this.audio_api.getDefaultMedia().subscriptions.ended.subscribe(this.nextAudio.bind(this));
    }

    nextVideo() {
        this.current_video_index++;

        if (this.current_video_index == this.lesson.video_media.length) {

            this.current_video_index = 0;
        }

        this.current_video = this.lesson.video_media[this.current_video_index];

        if (this.current_video.media_extension.media_type.name == 'Embed' && this.current_video.media_extension.media_extension == 'youtube') {
            this.saveYTUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.current_video.file.src);
        }

    }

    nextAudio() {
        this.current_audio_index++;

        if (this.current_audio_index == this.lesson.audio_media.length) {
            this.current_audio_index = 0;
        }

        this.current_audio = this.lesson.audio_media[this.current_audio_index];
    }

    switchVideo(media: Media, index: number) {
        this.current_video = media;
        this.current_video_index = index;
    }

    switchEmbed(media: Media, index: number){
        this.current_embed = media;
        this.current_embed_index = index;
        this.saveYTUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.current_embed.file.src);
    }

    switchAudio(media: Media, index: number) {
        this.current_audio = media;
        this.current_audio_index = index;
    }

    switchArticulate(media: Media, index: number){
        this.current_articulate = media;
        this.current_articulate_index = index;
        this.saveArticulateUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.current_articulate.file.src);
    }

}