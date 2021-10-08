import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  name: 'layouts-groups',

  initialize(container) {
    const siteSettings = container.lookup('site-settings:main');
    const site = container.lookup('site:main');

    let currentUser;
    withPluginApi('0.12.2', (api) => {
      currentUser = api.getCurrentUser();
    });

    let layouts;
    let layoutsError;

    // Import layouts plugin with safegaurd for when widget exists without plugin:
    try {
      layouts = requirejs(
        'discourse/plugins/discourse-layouts/discourse/lib/layouts'
      );
    } catch (error) {
      layoutsError = error;
      console.warn(layoutsError);
    }

    if (layoutsError) return;

    const props = {};

    if (!currentUser) {
      const { groups } = site;
      props['groups'] = groups;
    } else {
      const { groups } = currentUser;
      props['groups'] = groups;
    }

    layouts.addSidebarProps(props);
  },
};
