export class AlertModel {
    type: number;
    message: string;

    constructor(type: number, message: string) {
        this.type = type;
        this.message = message;
    }
}