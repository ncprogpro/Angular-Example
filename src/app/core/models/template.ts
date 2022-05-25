export interface Template {
    action_followup_hours? : number
    action_followup_id?    : number
    action_followup_notes? : string
    active?                : number
    created_at?            : string
    deleted_at?            : string
    description?           : string
    drip_campaign_id?      : number
    email_attachment_id?   : number
    email_followup_hours?  : number
    email_followup_id?     : number
    id?                    : number
    job?                   : number
    name?                  : string
    published?             : number
    subject?               : string
    template_approved_fors?: any[]
    template_type?         : number
    text_followup_hours?   : number
    text_followup_id?      : number
    thumbnail_img?         : string
    updated_at?            : string
}