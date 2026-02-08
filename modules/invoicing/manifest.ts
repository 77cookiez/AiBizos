export default {
  id: 'invoicing',
  name: 'Invoicing',
  description: 'Draft-first invoicing module',
  icon: 'Receipt',
  routes: ['/modules/invoicing'],
  requiredPermissions: ['apps.view.invoicing'],
  settingsSections: ['invoice.defaults'],
  eventsPublished: ['invoice.draft.created'],
  eventsSubscribed: [],
  aiActions: ['create-invoice-draft']
};
