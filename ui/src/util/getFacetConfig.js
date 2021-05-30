const messages = {
  facet_schema: '{count, plural, one {Type} other {Types}}',
  facet_collection_id:'{count, plural, one {Dataset} other {Datasets}}',
  facet_ibans: '{count, plural, one {IBAN} other {IBANs}}',
  facet_languages:'{count, plural, one {Language} other {Languages}}',
  facet_emails:'{count, plural, one {E-Mail} other {E-Mails}}',
  facet_phones:'{count, plural, one {Phone number} other {Phone numbers}}',
  facet_countries: '{count, plural, one {Country} other {Countries}}',
  facet_names: '{count, plural, one {Name} other {Names}}',
  facet_addresses: '{count, plural, one {Address} other {Addresses}}',
  facet_mime_type: '{count, plural, one {File type} other {File types}}',
  facet_category: '{count, plural, one {Category} other {Categories}}'
};

const propConfigs = {
  addresses: {
    field: 'addresses',
    label: messages.facet_addresses,
    icon: 'map',
  },
  category: {
    field: 'category',
    label: messages.facet_category,
    icon: 'list',
    defaultSize: 1000,
  },
  collection_id: {
    field: 'collection_id',
    label: messages.facet_collection_id,
    icon: 'database',
  },
  match_collection_id: {
    field: 'match_collection_id',
    label: messages.facet_collection_id,
    icon: 'database',
    defaultSize: 10,
  },
  countries: {
    field: 'countries',
    label: messages.facet_countries,
    icon: 'globe',
    defaultSize: 1000,
  },
  emails: {
    field: 'emails',
    label: messages.facet_emails,
    icon: 'envelope',
  },
  ibans: {
    field: 'ibans',
    label: messages.facet_ibans,
    icon: 'credit-card',
  },
  languages: {
    field: 'languages',
    label: messages.facet_languages,
    icon: 'translate',
  },
  mimetypes: {
    field: 'mimetypes',
    label: messages.facet_mime_type,
    icon: 'document',
  },
  names: {
    field: 'names',
    label: messages.facet_names,
    icon: 'id-number',
  },
  phones: {
    field: 'phones',
    label: messages.facet_phones,
    icon: 'phone',
  },
  schema: {
    field: 'schema',
    label: messages.facet_schema,
    icon: 'list-columns',
    defaultSize: 1000,
  },
};

const getFacetConfig = (key) => (
  propConfigs[key]
);

export default getFacetConfig;
