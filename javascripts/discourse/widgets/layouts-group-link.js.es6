import { iconNode } from 'discourse-common/lib/icon-library';
import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';

createWidget('layouts-group-link', {
  tagName: 'li.layouts-group-link',
  buildKey: (attrs) => `layouts-group-link-${attrs.id}`,

  buildAttributes() {
    const { extras } = this.attrs;
    let displayName = this.attrs.name;

    if (extras && extras.full_name) {
      displayName = extras.full_name;
    }

    const attributes = {
      title: displayName,
    };

    return attributes;
  },

  getGroupIcon(group) {
    if (!settings.show_group_icons) return;
    if (!group.extras) return;
    let icon = '';

    if (group.extras.flair_icon) {
      icon = iconNode(group.extras.flair_icon);
    } else if (group.extras.flair_url) {
      icon = h('img.group-icon-image', {
        attributes: {
          src: group.extras.flair_url,
        },
      });
    } else {
      icon = iconNode('users');
    }

    return h('span.group-icon', icon);
  },

  getGroupTitle(group) {
    return h('span.group-title', group.name);
  },

  isOwner(group) {
    if (!settings.show_group_owner_icon) return;
    if (!group.owner) return;

    return h('span.group-owner-icon', iconNode('shield-alt'));
  },

  html(attrs) {
    const contents = [
      this.getGroupIcon(attrs),
      this.getGroupTitle(attrs),
      this.isOwner(attrs),
    ];
    return contents;
  },

  click() {
    const { extras } = this.attrs;

    if (extras.has_messages) {
      DiscourseURL.routeTo(`/g/${this.attrs.name}/messages`);
    } else {
      DiscourseURL.routeTo(`/g/${this.attrs.name}`);
    }
  },
});
