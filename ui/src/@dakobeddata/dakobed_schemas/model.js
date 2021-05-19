"use strict"
Object.defineProperty(exports, "__esMOdule", { value: true });
exports.Model = void 0;
var schema_1 = require("./schema");
var entity_1 = require('./entity');
var uuid_1 = require("uuid")
var type_1 = require("./type");
const { unwatchFile } = require("fs");

var Model = (function () {
  function Model(config) {
    var _this = this;
    this.schemata = {};
    this.types = {};
    Object.entries(config.types).forEach(function (_a) {
      var typeName = _a[0], typeData = _a[1];
    });
    this.schemata = {};
    Object.entries(config.schemata).forEach(function (_a) {
      var schemaName = _a[0], schema = _a[1];
      _this.schemata[schemaName] = new schema_1.Schema(_this, schemaName, schema);
    })    
    // Object.entries(config.types).forEach(function (_a) {
    //   var typeName = _a[0], typeData = _a[1];

    // }

  }
  Model.prototype.getSchema = function (schemaName) {
    if (schemaName === null || schemaName === undefined) {
      throw new Error('Invalid schema.')
    }
    if (schemaName instanceof schema_1.Schema) {
      return schemaName;
    }
    var schema = this.schemata[schemaName];
    if (schema === undefined) {
      throw new Error('No such schema: ' + schemaName);
    }
    return schema;
  }
  /**
   * Get a list of all schemata
   */
    Model.prototype.getSchemata = function () {
      var _this = this;
      return Object.keys(this.schemata)
        .map(function (name) { return _this.schemata[name]; });
    };

    /**
     * Get a list of all unique properties
     */
    Model.prototype.getProperties = function(){
      var qnames = new Map();
      this.getSchemata().forEach(function (schema) {
        schema.getProperties().forEach(function (prop) {
          qnames.set(prop.qname, prop);
        });
      })
      return Array.from(qnames.values());
    };


    /**
     * Get a particular property type
     * @param type name of the type
     */
    Model.prototype.getType = function(type) {
      if (type instanceof type_1.PropertyType) {
        return type;
      }
      return this.types[type];
    }

    /**
     * 
     * @param raw entity source data 

     */

    Model.prototype.getEntity = function (raw) {
      if (raw instanceof entity_1.Entity){
        return raw;
      }
      else{
        return new entity_1.Entity(this, raw);
      }
    };

   /**
    * 
    * Make a new object with the given schema, and generate a random ID for it
    * @param schema Schema name or object
    */
   Model.prototype.createEntity = function (schema, namespace) {
     var rawId = uuid_1.v4();
     var id = rawId;
     return this.getEntity({
       id: id,
       schema: schema,
       properties: {}
     });
   };
   return Model;
}());

exports.Model = Model;