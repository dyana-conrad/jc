(function () {
  Polymer({
    is: 'jc-pawn',
    properties: {
      blueprint: {
        type: String,
      },
      backBlueprint: {
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
      scale: {
        type: Number,
        value: 1,
      },
      rotation: {
        type: Number,
        value: 0,
      },
      faceUp: {
        type: Boolean,
        value: true,
      },
    },
    observers: [
      '_observeTransform(x, y, scale, rotation)',
    ],
    attached: function () {
      interact(this)
        .gesturable({
          onstart: function (event) {
            console.log('gesture');
          },
          onmove: function (event) {
            console.log('gesture move', event);
            this.rotation += event.da;
          }.bind(this),
          onend: function (event) {
            var totalX = event.pageX - event.x0;
            var totalY = event.pageY - event.y0;
            var totalDistance = Math.sqrt(totalX * totalX + totalY * totalY);
            if (totalDistance > 200 && this.backBlueprint) {
              this.faceUp = !this.faceUp
            };
            this.rotation = Math.round(this.rotation / 90) * 90;
          }.bind(this),
        })
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
            // sanity check the input
            if (isNaN(event.dx) || isNaN(event.dy)) {
              return;
            }
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
            var oldParent = event.target.parentNode;
            oldParent.removeChild(event.target);
            oldParent.appendChild(event.target);
          }
        });
    },
    _observeTransform: function (x, y, scale, rotation) {
      this.style.transform =
        'translate(' + x + 'px, ' + y + 'px) rotate(' + rotation + 'deg) scale(' + scale + ')';
    },
  });
})();
