(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    var baseDbContext_1 = require("./baseDbContext");
    var LocalStogareDbContext = /** @class */ (function (_super) {
        __extends(LocalStogareDbContext, _super);
        function LocalStogareDbContext() {
            var _this = _super.call(this) || this;
            _this.DBNAME = '__LCS';
            _this._db = {};
            _this.getData();
            return _this;
        }
        // Actions
        LocalStogareDbContext.prototype.add = function (entity, item) {
            this.actionCollection.push({
                entity: entity,
                item: item,
                type: 'ADD'
            });
        };
        LocalStogareDbContext.prototype.update = function (entity, item) {
            this.actionCollection.push({
                entity: entity,
                item: item,
                type: 'UPD'
            });
        };
        LocalStogareDbContext.prototype.remove = function (entity, item) {
            this.actionCollection.push({
                entity: entity,
                item: item,
                type: 'REM'
            });
        };
        LocalStogareDbContext.prototype.commitChanges = function () {
            var _this = this;
            this.commit(function () {
                _this.actionCollection.forEach(function (a) {
                    if (a.type === 'ADD')
                        _this._add(a.entity, a.item);
                    else if (a.type === 'UPD')
                        _this._update(a.entity, a.item);
                    else
                        _this._delete(a.entity, a.item);
                });
            });
        };
        /// PRIVATE FUNCTIONS
        LocalStogareDbContext.prototype.getData = function () {
            var result = window.localStorage.getItem(this.DBNAME);
            this._db = JSON.parse(result);
        };
        LocalStogareDbContext.prototype.setData = function () {
            var jsonString = JSON.stringify(this._db);
            window.localStorage.setItem(this.DBNAME, jsonString);
        };
        LocalStogareDbContext.prototype.convert = function (jsonString) {
            return JSON.parse(jsonString);
        };
        LocalStogareDbContext.prototype.commit = function (fnc) {
            this.getData();
            fnc();
            this.setData();
        };
        LocalStogareDbContext.prototype._add = function (entity, item) {
            this._initCheckEntity(entity);
            this._db[entity.columnName].push(item);
        };
        LocalStogareDbContext.prototype._update = function (entity, item) {
            this._initCheckEntity(entity);
            this._db[entity.columnName].push(item);
        };
        LocalStogareDbContext.prototype._delete = function (entity, item) {
            this._initCheckEntity(entity);
            this._db[entity.columnName].push(item);
        };
        LocalStogareDbContext.prototype._initCheckEntity = function (entity) {
            if (!this._db[entity.columnName])
                this._db[entity.columnName] = [];
        };
        return LocalStogareDbContext;
    }(baseDbContext_1.BaseDbContext));
    exports.LocalStogareDbContext = LocalStogareDbContext;

})));
