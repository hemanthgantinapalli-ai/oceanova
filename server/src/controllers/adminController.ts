import { Request, Response } from 'express';
import { TaskModel, TraineeModel, AuditLogModel, UserModel } from '../models/Schemas';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find();
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, workstreamCode, boardName, priority, assigneeName, dueDate } = req.body;
    const taskId = `TSK-${Math.floor(1000 + Math.random() * 9000)}`;

    const task = await TaskModel.create({
      taskId,
      title,
      description,
      workstreamCode: workstreamCode || 'WS-01',
      boardName: boardName || 'Mangrove Operations',
      status: 'In Progress',
      priority: priority || 'Medium',
      assigneeName: assigneeName || 'Field Operations Lead',
      subtasks: [],
      dueDate: dueDate || new Date(Date.now() + 864000000).toISOString().split('T')[0]
    });

    res.json({ success: true, message: 'Task created.', data: task });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await TaskModel.findOneAndUpdate({ taskId }, { status }, { new: true });
    res.json({ success: true, message: 'Task status updated.', data: task });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getTrainees = async (req: Request, res: Response) => {
  try {
    const trainees = await TraineeModel.find();
    res.json({ success: true, count: trainees.length, data: trainees });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const logs = await AuditLogModel.find().sort({ timestamp: -1 }).limit(50);
    res.json({ success: true, count: logs.length, data: logs });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
