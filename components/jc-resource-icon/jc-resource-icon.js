(function () {
  var iconMap = {
    food: 'icons:image:nature',
    energy: 'image:flash-on',
    water: 'icons:invert-colors',
    ore: 'image:landscape',
    crew: 'social:person',
    money: 'editor:attach-money',
  };

  Polymer({
    is: 'jc-resource-icon',
    properties: {
      resource: {
        type: String,
        reflectToAttribute: true,
      },
      _icon: {
        type: String,
        value: 'icons:close',
        computed: '_computeIcon(resource)',
      },
    },
    _computeIcon: function (resource) {
      return iconMap[resource] || 'icons:close';
    },
  });
})();
