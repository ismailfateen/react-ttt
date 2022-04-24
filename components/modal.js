const MODAL_TYPES = {
    0: "It's a draw",
    1: "X",
    2: "O"
  }
  
  const Modal = ({ type, onClose }) => {
    return (
      <div className="modalBG">
        <div className="modal_container">
          <div className="modal_content">
            <h1 className={`winner winner_${MODAL_TYPES[type] !== "It's a draw" ? MODAL_TYPES[type] : "O"}`}>
              {MODAL_TYPES[type]}{MODAL_TYPES[type] !== "It's a draw" ? " won!" : "!"}
            </h1>
            <div className="footer">
              <button className={`close close${MODAL_TYPES[type] !== "It's a draw" ? MODAL_TYPES[type] : "O"}`} onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  };

export default Modal