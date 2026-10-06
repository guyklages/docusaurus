import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import PageSearch from '@site/src/components/PageSearch';

// Registers the `custom-pageSearch` navbar item type.
export default {
  ...ComponentTypes,
  'custom-pageSearch': PageSearch,
};
