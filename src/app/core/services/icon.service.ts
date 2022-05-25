import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private readonly iconMap = new Map<string, Map<string, string>>();

  /** A map of namespaces to use with our icons */
  private readonly iconNamespaces = {
    general: 'general',
    task: 'task',
    marketing: 'marketing',
    contact: 'contact',
    menu: 'menu',
    dashboard: 'dashboard',
    notification: 'notification'
  };

  /** The relative path to the assets directory where our icon files are kept */
  private readonly relAssetPath = '../assets/icons/';

  public constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly matIconRegistry: MatIconRegistry
  ) {
    // general icons
    this.iconMap.set(
      this.iconNamespaces.general,
      new Map([
        ['pencil', `t-pencil.svg`],
        ['cp', `ic_down_arrow.svg`],
        ['orangearrow', `orange-arrow.svg`],
        ['white-arrow', `white-arrow.svg`],
        ['teal-tick', `teal-tick.svg`],
        ['orange-close', `orange-close.svg`],
        ['tipicon', `ic-bulb.svg`],
        ['readmore', `readmore.svg`],
        ['searchicon', 'ic_search.svg'],
        ['iclab', 'ic-lab.svg'],
        ['icpipe', 'ic-pipe.svg'],
        ['marketsearch', 'search.svg'],
        ['add', 'ic-add.svg'],
        ['profile_edit', 'ic_edit.svg'],
        ['market_more', 'more.svg'],
        ['favorite', 'favorite.svg'],
        ['favorite-selected', 'favorite-selected.svg'],
        ['paper-clip', 'paper-clip-icon.svg'],
        ['opt-in', 'opt-in.svg'],
        ['opt-out', 'opt-out.svg'],
        ['textheader', `text_main_menu.svg`],
        ['emailsheader', `general_emailsheader_sidebar.svg`],
        ['eventsheader', `general_eventsheader_sidebar.svg`],
        ['black_text', `black_text.svg`],
        ['gray_text', `gray_text.svg`],
        ['gray_emails', `gray_emails.svg`],
        ['gray_events', `gray_events.svg`],
        ['gray_phone', `gray_phone.svg`],
        ['gray_person', `gray_person.svg`],
        ['gray_mail', `gray_mail.svg`],
        ['gray_other', `gray_other.svg`],
        ['text', `teal_text.svg`],
        ['emails', `teal_emails.svg`],
        ['events', `teal_events.svg`],
        ['phone', `teal_phone.svg`],
        ['persons', `teal_person.svg`],
        ['mail', `teal_mail.svg`],
        ['other', `teal_other.svg`],
      ])
    );


    // task icons
    this.iconMap.set(
      this.iconNamespaces.task,
      new Map([
        ['header', `tasks-header.svg`],
        ['text', `tasks-text.svg`],
        ['email', `tasks-email.svg`],
        ['phone', `tasks-phone.svg`],
        ['person', `tasks-person.svg`],
        ['ic-right', `task-checked.svg`],
        ['ic-circle', `circle.svg`],
        ['mail', `tasks-mail.svg`],
        ['other', `tasks-other.svg`],
        ['event', `tasks-event.svg`],
        ['email_active', `email-selected-new.svg`],
        ['email_non_active', `email-new.svg`],
        ['text_active', `text-selected-new.svg`],
        ['text_non_active', `text-new.svg`],
        ['phone_active', `phone-selected-new.svg`],
        ['phone_non_active', `phone-new.svg`],
        ['person_active', `tasks-personactive.svg`],
        ['person_non_active', `teal_person.svg`],
        ['mail_active', `mail-selected-new.svg`],
        ['mail_non_active', `mail-new.svg`],
        ['other_active', `tasks-otheractive.svg`],
        ['other_non_active', `teal_other.svg`],
        ['event_active', `tasks-eventactive.svg`],
        ['event_non_active', `teal_events.svg`],
      ])
    );

    // marketing icons
    this.iconMap.set(
      this.iconNamespaces.marketing,
        new Map([
          ['text', `marketing-text.svg`],
          ['email', `marketing-email.svg`],
          ['phone', `marketing-phone.svg`],
          ['person', `marketing-person.svg`],
          ['mail', `marketing-mail.svg`],
          ['other', `marketing-other.svg`],
          ['event', `marketing-event.svg`],
          ['print', 'approved-for-print.svg'],
          ['share', 'approved-for-share.svg'],
          ['resources', 'approved-for-resources.svg'],
      ])
    );

    // contacts icon
    this.iconMap.set(
      this.iconNamespaces.contact,
      new Map([
        ['delete', `t-delete.svg`],
      ])
    );

    // menu icon
    this.iconMap.set(
      this.iconNamespaces.menu,
      new Map([
        ['dashboard', `ic_dashboard.svg`],
        ['contacts', `ic_contacts.svg`],
        ['pipelines', `ic_pipelines.svg`],
        ['marketing', `ic_marketing.svg`],
        ['tasks', `ic_tasks.svg`],
        ['emails', `ic_emails.svg`],
        ['texts', `ic_texts.svg`],
        ['events', `ic_events.svg`],
        ['resources', `ic_resources.svg`],
        ['sidebarmenu', `ic_menu.svg`],
        ['admin', `ic-admin.svg`],
      ])
    );

    // notification icon set
    this.iconMap.set(
      this.iconNamespaces.notification,
        new Map([
          ['text', `tasks-text.svg`],
          ['email', `tasks-email.svg`],
          ['phone', `tasks-phone.svg`],
          ['person', `tasks-person.svg`],
          ['mail', `tasks-mail.svg`],
          ['other', `tasks-other.svg`],
          ['event', `tasks-event.svg`],
      ])
    );

    // dashboard icon
    this.iconMap.set(
      this.iconNamespaces.dashboard,
      new Map([
        ['user', `user.svg`],
        ['goal', `goals.svg`],
        ['messageheader', `messages-header.svg`],
     ])
    );
  }

  /**
   * Initialize by adding our SVG icons to the matIconRegistry.
   */
  public init(): void {
    // iterate over the icons defined in the iconMap and add them to the
    // appropriate registries
    for (const [key, iconMap] of this.iconMap.entries()) {
      for (const [iconKey, iconPath] of iconMap.entries()) {
        this.matIconRegistry.addSvgIconInNamespace(
          key,
          iconKey,
          this.trustIcon(iconPath)
        );
      }
    }
  }

  // DRY helper to apply security bypass for known icon files
  private trustIcon(iconFilename: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      `${this.relAssetPath}${iconFilename}`
    );
  }
}
