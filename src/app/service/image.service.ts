import {ElementRef, Injectable, Input} from '@angular/core';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(
    private userService: UserService,
  ) { }

  editPhoto = (input: ElementRef) => {
    const fileInput = input.nativeElement
    fileInput.click()
  }

  onFileSelected(event: Event){
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const selectedFile = inputElement.files[0];
      if (selectedFile.type.startsWith('image/')) {
        this.userService.updateUserImage(selectedFile).subscribe({
          next: (res: any) => console.log("Image updated successfully", res),
          error: console.error
        })
      }
      else {
        console.error('Selected file is not an image')
      }
      inputElement.value = '';
    }
  }

  deleteImage(){
    this.userService.deleteImage().subscribe({
      next: (res) => {console.log('Image delete successfully', res)},
      error: console.error
    })
  }

}
