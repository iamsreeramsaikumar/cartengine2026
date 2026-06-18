import { Component, inject } from '@angular/core';
import { ToasterService } from '../../../services/toasterService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toaster',
  imports: [CommonModule],
  templateUrl: './toaster.html',
  styleUrl: './toaster.scss',
})
export class Toaster {
  private toastService = inject(ToasterService);

  toast = this.toastService.toast;

  close() {
    this.toastService.hide();
  }
}
