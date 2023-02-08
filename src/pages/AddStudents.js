import React from 'react'
import '../App.css';
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { addDoc, collection, getDocs } from 'firebase/firestore';

const AddStudents = () => {
  const [students, setStudents] = useState([]);
  const studentsCollectionReff = collection(db, "students");

  const [newId, setNewId] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newMiddleName, setNewMiddleName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newClass, setNewClass] = useState("");
  const [newDivision, setNewDivision] = useState("");
  const [newRollNumber, setNewRollNumber] = useState("");
  const [newAddressLine1, setNewAddressLine1] = useState("");
  const [newAddressLine2, setNewAddressLine2] = useState("");
  const [newLandmark, setNewLandmark] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newPincode, setNewPincode] = useState("");

  const [buttonPopup, setButtonPopup] = useState(false);
  const getStudents = async () => {
    const data = await getDocs(studentsCollectionReff);
    setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const createUser = async () => {
    let student = { firstname: newFirstName, middlename: newMiddleName, lastname: newLastName, class: newClass, division: newDivision, rollnumber: newRollNumber, addressline1: newAddressLine1, addressline2: newAddressLine2, landmark: newLandmark, city: newCity, pincode: newPincode }
    await addDoc(studentsCollectionReff, student)
      .then(() => {
        getStudents()
        alert("Added");
      })
  }

  const updateStudent = async (id, editedValue) => {
  }

  const editStudentPopup = (id, firstname, middlename, lastname, classes, division, rollnumber, addressline1, addressline2, landmark, city, pincode) => {

    setNewId(id);
    setNewFirstName(firstname);
    setNewMiddleName(middlename);
    setNewLastName(lastname);
    setNewClass(classes);
    setNewDivision(division);
    setNewRollNumber(rollnumber);
    setNewAddressLine1(addressline1);
    setNewAddressLine2(addressline2);
    setNewLandmark(landmark);
    setNewCity(city);
    setNewPincode(pincode);

    setButtonPopup(true);

  }

  useEffect(() => {

    getStudents()
  }, [])

  return (
    <div>

      <div className="addstudentfrom">
        <div className="tophead">

          <div className="heading">Add Student</div>
          <div className="top-date">25 Jul 2022  16:10</div>
        </div>
        <div className="frame183">
          <div className="fram184">

            <input className="input-from-field" placeholder='Fisrt Name' onChange={(event) => { setNewFirstName(event.target.value) }} />
            <input className="input-from-field" placeholder='Middle Name' onChange={(event) => { setNewMiddleName(event.target.value) }} />
            <input className="input-from-field" placeholder='Last Name' onChange={(event) => { setNewLastName(event.target.value) }} />
          </div>
          <div className="fram184">

            <input className="input-from-field" placeholder='Class' type='number' onChange={(event) => { setNewClass(event.target.value) }} />
            <input className="input-from-field" placeholder='Division' onChange={(event) => { setNewDivision(event.target.value) }} />
            <input className="input-from-field" type='number' placeholder='Roll Number' onChange={(event) => { setNewRollNumber(event.target.value) }} />
          </div>
          <br />
          <div className="fram184">

            <input className="fram68" placeholder='Address Line 1' onChange={(event) => { setNewAddressLine1(event.target.value) }} />
            <input className="fram68" placeholder='Address Line 2' onChange={(event) => { setNewAddressLine2(event.target.value) }} />
          </div>
          <div className="fram184">

            <input className="input-from-field" placeholder='Landmark' onChange={(event) => { setNewLandmark(event.target.value) }} />
            <input className="input-from-field" placeholder='City' onChange={(event) => { setNewCity(event.target.value) }} />
            <input className="input-from-field" type='number' placeholder='Pincode' onChange={(event) => { setNewPincode(event.target.value) }} />
          </div>
          <div className="frame177">
            <div onClick={createUser} className="frame174">Add Student</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AddStudents