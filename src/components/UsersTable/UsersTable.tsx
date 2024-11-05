import React from "react";
import UserString from "./UserString";
import { useAppSelector } from "../../hooks";
import { selectAdminSearchResult } from "../../redux/selectors";
import { oneUserTypes } from "../../redux/adminSlice/adminSliceTypes";

const UsersTable: React.FC = () => {
    const listForRender = useAppSelector(selectAdminSearchResult) as oneUserTypes[]
  return (
    <div>
      <table className="w-full border-collapse rounded-lg overflow-hidden box-shadow">
        <thead className="secondary-background">
          <tr className="">
          <th className="p-[10px]">Number</th>
            <th className="p-[10px]">Id</th>
            <th className="p-[10px]">firstName</th>
            <th className="p-[10px]">lastName</th>
            <th className="p-[10px]">Role</th>
            <th className="p-[10px]">email</th>
            <th className="p-[10px]">Created at</th>
          </tr>
        </thead>
        <tbody>
          {listForRender?.map((user, index) => (
            <UserString key={user._id} user={user} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;