import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenDirectoryWrapperService } from './directory-picker.service';

@NgModule({
  imports: [CommonModule],
  providers: [OpenDirectoryWrapperService],
})
export class FileSystemApiWrapperServiceModule {}
