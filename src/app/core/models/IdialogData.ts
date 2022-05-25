export interface IDialogData {
    data: any;
    goalSettings: any;
    contact: any
    selectedContacts: any;
    selectedContact: any;
    customField: any;
    pipeline: any;
    pipelines?: any;
    customFieldLength: number;
    recipients: any;
    templates: any;
    isTemplateBodyChanged: boolean;
    isFromSaveButton: boolean;
    isInitialTemplateInfo: boolean;
    module: string;
    isForEdit: boolean;
    allContact: any;
    title: string;
    content: string;
    to: any;
    date: any;
    selectedContactsArr: any;
    isTextMessage: boolean;
    selectedContactsLength: number;
    emailSubject: string;
    emailData: any;
    isFromTemplateMessage: boolean;
    notifications: any[];
    sendOptInEmailTemplate: any;
    templateId: number;
}