const sidebars = {
  sidebarPortfolio: [
    {
        type: 'doc',
        id: 'portfolio/index',
        label: 'Overview',
    },
    {
        type: 'doc',
        id: 'portfolio/five-favorite',
        label: '5 favorite samples',
    } ,
    {
        type: 'doc',
        id: 'portfolio/before-and-after',
        label: 'BEFORE and AFTER',
    },
  ],
  sidebarAtelioGuides: [
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
              id: 'atelio/getting-started/client-config',
              label: 'Client Configuration',
            },
            {
              type: 'doc',
              id: 'atelio/getting-started/quickstart',
              label: 'Quickstart',
            },
            {
              type: 'doc',
              id: 'atelio/getting-started/postman-collection',
              label: 'Postman',
            },
            {
              type: 'doc',
              id: 'atelio/getting-started/sandbox-vs-production',
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
            },
            {
              type: 'doc',
              id: 'atelio/accounts/external-accounts-sdk',
              label: 'External accounts SDK',
            },
            {
              type: 'doc',
              id: 'atelio/accounts/sdk-documentation',
              label: 'SDK documentation',
            },
            {
              type: 'doc',
              id: 'atelio/accounts/account-statements',
              label: 'Account statements',
            }
          ]
        }, // Accounts
        {
          type: 'category',
          label: 'Cards',
          items: [
            {
              type: 'doc',
              id: 'atelio/cards/secured-charge-card-overview',
              label: 'Secured charge card',
            },
            {
              type: 'doc',
              id: 'atelio/cards/consumer-secured-charge-card',
              label: 'Consumer secured charge card',
            },
            {
              type: 'doc',
              id: 'atelio/cards/commercial-secured-charge-card',
              label: 'Commercial secured charge card',
            },
            {
              type: 'doc',
              id: 'atelio/cards/multi-card',
              label: 'Multi-card',
            },
            {
              type: 'doc',
              id: 'atelio/cards/manage-cards',
              label: 'Manage cards',
            },
            {
              type: 'doc',
              id: 'atelio/cards/card-reissue-faq',
              label: 'Card reissue FAQ',
            },
            {
              type: 'doc',
              id: 'atelio/cards/ateliocards-sdk',
              label: 'Atelio cards SDK',
            }
          ]
        }, // Cards
        {
          type: 'category',
          label: 'Identity',
          items: [
            {
              type: 'doc',
              id: 'atelio/identity/identity-overview',
              label: 'Identity overview',
            },
            {
              type: 'doc',
              id: 'atelio/identity/identity-integration-guide',
              label: 'Identity integration guide',
            },
            {
              type: 'doc',
              id: 'atelio/identity/identity-user-guide',
              label: 'Identity user guide',
            },
            {
              type: 'doc',
              id: 'atelio/identity/pricing-and-bundling',
              label: 'Pricing and bundling',
            }
          ]
        },
        {
          type: 'category',
          label: 'Money movement',
          items: [
            {
              type: 'doc',
              id: 'atelio/money-movement/pay-by-bank-payments',
              label: 'Pay by Bank payments',
            },
            {
              type: 'doc',
              id: 'atelio/money-movement/money-movement',
              label: 'Money movement',
            },
            {
              type: 'category',
              label: 'Transactions',
              items: [
                {
                  type: 'doc',
                  id: 'atelio/money-movement/transactions-overview',
                  label: 'Transactions overview',
                },
                {
                  type: 'doc',
                  id: 'atelio/money-movement/payment-types',
                  label: 'Payment types',
                },
                {
                  type: 'doc',
                  id: 'atelio/money-movement/mcc-codes-and-descriptions',
                  label: 'MCC codes and descriptions',
                }
              ]
            },
            {
              type: 'category',
              label: 'Account transfers',
              items: [
                {
                  type: 'doc',
                  id: 'atelio/money-movement/account-transfers',
                  label: 'Account transfers',
                },
                {
                  type: 'doc',
                  id: 'atelio/money-movement/ach-transfers',
                  label: 'ACH transfers',
                },
                {
                  type: 'doc',
                  id: 'atelio/money-movement/making-ach-transfers',
                  label: 'Making ACH transfers',
                },
                {
                  type: 'doc',
                  id: 'atelio/money-movement/ach-return-codes',
                  label: 'ACH return codes',
                },
                {
                  type: 'doc',
                  id: 'atelio/money-movement/account-fund-transfers',
                  label: 'Creating a transfer',
                },
                {
                  type: 'doc',
                  id: 'atelio/money-movement/make-a-payment',
                  label: 'Make a payment',
                },
              ] 
            } // Account transfers
          ] 
        }, // Money movement
        {
          type: 'category',
          label: 'Developers',
          items: [
            {
              type: 'doc',
              id: 'atelio/developers/error-handling',
              label: 'Error handling'
            },
            {
              type: 'doc',
              id: 'atelio/developers/hmac-signature',
              label: 'HMAC signature',
            },
            {
              type: 'doc',
              id: 'atelio/developers/api-headers',
              label: 'API headers',
            },
            {
              type: 'doc',
              id: 'atelio/developers/web-sdk-documentation',
              label: 'Web SDK documentation',
            },
          ]
        }, // Developers
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
  ], // sidebarAtelioGuides

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
    } // end sidebarNium
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
  ],
      sidebarSolar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        {
          type: 'doc',
          id: 'solar/intro/mistakes',
          label: 'solar_intro',
        }
      ]
    },
  ]
};
export default sidebars;