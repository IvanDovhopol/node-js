const service = require('../service');

const get = async (req, res, next) => {
  try {
    const tasks = await service.getAllTasks();
    res.json({
      success: true,
      code: 200,
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getBuId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await service.getTaskById(id);

    if (task) {
      return res.json({
        success: true,
        code: 200,
        data: { task },
      });
    }

    res.status(404).json({
      success: false,
      code: 404,
      message: 'Task not found',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    const task = await service.createTask({ title, text });

    res.status(201).json({
      success: true,
      code: 201,
      data: { task },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, text } = req.body;
  try {
    const task = await service.updateTask(id, { title, text });

    if (task) {
      return res.json({
        success: true,
        code: 200,
        data: { task },
      });
    }

    res.status(404).json({
      success: false,
      code: 404,
      message: 'Task not found',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { isDone = false } = req.body;
  try {
    const task = await service.updateTask(id, { isDone });

    if (task) {
      return res.json({
        success: true,
        code: 200,
        data: { task },
      });
    }

    res.status(404).json({
      success: false,
      code: 404,
      message: 'Task not found',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await service.removeTask(id);
    if (task) {
      return res.json({
        success: true,
        code: 200,
        data: { task },
      });
    }

    res.status(404).json({
      success: false,
      code: 404,
      message: 'Task not found',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  get,
  getBuId,
  create,
  update,
  updateStatus,
  remove,
};
