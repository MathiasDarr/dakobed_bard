"use strict"
Object.defineProperty(exports, "__esModule", { value: true})
exports.PropertyType = void 0;

var PropertyType = /** @class  */ (function() {
  function PropertyType(name, data) {
    var _this = this;
    this.name = name;
    this.label = data.label || name;
    this.isEntity = name === PropertyType.ENTITY;
    if (data.values) {
      Object.entries(data.values).forEach(function (_a) {
        var value = _a[0], label = _a[1];
        _this.values.set(value, label);
      });
    }
  }
  PropertyType.prototype.getLabel = function (value) {
    if (!value) {
      return '';
    }
    return this.values.get(value) || value;
  };
  PropertyType.prototype.toString = function () {
    return this.name;
  }
  PropertyType.ENTITY = 'entity';
  return PropertyType;
}());

exports.PropertyType = PropertyType;