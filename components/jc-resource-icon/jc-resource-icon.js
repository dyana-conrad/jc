(function () {
  var iconMap = {
    food: 'icons:icons:group-work',
    energy: 'icons:icons:group-work',
    water: 'icons:icons:group-work',
    ore: 'icons:icons:group-work',
    crew: 'icons:icons:group-work',
  };

  Polymer({
    is: 'jc-resource-icon',
    properties: {
      resource: {
        type: String,
      },
      _icon: {
        type: String,
        value: 'icons:close',
        computed: '_computeIcon(resource)',
      },
    },
    _computeIcon: function (resource) {
      return iconMap[resource] | 'icons:close';
    },
  });
})();
