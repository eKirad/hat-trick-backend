"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = require("../models/Team");
exports.teamController = {
    getAllTeams: (req, res) => {
        Team_1.Team
            .find({})
            .then(teams => {
            res
                .status(200)
                .json(teams);
        });
    }
};
//# sourceMappingURL=team-controller.js.map