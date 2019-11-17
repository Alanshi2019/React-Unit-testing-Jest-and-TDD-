import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

class FinishedList extends Component {
  render() {
    const { List, deleteItem } = this.props;
    return (
      <div className="undo-list">
        <div className="undo-list-title">
          Finished
          <div data-test="count" className="undo-list-count">
            {List.length}
          </div>
        </div>

        <ul className="undo-list-ul">
          {List.map((item, index) => {
            return (
              <li
                className="finished-list-li"
                data-test="list-item"
                key={index}
              >
                <span data-test="check-item" className="checkbox">
                  <FontAwesomeIcon className="icon" icon={faCheckCircle} />
                </span>
                {item}
                <span
                  data-test="delete-item"
                  className="finished-item-remove"
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

export default FinishedList;
