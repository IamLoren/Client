import React from "react";
import { oneUserTypes } from "../../redux/adminSlice/adminSliceTypes";

const UserString: React.FC<{ user: oneUserTypes, index: number }> = ({
  user,
  index,
}) => {
  return (
    <tr className="bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors">
      <td className="p-2 border-b border-gray-200 text-center">{index + 1}</td>
      <td className="p-2 border-b border-gray-200 text-center">{user._id}</td>
      <td className={`p-2 border-b border-gray-200 text-center font-medium`}>{user.firstName}</td>
      <td className="p-2 border-b border-gray-200 text-center text-sm font-semibold">
        {user.lastName}
      </td>
      <td className="p-2 border-b border-gray-200 text-center">{user.role}</td>
      <td  className={`p-2 border-b border-gray-200 text-center font-medium`}>
        {user.email}
      </td>
      <td  className={`p-2 border-b border-gray-200 text-center font-medium`}>
        {new Date(user.createdAt).toLocaleString()}
      </td>
    </tr>
  );
};

export default UserString;
