import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectAllCars, selectAllUsers } from "../../redux/selectors";
import {
  changeSearchResult,
  clearAdminSearchResult,
} from "../../redux/adminSlice/adminSlice";
import { getAllUsers } from "../../redux/adminSlice/operations";
import UsersTable from "../UsersTable/UsersTable";
import CarsTable from "../CarsTable/CarsTable";
import { CarInterface } from "../../redux/carRentalSlice/carRentalSliceTypes";
import { oneUserTypes } from "../../redux/adminSlice/adminSliceTypes";

const AdminSearchPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const AllCars = useAppSelector(selectAllCars) as CarInterface[];
  const AllUsers = useAppSelector(selectAllUsers) as oneUserTypes[];
  const userProps = ["id", "fullName", "email", "role"];
  const carProps = [
    "id",
    "make",
    "model",
    "year",
    "type",
    "fuel",
    "transmission",
    "isRemoved",
  ];

  type CarKeys = keyof CarInterface;
  type UserKeys = keyof oneUserTypes;
  const [selectedItem, setSelectedItem] = useState("user");

  useEffect(() => {
    dispatch(getAllUsers());
    return () => {
      dispatch(clearAdminSearchResult());
    };
  }, [dispatch]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(clearAdminSearchResult());
    setSelectedItem(event.target.value);
  };
  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parameter =
      event.target.parameter.value === "id"
        ? "_id"
        : event.target.parameter.value;
    const value = event.target.searchValue.value;
    let searchResult;

    if (event.target.carOrUser.value === "car") {
      const carParameter = parameter as CarKeys;
      searchResult = AllCars.filter((car) => {
        const carValue = car[carParameter];
        return (
          typeof carValue === "string" &&
          carValue.toLowerCase().includes(value.toLowerCase())
        );
      });
    }
    if (event.target.carOrUser.value === "user") {
      const userParameter = parameter as UserKeys;
      searchResult = AllUsers.filter((user) => {
        if (parameter === "fullName") {
          return (
            user.firstName.toLowerCase().includes(value.toLowerCase()) ||
            user.lastName.toLowerCase().includes(value.toLowerCase())
          );
        } else {
          const userValue = user[userParameter];
          return (
            typeof userValue === "string" &&
            userValue.toLowerCase().includes(value.toLowerCase())
          );
        }
      });
    }
    dispatch(changeSearchResult(searchResult));
  };

  return (
    <section className="p-4 md:p-6 rounded-lg shadow-md flex-1">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-wrap gap-4 mb-[20px] items-center"
      >
        <label htmlFor="carOrUser" className="text-gray-700 font-medium">
          Find:
        </label>
        <select
          id="carOrUser"
          name="carOrUser"
          className="w-24 h-10 pl-[10px] rounded-md border border-color primary-background box-shadow outline-blue-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          onChange={handleSelectChange}
        >
          <option value="user">User</option>
          <option value="car">Car</option>
        </select>

        <label htmlFor="parameter" className="text-gray-700 font-medium">
          by property:
        </label>
        <select
          id="parameter"
          name="parameter"
          className="w-32 h-10 pl-[10px] rounded-md border border-color primary-background box-shadow outline-blue-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          {selectedItem === "user"
            ? userProps.map((prop) => {
                return (
                  <option value={prop} key={prop}>
                    {prop}
                  </option>
                );
              })
            : carProps.map((prop) => {
                return (
                  <option value={prop} key={prop}>
                    {prop}
                  </option>
                );
              })}
        </select>

        <div className="flex-1 min-w-[150px] relative flex items-center">
          <input
            type="text"
            className="w-full h-10 pl-[10px] rounded-l-md border border-color primary-background box-shadow outline-blue-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
            placeholder="type value"
            name="searchValue"
          />
          <Button type="submit" buttonName="Find" />
        </div>
      </form>

      {selectedItem === "user" && <UsersTable />}
      {selectedItem === "car" && <CarsTable />}
    </section>
  );
};

export default AdminSearchPanel;
