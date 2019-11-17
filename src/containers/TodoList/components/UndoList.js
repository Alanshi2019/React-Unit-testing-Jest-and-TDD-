import React, { Component } from "react";

class UndoList extends Component {
  render() {
    const {
      List,
      deleteItem,
      changeStatus,
      handleBlur,
      valueChange,
      addIntoFinishedList
    } = this.props;
    return (
      <div className="undo-list">
        <div className="undo-list-title">
          Processing
          <div data-test="count" className="undo-list-count">
            {List.length}
          </div>
        </div>

        <ul className="undo-list-ul">
          {List.map((item, index) => {
            return (
              <li
                className="undo-list-li"
                data-test="list-item"
                onClick={() => changeStatus(index)}
                key={index}
              >
                <span
                  data-test="check-item"
                  className="checkbox"
                  onClick={e => {
                    e.stopPropagation();
                    addIntoFinishedList(index);
                  }}
                ></span>
                {item.status === "div" ? (
                  item.value
                ) : (
                  <input
                    className="undo-item-input"
                    data-test="input"
                    value={item.value}
                    onBlur={() => handleBlur(index)}
                    autoFocus="autofocus"
                    onChange={e => valueChange(index, e.target.value)}
                  ></input>
                )}
                <span
                  className="undo-item-remove"
                  data-test="delete-item"
                  onClick={e => {
                    e.stopPropagation();
                    deleteItem(index);
                  }}
                >
                  -
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default UndoList;
