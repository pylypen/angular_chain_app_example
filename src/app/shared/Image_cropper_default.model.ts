

export class LogoImageCropperSettings {
    public normal_width = 300; // And height (300x300)
    public minimal_width = 150; // And height (150x150)
    public aspectRatio = 1 / 1;
    public resizeToWidth = this.normal_width;
    public resizeToHeight = this.normal_width;
    public cropperMinWidth = this.minimal_width;
    public cropperMinHeight = this.minimal_width;
    public roundCropper = true;
    public maintainAspectRatio = true;
}


export class ThumbnailImageCropperSettings {
    public normal_width = 800;
    public normal_height = 400;
    public minimal_width = this.normal_width / 2;
    public minimal_height = this.normal_height / 2;
    public aspectRatio = 2 / 1;
    public resizeToWidth = this.normal_width;
    public resizeToHeight = this.normal_height;
    public cropperMinWidth = this.minimal_width;
    public cropperMinHeight = this.minimal_height;
    public roundCropper = false;
    public maintainAspectRatio = true;
}


export class CoverImageCropperSettings {
    public normal_width = 2600;
    public normal_height = 600;
    public minimal_width = this.normal_width / 2;
    public minimal_height = this.normal_height / 2;
    public aspectRatio = 4 / 1;
    public resizeToWidth = this.normal_width;
    public resizeToHeight = this.normal_height;
    public cropperMinWidth = this.minimal_width;
    public cropperMinHeight = this.minimal_height;
    public roundCropper = false;
    public maintainAspectRatio = true;
}


export class ImageCropped {
    public type: string;
    public base64: string;
}