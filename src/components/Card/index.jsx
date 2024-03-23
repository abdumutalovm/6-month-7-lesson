import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import './index.css'

function Card(props) {
  const { name, description, price, status, id } = props.phone;
  const { deleteItem, editItem } = props; // editItem propini qo'llab quvvatlash

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">${price}</h6>
        <p className="card-text">{description}</p>
        <div className="d-flex gap-3">
          <span
            onClick={() => {
              deleteItem(id);
            }}
            className="delete"
          >
            <FaRegTrashCan />
          </span>
          <span
            onClick={() => {
              editItem();
            }}
            className="edit"
          >
            <FaEdit />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
