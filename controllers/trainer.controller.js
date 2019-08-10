const trainerModel = require('../models/trainer.model');


exports.trainer_get = async (req, res) => {
    const trainer = await trainerModel.find({});
    try {
        res.send(trainer);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.trainer_create = async (req, res) => {
    const trainer = new trainerModel(req.body);

    try {
        await trainer.save();
        res.status(200).send(trainer);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.trainer_delete = async (req, res) => {
    try {
        const trainer = await trainerModel.findByIdAndDelete(req.params.id);

        if (!trainer) res.status(404).send("No item found")
        res.status(200).send()

    } catch (err) {
        res.status(500).send(err);
    }
}

exports.trainer_update = async (req, res) => {
    try {
        const trainer = await trainerModel.findByIdAndUpdate(req.params.id, req.body);
        await trainerModel.save();
        res.send(trainer)
    } catch (err) {
        res.status(500).send(err);
    }
}