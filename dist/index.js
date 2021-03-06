"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.teste = teste;

var _Identifier = _interopRequireDefault(require("./core/domain/Identifier"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function teste() {
  const teste2 = new _Identifier.default(1);
  console.log(teste2);
  return teste2;
}

teste();