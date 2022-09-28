import React from "react";
import AutoComplete from "./Components/AutoComplete";
import data from "./data.json";

const App = () => {
  // you need to make a new array
  const options =
    data &&
    data.map((item) => ({
      id: item.id,
      userName: item.username, // optional (if you need)
      email: item.email, // optional (if you need)
      value: item.name, // value is required !what you searching in input (auto Complete)
    }));

  const selectItem = (item) => {
    console.log("item", item); //Your selection is being logged
  };

  return (
    <div className="container">
      <AutoComplete
        options={options}
        defaultValue={""} // optional default Value now only for text
        selectItem={selectItem}
        placeholder="Search Name ...."
      />
    </div>
  );
};

export default App;
