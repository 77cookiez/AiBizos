export type AppManifest = {
  id: string;
  name: string;
  description: string;
  icon: string;
  routes: string[];
  requiredPermissions: string[];
  settingsSections?: string[];
  eventsPublished?: string[];
  eventsSubscribed?: string[];
  aiActions?: string[];
  tags?: string[];
};

export const builtinApps: AppManifest[] = [
  {
    id: 'crm',
    name: 'CRM',
    description: 'Customer relationship workflows.',
    icon: 'Users',
    routes: ['/modules/crm'],
    requiredPermissions: ['apps.view.crm'],
    settingsSections: ['crm.pipeline'],
    eventsPublished: ['crm.contact.created'],
    aiActions: ['create-contact-draft'],
    tags: ['sales']
  },
  {
    id: 'invoicing',
    name: 'Invoicing',
    description: 'Draft-first invoicing module.',
    icon: 'Receipt',
    routes: ['/modules/invoicing'],
    requiredPermissions: ['apps.view.invoicing'],
    settingsSections: ['invoice.defaults'],
    eventsPublished: ['invoice.draft.created'],
    aiActions: ['create-invoice-draft'],
    tags: ['finance']
  }
];
