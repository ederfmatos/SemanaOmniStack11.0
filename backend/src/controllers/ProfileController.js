const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    const incidents = await connection("incidents")
      .where("ong_id", ong_id)
      .select("*");

    // const [count] = await connection("incidents").count();

    // const incidents = await connection("incidents")
    //   .join("ongs", "ongs.id", "=", "incidents.ong_id")
    //   .where("ong_id", ong_id)
    //   .limit(5)
    //   .offset((page - 1) * 5)
    //   .select([
    //     "incidents.*",
    //     "ongs.name",
    //     "ongs.email",
    //     "ongs.whatsapp",
    //     "ongs.city",
    //     "ongs.uf"
    //   ]);

    // res.header("X-Total-Count", count["count(*)"]);

    return res.json(incidents);
  }
};
