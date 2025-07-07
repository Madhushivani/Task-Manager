const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({ ...req.body, owner: req.user.id });
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    const { page = 1, limit = 10, sort = 'createdAt' } = req.query;
    const skip = (page - 1) * limit;
    try {
        const tasks = await Task.find({ $or: [{ owner: req.user.id }, { sharedWith: req.user.id }] })
            .sort({ [sort]: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
