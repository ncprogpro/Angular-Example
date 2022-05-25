import { DialogService } from "@core/services/dialog.service";
import { DialogOptionTypeEnum } from "./dialogOptionTypeEnum";

export class DialogOption {
    title: string;
    message: string;
    message2: string;
    cancelText: string;
    confirmText: string;
    type: number;

    constructor(title: string, message1: string, message2: string = null, confirm: string = "OK", cancel: string = null) {
        this.title = title;
        this.message = message1; 
        this.message2 = message2; 
        this.cancelText = cancel; 
        this.confirmText = confirm;
        this.type = DialogOptionTypeEnum.alert;
    }
}