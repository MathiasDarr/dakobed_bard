"use-strict"
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;

var property_1 = require("./property")

var Schema = /**class  */ (function () {
  function Schema(model, schemaName, config) {
    var _this = this;
    this.properties = new Map();
    this.model = model;
    this.name = schemaName;
    this.label = config.label || this.name;
    this.schemata = config.schemata;
    this.extends = config.extends;
    Object.entries(config.properties).forEach(function (_a) {
      var propertyName = _a[0], property = _a[1];
      _this.properties.set(propertyName, new property_1.Property(_this, property));
    });
  }
  Schema.prototype.isThing = function () {
    return this.A(Schema.THING)
  };

  Schema.prototype.isDocument = function () {
    return this.A(Schema.DOCUMENT);
  }

  Schema.prototype.getExtends = function () {
    var _this = this;
    return this.extends.map(function (name) { return _this.model.getSchema(name); });
  }; 

  Schema.prototype.getProperties = function (qualified)  {
    if (qualified === void 0) { qualified = false};
    var properties = new Map();
    this.getExtends().forEach(function (schema) {
      schema.getProperties(qualified).forEach(function (prop, name) {
        properties.set(qualified ? prop.qname : name, prop);
      });
    });
    return properties;
  };

  Schema.prototype.getProperty = function (prop) {
    if (prop instanceof property_1.Property) {
      return prop;
    }
    if (this.hasProperty(prop)) {
      return this.getProperties().get(prop);
    }
    else {
      throw new Error('Property does not exist ' + prop);
    }
  }

  Schema.prototype.isA = function (schema) {
    try {
      schema = this.model.getSchema(schema);
      return !!~this.schemata.indexOf(schema.name);
    }
    catch (error) {
      return false;
    }
  }

  Schema.prototype.isAny = function (schemata) {
    for (var _i =0, schemata_1 = schemata; _i < schemata_1.length; _i++) {
      var schema = schemata_1[_i];
      if (this.isA(schema)) {
        return true;
      }
    }
    return false;
  }
  Schema.prototype.toString = function () {
    return this.name;
  }
  Schema.THING = "Thing";
  Schema.DOCUMENT = "Document";
  return Schema;
}());
exports.Schema = Schema; 