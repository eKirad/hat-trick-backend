"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = require("../models/Team");
const getAllTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield Team_1.Team.find({});
        yield res.status(200).json(teams);
    }
    catch (e) {
        console.error(e);
    }
});
const getTeam = (req, res) => {
};
const addTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTeam = yield Team_1.Team.create({
            name: req.body.name,
            country: req.body.country
        });
        yield res.status(200).json(newTeam);
    }
    catch (e) {
        console.error(e);
    }
});
const deleteTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTeam = yield Team_1.Team.findByIdAndRemove(req.params.id);
        yield res.status(200).json({
            message: `Team with id=${req.params.id} was successfully deleted.`
        });
    }
    catch (e) {
        console.error(e);
    }
});
exports.teamController = {
    getAllTeams,
    getTeam,
    addTeam,
    deleteTeam
};
//# sourceMappingURL=team-controller.js.map