import { useState, useEffect } from "react";
import "./App.css";
import AddedTask from "./components/AddedTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAdd() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  return (
    <>
      <div className="container w-3/5 mx-auto">
        <h1 className="uppercase text-center font-bold text-5xl mt-8">
          todo task
        </h1>
        <div className="container w-2/7 mx-auto flex justify-between mt-16">
          <button
            className="bg bg-[#4A00FF] px-8 rounded-md text-white"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Add Task
          </button>
          <dialog
            id="my_modal_2"
            className="modal w-96 h-48 mt-48 rounded-xl p-4"
          >
            <div className="modal-box">
              <input
                type="text"
                placeholder="Enter task"
                className="w-[350px] p-3 mt-6 outline-none border border-spacing-1 rounded-lg"
                value={newTask}
                onChange={handleInputChange}
              />
            </div>
            <form method="dialog" className="modal flex justify-between">
              <button
                className="mt-8 px-7 py-1 text-lg ml-64"
                onClick={() => {
                  document.getElementById("my_modal_2").close();
                  handleAdd();
                }}
              >
                Add
              </button> 
            </form>
          </dialog>
          <select className="select select-bordered w-28 outline-none rounded-md border-2 bg-gray-100 px-3 py-2 max-w-xs">
            <option selected value={"all"}>
              All
            </option>
            <option value={"true"}>active</option>
            <option value={"false"}>inactive</option>
          </select>
        </div>
        <div className="container flex gap-4 flex-col w-2/7 mx-auto mt-10 bg-slate-100 rounded-lg p-5">
          {
           tasks.length > 0 && tasks.map((el, index) => {
              return (
                <AddedTask key={index} task={el}></AddedTask>
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default App;