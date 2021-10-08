import { iconNode } from 'discourse-common/lib/icon-library';
import DiscourseURL from 'discourse/lib/url';
import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';

let layouts;

// Import layouts plugin with safegaurd for when widget exists without plugin:
try {
  layouts = requirejs(
    'discourse/plugins/discourse-layouts/discourse/lib/layouts'
  );
} catch (error) {
  layouts = { createLayoutsWidget: createWidget };
  console.warn(error);
}

export default layouts.createLayoutsWidget('group-list', {
  getWidgetHeader() {
    if (settings.show_header) {
      return h(
        'a.layouts-group-list-header',
        {
          attributes: {
            href: '/groups',
            title: I18n.t(themePrefix('groups_widget.title')),
          },
        },
        I18n.t(themePrefix('groups_widget.title'))
      );
    }

    return null;
  },

  html(attrs) {
    const { groups } = attrs;
    const contents = [];
    const groupItems = [];
    const title = this.getWidgetHeader();
    const hiddenGroups = settings.hidden_groups.split('|');

    if (groups == null || groups == undefined) return;

    if (groups.length === 0) {
      return [
        h('a.layouts-group-list-header', I18n.t(themePrefix('groups_widget.title'))),
        h('p.layouts-no-public-groups', I18n.t(themePrefix('groups_widget.no_public')))
      ];
    }

    groups.forEach((group) => {
      if (!hiddenGroups.includes(group.id.toString())) {
        groupItems.push(this.attach('layouts-group-link', group));
      }
    });

    contents.push(title, h('ul.layouts-group-list-items', groupItems));

    return contents;
  },
});

createWidget('layouts-group-link', {
  tagName: 'li.layouts-group-link',
  buildKey: (attrs) => `layouts-group-link-${attrs.id}`,

  getGroupTitle(group) {
    return h('span.group-title', group.name);
  },

  isOwner(group) {
    if (group.owner) {
      return h('span.group-owner-icon', iconNode('shield-alt'));
    }
  },

  html(attrs) {
    const contents = [this.getGroupTitle(attrs), this.isOwner(attrs)];
    return contents;
  },

  click() {
    DiscourseURL.routeTo(`/groups/${this.attrs.name}`);
  },
});
