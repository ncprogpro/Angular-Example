import * as moment from 'moment';

export class GlobalConstants {
  // place for global variables

  public static sidebarDefaultConfig: any = {
    data: '',
    height: '100%',
    width: '400px',
    position: {
      right: '0px',
      top: '0px'
    },
    animation: {
      to: "left",
      incomingOptions: {
        keyframeAnimationOptions: { easing: "ease-in-out", duration: 500 }
      },
      outgoingOptions: {
        keyframeAnimationOptions: { easing: "ease-in-out", duration: 500 }
      }
    },
    autoFocus: false,
  }

  public static centerDefaultConfig: any = {
    data: '',
    class: 'modal-dialog-centered',
    width: '500px',
    height: '250px',
    panelClass: 'ep-center-dialog',
    animation: {
      to: "center",
      incomingOptions: {
        keyframeAnimationOptions: { easing: "ease-in-out", duration: 500 }
      },
      outgoingOptions: {
        keyframeAnimationOptions: { easing: "ease-in-out", duration: 500 }
      }
    }
  }

  public static getCurrentDateEmailFormat(start?: any):string {
    let date = new Date();
    if(!start?.trim()) { date = new Date(); }
    else { date = new Date(start) }

    return moment.utc(date).format('YYYY-MM-DD H:mm:ss');
  }

  public static MARKETING_SIDEBAR_TEMPLATES_LIMIT = 3;

  public static TEXT_REFRESH_MODE_DEFAULT = 'POLLING'; // POLLING | WEBSOCKET
  public static TEXT_REFRESH_INTERVAL_POLLING = 6000; // every 6 seconds

  public static TRAINING_FLAGS = {
    AUTH_SUCCESS: 1,
    ONBOARDING_CONTACTS_OB: 2,
    ONBOARDING_PIPELINES_OB: 3,
    ONBOARDING_TASKS_OB: 4,
    ONBOARDING_MARKETING_OB: 5,
    ONBOARDING_EMAILS_OB: 6,
    ONBOARDING_TEXTS_OB: 7,
    NEW_USERS_UPLOADING_CONTACTS: 20,
    MARKETING_TERMS: 21,
    EXISTING_USER_TERMS_ALERT: 22,
    MARKETING_COUNTRY_FILTER_ALERT: 23
  };

  public static  ARTICLE_EDITOR_OPTION = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ color: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      ['link', 'image']
    ],
    imageResize: {}
  };

  public static DRAFT_MESSAGE_TTL = 12*60*60*1000; // 12 hour
  public static TinyMceEditorInitConfig: any = {
    height: 500,
    inline: true,
    plugins: 'image link',
    menubar: false,
    paste_data_images: true,
    images_upload_url: 'none',
    images_upload_handler: (blobInfo: any, success: any, failure: any) => {success('data:' + blobInfo.blob().type + ';base64,' + blobInfo.base64()); },
    toolbar: 'undo redo | formatselect | bold italic link image | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent'
  };
}
