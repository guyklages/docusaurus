const sidebars = {
  sidebarPortfolio: [
    {
      type: 'category',
      label: 'Developer guides',
      items: [
        {
          type: 'category',
          label: 'Getting started',
          items: [
            {
              type: 'doc',
              id: 'portfolio_dev_client-config',
              label: 'portfolio_dev_client-config',
            }
          ]
        },
      ]
    },
    {
      type: 'category',
      label: 'API reference',
      items: [
        {
        type: 'doc',
        id: 'portfolio_api_client-config',
        label: 'portfolio_api_client-config',
        }      
      ]      
    } 
  ],
  sidebarAtelio: [
    {
      type: 'category',
      label: 'Atelio Developer guides',
      items: [
        {
          type: 'category',
          label: 'Getting started',
          items: [
            {
              type: 'doc',
              id: 'atelio_client-config',
              label: 'Client Configuration',
            }
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'API reference',
      items: [
        {
        type: 'doc',
        id: 'atelio_api_client-config',
        label: 'atelio_api_client-config',
        }      
      ]      
    } 
  ],
    sidebarNium: [
    {
      type: 'category',
      label: 'Nium Developer guides',
      items: [
        {
          type: 'category',
          label: `Getting started`,
          items: [
            {
              type: 'doc',
              id: 'nium_dev_client-config',
              label: 'nium_dev_client-config',
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'API reference',
      items: [
        {
        type: 'doc',
        id: 'nium_api_client-config',
        label: 'nium_api_client-config',
        }      
      ]      
    } 
  ],
    sidebarCouchbase: [
    {
      type: 'category',
      label: 'Couchbase Developer guides',
      items: [
        {
          type: 'category',
          label: `Getting started`,
          items: [
            {
              type: 'doc',
              id: 'cb_dev_client-config',
              label: 'cb_dev_client-config',
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'API reference',
      items: [
        {
        type: 'doc',
        id: 'cb_api_client-config',
        label: 'cb_api_client-config',
        }      
      ]      
    } 
  ]
};
export default sidebars;