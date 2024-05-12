import { useState } from "react";
import { PiTrashSimpleFill } from "react-icons/pi";
import { MdModeEditOutline } from "react-icons/md";
import { Task } from "../types";

function AddedTask({ task }: { task: Task }) {
  const { title, time, completed } = task;
  const [isChecked, setIsChecked] = useState(completed);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  function handleRemove() {
   }

  return (
    <div>
      <div className="w-full flex justify-between items-center bg-white rounded-lg py-3 px-5">
        <div className="flex gap-5 items-center">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-primary w-6 h-6"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
          <div className={`flex flex-col gap-1 ${completed ? 'line-through' : ''}`}>
            <h1>{title}</h1>
            <p className="text-sm">{time}</p>
          </div>
        </div>
        <div className="flex gap-5">
          <span
            className="text-xl bg-gray-200 p-2 rounded-md cursor-pointer"
            onClick={handleRemove}
          >
            <PiTrashSimpleFill />
          </span>
          <span className="text-xl bg-gray-200 p-2 rounded-md cursor-pointer">
            <MdModeEditOutline />
          </span>
        </div>
      </div>
    </div>
  );
}

export default AddedTask;
