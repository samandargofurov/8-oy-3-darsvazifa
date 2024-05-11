import { PiTrashSimpleFill } from "react-icons/pi";
import { MdModeEditOutline } from "react-icons/md";

function AddedTask(props) {
  const { title } = props
  
  // function getDate() {
  //     const today = new Date();
  //     const month = today.getMonth() + 1;
  //     const year = today.getFullYear();
  //     const date = today.getDate();
  //   }

  //   const obj: TaskTypes = {
  //     dateTime: getDate(),
  //     time: new Date().toLocaleTimeString()
  // }

function handleRemove() {

}

  return (
    <>
      <div>
        <div className="w-full flex justify-between items-center bg-white rounded-lg py-3 px-5">
          <div className="flex gap-5 items-center">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-primary w-6 h-6"
              />
            </label>
            <div className="flex flex-col gap-1">
                <h1>{title}</h1>
                <p className="text-sm">12:34, 03/12/2024</p>
            </div>
          </div>
          <div className="flex gap-5">
            <span className="text-xl bg-gray-200 p-2 rounded-md cursor-pointer" onClick={handleRemove}>
              <PiTrashSimpleFill />
            </span>
            <span className="text-xl bg-gray-200 p-2 rounded-md cursor-pointer">
              <MdModeEditOutline />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddedTask;

