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

    if (blueprints[blueprint.id]) {
      throw new Error("Trying to register a blueprint twice: " + blueprint.id);
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
      if (blueprint.tags && regex.test(blueprint.tags)) {
        result.push(blueprint);
      }
    }
    return result;
  }

  Library.getBlueprintsByTag = function (tag) {
    var regex = new RegExp("\\b" + escapeForRegEx(tag) + "\\b", 'i');
    return Library.searchBlueprints(regex);
  }

  function adoptBlueprints(link) {
    var nodeList = link.import.querySelectorAll('jc-blueprint');
    for (var i = 0; i < nodeList.length; ++i) {
      var node = document.adoptNode(nodeList[i]);
      document.body.appendChild(node);
    }
  }

  Library.adoptAllBlueprints = function (querySelector) {
    var nodeList = document.querySelectorAll(querySelector);
    for (var i = 0; i < nodeList.length; ++i) {
      var link = nodeList[i];
      adoptBlueprints(link);
    }
  }

  return JC;
})(JC || {});
