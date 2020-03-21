"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const uuid_1 = require("uuid");
const bcrypt = __importStar(require("bcryptjs"));
class UserEntity {
    constructor(userSignupDTO, id) {
        this.id = id ? id : uuid_1.v4();
        this.username = userSignupDTO.username;
        this.eMail = userSignupDTO.eMail;
        this.firstName = userSignupDTO.firstName;
        this.lastName = userSignupDTO.lastName;
        this.role = userSignupDTO.role;
        this.hashPassword(userSignupDTO.password);
    }
    hashPassword(password) {
        this.hashedPassword = bcrypt.hashSync(password);
    }
    isPasswodValid(password) {
        return bcrypt.compareSync(password, this.hashedPassword);
    }
    classToAPI() {
        return {
            id: this.id,
            username: this.username,
            email: this.eMail,
            role: this.role,
            firstName: this.firstName,
            lastName: this.lastName
        };
    }
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    typegoose_1.prop({ required: true, unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    typegoose_1.prop({ required: true, unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "eMail", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], UserEntity.prototype, "hashedPassword", void 0);
exports.UserEntity = UserEntity;
exports.UserModel = typegoose_1.getModelForClass(UserEntity);
//# sourceMappingURL=User.js.map