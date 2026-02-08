export default {
  id: 'crm',
  name: 'CRM',
  description: 'CRM module',
  icon: 'Users',
  routes: ['/modules/crm'],
  requiredPermissions: ['apps.view.crm'],
  settingsSections: ['crm.pipeline'],
  eventsPublished: ['crm.contact.created'],
  eventsSubscribed: [],
  aiActions: ['create-contact-draft']
};
