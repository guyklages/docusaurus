const sidebars = {
  sidebarPortfolio: [
    {
      type: 'category',
      label: 'Five favorites',
      items: [
        {
          type: 'doc',
          id: 'portfolio/portfolio-overview',
          label: 'Overview',
        }
      ]
    },
    {
      type: 'category',
      label: 'API reference',
      items: [
        {
        type: 'doc',
        id: 'portfolio/client-config',
        label: 'portfolio_api_client-config',
        }      
      ]      
    } 
  ],
  sidebarAtelio: [
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
              id: 'atelio/client-config',
              label: 'Client Configuration',
            },
            {
              type: 'doc',
              id: 'atelio/quickstart',
              label: 'Quickstart',
            },
            {
              type: 'doc',
              id: 'atelio/postman-collection',
              label: 'Postman',
            },
            {
              type: 'doc',
              id: 'atelio/sandbox-vs-production',
              label: 'Sandbox vs Production',
            },
            {
              type: 'category',
              label: 'Webhooks',
              items: [
                {
                  type: 'doc',
                  id: 'atelio/webhooks/webhook',
                  label: 'Webhook introduction',
                },
                {
                  type: 'doc',
                  id: 'atelio/webhooks/webhook-events',
                  label: 'Webhook events',
                },
                {
                  type: 'doc',
                  id: 'atelio/webhooks/webhook-payloads',
                  label: 'Webhook payloads',
                },
                {
                  type: 'doc',
                  id: 'atelio/webhooks/webhook-subscriptions',
                  label: 'Webhook subscriptions',
                },
                {
                  type: 'doc',
                  id: 'atelio/webhooks/webhook-requests',
                  label: 'Webhook requests',
                },
                {
                  type: 'doc',
                  id: 'atelio/webhooks/testing-webhooks',
                  label: 'Testing webhooks',
                }
              ]
            }, // Webhooks
            {
              type: 'doc',
              id: 'atelio/getting-started/errors',
              label: 'Errors',
            },
            {
              type: 'doc',
              id: 'atelio/getting-started/glossary',
              label: 'Glossary',
            },
            {
              type: 'doc',
              id: 'atelio/getting-started/faq',
              label: 'FAQ',
            }
          ], 

        }, // Getting started
        {
          type: 'category',
          label: 'Widgets',
          items: [
            {
              type: 'doc', 
              id: 'atelio/widgets/consumer-secured-charge-card',
              label: 'Consumer secured charge card',
            },
            {
              type: 'doc',
              id: 'atelio/widgets/pay-by-bank-app-overview',
              label: 'Pay by Bank app overview',
            }
          ]
        }, // Widgets
        {
          type: 'category',
          label: 'Customer',
          items: [
            {
              type: 'doc',
              id: 'atelio/customer/kyc',
              label: 'KYC',
            },
            {
              type: 'doc',
              id: 'atelio/customer/start-kyc-process',
              label: 'Start KYC process',
            },
            {
              type: 'doc',
              id: 'atelio/customer/kyc-sandbox-scenarios',
              label: 'KYC sandbox scenarios',
            },
            {
              type: 'doc',
              id: 'atelio/customer/upload-kyc-documentation',
              label: 'Upload KYC documentation',
            },
            {
              type: 'doc',
              id: 'atelio/customer/customer-onboarding',
              label: 'Customer onboarding',
            }
          ]
        }, // Customer
        {
          type: 'category',
          label: 'Business',
          items: [
            {
              type: 'doc',
              id: 'atelio/business/manage-business',
              label: 'Manage business',
            },
            {
              type: 'doc',
              id: 'atelio/business/ef-kyb',
              label: 'KYB',
            },
            {
              type: 'doc',
              id: 'atelio/business/business-onboarding',
              label: 'Business onboarding',
            },
            {
              type: 'doc',
              id: 'atelio/business/beneficial-owners',
              label: 'Beneficial owners',
            }
          ]
        },
        {
          type: 'category',
          label: 'Accounts',
          items: [
            {
              type: 'doc',
              id: 'atelio/accounts/account-overview',
              label: 'Accounts overview',
            },
            {
              type: 'doc',
              id: 'atelio/accounts/credit-accounts',
              label: 'Credit accounts',
            },
            {
              type: 'doc',
              id: 'atelio/accounts/deposit-accounts',
              label: 'Deposit accounts',
            },
            {
              type: 'doc',
              id: 'atelio/accounts/link-an-external-account',
              label: 'External accounts with Plaid',
            }
          ]
        }, // Accounts
        {
          type: 'category',
          label: 'Money movement',
          items: [
            {
              type: 'category',
              label: 'Account transfers',
              items: [
                {
                  type: 'doc',
                  id: 'atelio/ach-return-codes',
                  label: 'ACH return codes',
                }
              ] 
            } // Account transfers
          ] 
        } // Money movement
      ] 
    }, // Atelio developer guides
    {
      type: 'html',
      value: '<div class="sidebar-spacer"></div>', // Use a custom class
      defaultStyle: true, // Optional: applies default Docusaurus sidebar item styling
    },
    {
      type: 'category',
      label: 'API reference',
      items: [
        {
        type: 'doc',
        id: 'atelio/client-config',
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
              id: 'nium/client-config',
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
        id: 'nium/client-config',
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
              id: 'couchbase/client-config',
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
        id: 'couchbase/client-config',
        label: 'cb_api_client-config',
        }      
      ]      
    } 
  ]
};
export default sidebars;