import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServicesService } from '../_services/user-services.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  uploadForm: FormGroup;
  formData!: FormData;
  uploadedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _userservice: UserServicesService
  ) {
    this.uploadForm = this.fb.group({
      file: [null],
    });
  }

  FileInput(event: any) {
    console.log(event);
    const file = event.target.files[0];
    if ((file.type == 'text/csv', file.name.endsWith('.csv'))) {
      this.formData = new FormData();
      this.formData.append('file', file);

      this.uploadedFile = file;
      this.uploadForm.patchValue({
        file: file,
      });
    } else {
      alert('only the csv file are allowed');
    }
  }

  async uploadFile() {
    console.log(this.uploadedFile);
    if (this.uploadedFile === null) {
      this.snackBar.open('Please select a file before uploading.', 'Close', {
        duration: 3000,
      });
    } else {
      await this.sendUplaodedFile(this.formData);
      this.snackBar.open('File uploaded successfully!', 'Close', {
        duration: 3000,
      });
    }
  }
  async sendUplaodedFile(formData: FormData) {
    await this._userservice.uploadcsv(formData);
  }
}
