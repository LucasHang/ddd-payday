"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Identifier = _interopRequireDefault(require("./Identifier"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UniqueEntityID extends _Identifier.default {
  constructor(id) {
    super(id || (0, _uuid.v4)());
  }

}

var _default = UniqueEntityID;
exports.default = _default;