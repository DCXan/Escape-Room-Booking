import React, { useState } from "react";
import Datetime from "react-datetime";
import Modal from "react-modal";

function AddEventModal({ isOpen, onClose, onEventAdded }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const onSubmit = (event) => {
    event.preventDefault();

    onEventAdded({
      title,
      start,
      end,
    });
    onClose();
  };

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <label>Start Date</label>
            <Datetime value={start} onChange={(date) => setStart(date)} />
          </div>
          <div>
            <label>End Date</label>
            <Datetime value={end} onChange={(date) => setEnd(date)} />
          </div>
          <button
            className="text-3xl p-1 m-4 hover:drop-shadow-xl hover:bg-light-gray dark:bg-secondary-dark-bg text-white relative"
            style={{ background: "darkgray", borderRadius: "5%", zIndex: "0" }}
          >
            Add Event
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default AddEventModal;
