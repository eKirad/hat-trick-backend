"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    familyName: { type: String, required: true },
    username: { type: String, required: true, uniue: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    genedr: { type: String },
    dateOfBirth: { type: String }
});
exports.User = mongoose_1.default.model(`User`, userSchema);
//# sourceMappingURL=User.js.map