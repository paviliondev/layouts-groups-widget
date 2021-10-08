export default {
  name: 'layouts-groups',

  initialize(container) {
    const siteSettings = container.lookup('site-settings:main');
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

    const props = {
    };
    layouts.addSidebarProps(props);
  },
};
