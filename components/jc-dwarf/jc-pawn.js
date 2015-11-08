(function () {
  var maxZ = 1;

  Polymer({
    is: 'jc-pawn',
    properties: {
      blueprint: {
        type: String,
      },
      x: {
        type: Number,
        value: 0,
      },
      y: {
        type: Number,
        value: 0,
      },
      isReady: {
        type: Boolean,
        readOnly: true,
      },
    },
    observers: [
      '_restampBlueprint(blueprint, isReady)',
      '_observePosition(x, y)',
    ],
    attached: function () {
      this.async(function () {
        this._setIsReady(true);
      });

      interact(this)
        .draggable({
          // enable inertial throwing
          inertia: false,
          // keep the element within the area of it's parent
          restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
          },
          // enable autoScroll
          autoScroll: false,

          // call this function on every dragmove event
          onmove: function (event) {
            var target = event.target;
            target.x += event.dx;
            target.y += event.dy;
          },
          // call this function on every dragend event
          onend: function (event) {
            event.target.classList.remove('moving');
          },
          oncancel: function (event) {
            event.target.classList.remove('moving');
          },
          onstart: function (event) {
            event.target.classList.add('moving');
            event.target.style.zIndex = maxZ++;
          }
        });
    },
    _observePosition: function (x, y) {
      this.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';
    },
    _restampBlueprint: function (blueprintId, isReady) {
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
  });
})();
