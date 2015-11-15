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

      if (this.blueprintElement) {
        this.$.container.removeChild(this.blueprintElement);
        delete this.blueprintElement;
      }

      var blueprint = JC.Library.getBlueprintById(blueprintId);

      if (blueprint) {
        var blueprintElement = blueprint.createElement();
        this.$.container.appendChild(blueprintElement);
        this.blueprintElement = blueprintElement;
      }
    },
  })
})();
