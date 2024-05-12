import { useState, useEffect, ChangeEvent } from "react";
import AddedTask from "./components/AddedTask";
import "./App.css";

interface Task {
  id: number;
  title: string;
  time: string;
  completed: boolean;
}

function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<{ title: string; time: string }>({
    title: "",
    time: "",
  });
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const storedTasks: Task[] | null = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAdd(): void {
    if (newTask.title.trim() !== "") {
      const newTaskItem: Task = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title: newTask.title,
        time: new Date().toISOString(),
        completed: false,
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask({ title: "", time: "" });
    } else {
      alert("Please enter a task before adding.");
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask({ ...newTask, title: event.target.value });
  }

  function handleFilterChange(event: ChangeEvent<HTMLSelectElement>) {
    setFilter(event.target.value);
  }

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = filter === "all" ? tasks : tasks.filter(task => {
    return filter === "true" ? task.completed : !task.completed;
  });

  return (
    <div className="container w-3/5 mx-auto">
      <h1 className="uppercase text-center font-bold text-5xl mt-8">
        todo task
      </h1>
      <div className="container w-2/7 mx-auto flex justify-between mt-16">
        <button
          className="bg-[#4A00FF] px-8 rounded-md text-white"
          onClick={() => document.getElementById("modal_2")!.showModal()}
        >
          Add Task
        </button>
        <dialog id="modal_2" className="modal w-96 h-48 mt-48 rounded-xl p-4">
          <div className="modal-box">
            <input
              type="text"
              placeholder="Enter task"
              className="w-[350px] p-3 mt-6 outline-none border rounded-lg"
              value={newTask.title}
              onChange={handleInputChange}
            />
          </div>
          <form className="modal flex justify-between">
            <button
              type="button"
              className="mt-8 px-7 py-1 text-lg ml-64"
              onClick={() => {
                document.getElementById("modal_2")!.close();
                handleAdd();
              }}
            >
              Add
            </button>
          </form>
        </dialog>
        <select
          className="select select-bordered w-28 outline-none rounded-md border-2 bg-gray-100 px-3 py-2 max-w-xs"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value={"all"}>All</option>
          <option value={"true"}>Active</option>
          <option value={"false"}>Inactive</option>
        </select>
      </div>
      <div className="container flex gap-4 flex-col w-2/7 mx-auto mt-10 bg-slate-100 rounded-lg p-5">
        {filteredTasks.map((task: Task) => (
          <AddedTask key={task.id} task={task} onToggleCompletion={toggleTaskCompletion} />
        ))}
      </div>
    </div>
  );
}

export default App;
