import { useRef, useState } from "react";
import { useEffect } from "react";
import Card from "./components/Card";
import { PuffLoader } from "react-spinners";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [phones, setPhones] = useState([]);
  const [pending,setPending] = useState(false)
  const [isUpdate,setIsUpdate] = useState(false)

  const nameRef = useRef("");
  const priceRef = useRef(0);
  const descRef = useRef("");
  const statusRef = useRef("active");

  useEffect(() => {
    setLoading(true)
    fetch("https://auth-rg69.onrender.com/api/products/all")
      .then(res => res.json())
      .then(data => {
       setPhones(data)
       console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function validate() {

    return true;
  }


  function handleClick(e) {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      const phone = {
        name: nameRef.current.value,
        description: descRef.current.value,
        status: statusRef.current.value,
        price: priceRef.current.value,
        category_id: 2,
      };

    

      fetch("https://auth-rg69.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(phone),
      })
        .then(res => res.json())
        .then(data => {
         if(data.id){
          let copied = JSON.parse(JSON.stringify(phones))
          copied.push(data);
          setPhones(copied);
          
         }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          nameRef.current.value = ''
          priceRef.current.value = ''
          descRef.current.value = ''
          statusRef.current.value = ''
        })
     
    }
  }

  function handleDelete(id){
    let isDelete = confirm("Are you sure you want to delete this information?");
    if(isDelete && id){
      fetch(`https://auth-rg69.onrender.com/api/products/${id}`,{
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => {
       if(data.message == "Mahsulot muvaffaqiyatli o'chirildi"){
        let copied = JSON.parse(JSON.stringify(phones));
        copied = copied.filter(el => {
          return el.id != id;
        })
        setPhones(copied);
       }

      })
      .catch(err => {
        console.log(err);
      })
    }
    }

    function handleUpdate(id){
      let res =  prompt("Enter name...")
      nameRef.current.value = res 
    }


    function handleUpdateItem(phone){
      setIsUpdate(true);
    }

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-2">Phones</h1>
        <form className="w-50 mx-auto d-flex flex-column gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter name..."
            ref={nameRef}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Enter price..."
            ref={priceRef}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Enter description"
            className="form-control"
            ref={descRef}
          ></textarea>

          <select name="" id="" className="form-control" ref={statusRef}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
         {
          !isUpdate &&  <button disabled = {pending ? true : false} onClick={handleClick} className="btn btn-primary">
            Save
          </button>
         }
         {
          isUpdate &&  <button disabled = {pending ? true : false} onClick={handleUpdate} className="btn btn-success">
          Update
            </button>
         }
        </form>
        <div className="card-wrapper mt-5 d-flex flex-wrap gap-3 justify-content-center">
          {
          loading && <PuffLoader size={78} color="cyan"></PuffLoader>
          }

          {
          !loading && phones.map((el, index) => {
              return (
              <Card deleteItem = {handleDelete} editItem = {handleUpdateItem} key={index} phone={el}></Card>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;