var conn = require("../../configs/db");

module.exports = (req, res) => {
    conn.consultarWhereClause(
        "view_tercero.terceroid as id, view_tercero.terceroalias as alias",
        " view_tercero",
        "tercerocuit = '11111111113'", //numero asignado por cimac
        function (response, error) {
            if (response) {
                res.json(JSON.parse(response));
                console.log("Obras sociales enviadas con éxito");
            }
        }
    );
};
