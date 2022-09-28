import React, { useEffect, useState } from "react";
import "./auto-complete.scss";
import { AiFillCloseCircle } from "react-icons/ai";

const AutoComplete = ({ options, selectItem, placeholder, defaultValue }) => {
  const [value, setValues] = useState(defaultValue ? defaultValue : "");
  const [listItem, setListItem] = useState([]);
  const [showList, setShowList] = useState(false);
  const [inputValue, setInputValue] = useState({
    inputSet: defaultValue ? defaultValue : "",
  });

  const { inputSet } = inputValue;

  const onChangeHandler = (e) => {
    setValues(e.target.value);
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });

    e.target.value.length === 0 && selectItem();
  };

  const remove = () => {
    setInputValue({ ...inputValue, inputSet: "" });
    selectItem();
  };

  useEffect(() => {
    if (value.length > 1) {
      options && setListItem([...options]);
      setShowList(true);
      if (value.length > 2) {
        const newValues =
          options &&
          options.filter(
            (el) =>
              el.value.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >
              -1
          );
        setListItem([...newValues]);
        if (newValues.length === 0) {
          setShowList(false);
        }
      }
    } else {
      setShowList(false);
      options && setListItem([...options]);
    }
  }, [value]);

  return (
    <div className="auto_container ">
      <input
        value={inputSet}
        onChange={(e) => onChangeHandler(e)}
        placeholder={placeholder}
        type="text"
        className="auto_container_input "
        name="inputSet"
      />

      <AiFillCloseCircle className="auto_container_close" onClick={remove} />
      <ul className={`auto_container_list hide  ${showList && "show"}`}>
        {listItem.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              selectItem(item);
              setShowList(false);
              setInputValue({ ...inputValue, inputSet: item?.value });
            }}
          >
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoComplete;
