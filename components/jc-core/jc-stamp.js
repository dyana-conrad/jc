(function () {
  Polymer({
    is: 'jc-stamp',
    properties: {
      blueprint: String,
      isReady: {
        type: Boolean,
        readOnly: true,
      },
    },
    observers: [
      '_updateStamp(blueprint, isReady)',
    ],
    attached: function () {
      this.async(function () {
        this._setIsReady(true);
      });
    },
    _updateStamp: function (blueprintId, isReady) {
      if (!isReady) {
        return;
      }

      var container = this.$.container;
      while (container.firstChild) {
          container.removeChild(container.firstChild);
      }

      var blueprint = JC.Library.getBlueprintById(blueprintId);

      if (blueprint) {
        var blueprintElement = blueprint.createElement();
        container.appendChild(blueprintElement);
      }
    },
  })
})();
