"use strict"

var __createBinding = (this && this.__createBinding) ||  (Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; }}) 
}): (function(o,m,k,k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));

var __exportStar = (this && this.__exportStar) || function(m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};

var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esMOdule", { value: true});
exports.defaultModel = void 0;
__exportStar(require("./entity"), exports)
__exportStar(require("./model"), exports)
__exportStar(require("./property"), exports)
__exportStar(require("./schema"), exports)
__exportStar(require("./type"), exports)

var defaultModel_json_1 = __importDefault(require("./defaultModel.json"));
exports.defaultModel = defaultModel_json_1.default;