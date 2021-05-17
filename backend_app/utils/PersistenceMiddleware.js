const Ping = require("../persistence/schemas/PingSchema");

const createPing = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).send({
      success: false,
      error: "You must provide a movie",
    });
  }

  const ping = new Ping(body);

  if (!ping) {
    return res.status(400).json({ success: false, error: err });
  }

  ping
    .save()
    .then(() => {
      return res.status(201).send({
        succes: true,
        id: ping._id,
        body: ping.body,
      })
    })
    .catch((error) => {
      return res.status(400).send({
        succes: false,
        error: "Unable to create ping",
      })
    });
};

const getPings = async (req, res) => {
  await Ping.find({}, (err, pings) => {
    if (err) {
      return res.status(400).send("Error");
    }
    if (!pings.length) {
      return res.status(404).send("Pings not found");
    }
    return res.status(200).json({ success: true, data: pings });
  }).catch((err) => console.log(err));
};

module.exports = {
  getPings,
  createPing,
}
