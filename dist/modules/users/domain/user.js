"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class User {
  constructor(props, id) {
    this._id = id;
    this._props = props;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._props.name;
  }

  get email() {
    return this._props.email;
  }

  get age() {
    return this._props.age;
  }

  get passwordHash() {
    return this._props.passwordHash;
  }

  get createdAt() {
    return this._props.createdAt;
  }

  get updatedAt() {
    return this._props.updatedAt;
  }

  get isDeleted() {
    return this._props.isDeleted;
  }

}

var _default = User;
exports.default = _default;