import React, { useState } from "react";

function FormComponants() {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
    gender: "",
    licence: "",
    file: "",
  });

  function handleSubmit(e){
    e.preventDefault()

    console.log(data)

  }

  function handleChanges(e){

    let saveData={...data}

      // 1. Check what type of input triggered the change
  if (e.target.type === "checkbox") {
    saveData[e.target.name] = e.target.checked; // Saves true or false
  } else if (e.target.type === "file") {
    saveData[e.target.name] = e.target.files[0]; // Saves the actual File object
  } else {
    saveData[e.target.name] = e.target.value; // Handles text, password, and select dropdowns
  }


   setData(saveData)

  }

  return (
    <div>
      <h2>MY FORM</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">First Name</label>
        <input type="text" value={data.firstname} name="firstname" onChange={handleChanges} />
        <label htmlFor="">Last Name</label>
        <input type="text" value={data.lastname} name="lastname" onChange={handleChanges} />
        <label htmlFor="">Email</label>
        <input type="text" value={data.email} name="email" onChange={handleChanges} />
        <label htmlFor="">Password</label>
        <input type="text" value={data.password} name="password" onChange={handleChanges} />
        <label htmlFor="">confirm Password</label>
        <input type="text" value={data.cpassword} name="cpassword" onChange={handleChanges} />
        <label htmlFor="gender">Gender</label>
        <select name="gender" value={data.gender} onChange={handleChanges} id="gname">
            <option value="">Select Gender</option>
            <option value="m">M</option>
            <option value="f">F</option>
        </select>
        <label htmlFor="licence">Driving Licence</label>
            <input type="checkbox" name="licence" checked={data.licence} onChange={handleChanges} id="licence"/>
        <label htmlFor="file">Upload File</label>
<input 
  type="file" 
  name="file" 
  onChange={handleChanges} 
  id="file"
  // Note: Do NOT set 'value={data.file}' on file inputs for security reasons
/>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormComponants;
