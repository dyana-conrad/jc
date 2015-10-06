(function () {
  Polymer({
    is: 'jc-resource-icon',
    properties: {
      resource: {
        type: String,
      },
      icon: {
        type: String,
        value: 'icons:close',
        computed: '_computeIcon(resource)',
      }
    },
  });
})();
