import { HttpClient } from "@angular/common/http";
import { inject, Service, signal } from "@angular/core";

export type ToasterType = 'success' | 'warning' | 'danger' | 'info';

export interface ToastState {
    message: string,
    type: ToasterType,
    visible: boolean
}

@Service()
export class ToasterService {

    toast = signal<ToastState>({
        message: '',
        type: 'info',
        visible: false
    });

    show(message: string, type: ToasterType = 'info', duration = 3000) {
        this.toast.set({ message: message || 'Something went wrong', type, visible: true });
        setTimeout(() => this.hide(), duration);
    }

    hide() {
        this.toast.update(t => ({ ...t, visible: false }))

    }
}