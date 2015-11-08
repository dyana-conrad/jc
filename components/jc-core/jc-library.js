var JC = (function (JC) {
  var Library = JC.Library = {};

  var blueprints = {};

  var escapeForRegEx = function(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  Library.addBlueprint = function (blueprint) {
    if (!blueprint.id) {
      throw new Error("Cannot register a blueprint without an id attribute.");
    }
    blueprints[blueprint.id] = blueprint;
  }

  Library.removeBlueprint = function (blueprint) {
    delete blueprints[blueprint.id];
  }

  Library.removeBlueprintById = function (id) {
    delete blueprints[id];
  }

  Library.getBlueprintById = function (id) {
    return blueprints[id];
  }

  Library.searchBlueprints = function (regex) {
    var result = [];
    var keys = Object.keys(blueprints);
    for (var i = 0; i < keys.length; ++i) {
      var blueprint = blueprints[keys[i]];
      if (blueprint.tags && regex.exec(blueprint.tags) !== null) {
        result.push(blueprint);
      }
    }
  }

  Library.getBlueprintsByTag = function (tag) {
    var regex = new RegExp("\b" + escapeForRegEx(tag) + "\b", i);
    return Library.searchBlueprints(regex);
  }

  return JC;
})(JC || {});
