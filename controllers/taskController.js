import db from "../drizzle/db.js";
import { tasks } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await db.query.tasks.findMany({
      where: (id) => eq(id.userId, userId),
    });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const task = await db
    .insert(tasks)
    .values({
      userId,
      title,
      description,
    })
    .returning();

  res.json({ message: "Task created successfully", task: task[0] });
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  // const userId = req.user.id;

  if (!taskId) {
    return res.status(400).json({ message: "Task ID is required" });
  }

  // await db
  //   .delete(tasks)
  //   .where((t, { and, eq }) => and(eq(t.id, taskId), eq(t.userId, userId)));

  await db.delete(tasks).where(eq(tasks.id, taskId));
  res.json({ message: "Task deleted successfully" });
};
