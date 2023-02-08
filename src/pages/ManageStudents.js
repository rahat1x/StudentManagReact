import React from 'react'
import '../App.css';
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import Popup from "../components/Popup";
import EditPopup from '../components/EditPopup';
import { async } from '@firebase/util';
const ManageStudents = () => {
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

  const [viewPopup, setViewPopup] = useState(false);

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

  const updateStudent = async () => {



const userDoc= doc(db, "students",newId)
const newFields = {firstname: newFirstName, middlename: newMiddleName, lastname: newLastName, class: newClass, division: newDivision, rollnumber: newRollNumber, addressline1: newAddressLine1, addressline2: newAddressLine2, landmark: newLandmark, city: newCity, pincode: newPincode}
    await updateDoc(userDoc, newFields);
    getStudents();
    setButtonPopup(false);
  }


  const deleteStudent = async (id) => {
    const userDoc= doc(db, "students",newId);

    await deleteDoc(userDoc);
    getStudents();
    setDeletePopup(false);

  }
  const deleteStudentpopup = (id) => {
    setNewId(id);
    setDeletePopup(true);
  }
  const [deletepopup, setDeletePopup] = useState(false);

  const editStudentPopup = (isEdit, id, firstname, middlename, lastname, classes, division, rollnumber, addressline1, addressline2, landmark, city, pincode) => {

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

    if (isEdit) {
      setButtonPopup(true);

    }
    else {
      setViewPopup(true);
    }


  }

  useEffect(() => {

    getStudents()
  }, [])

  return (
    <div>

      <div className="addstudentfrom">
        <div className="tophead">

          <div className="heading">Manage Students</div>
          <div className="top-date">25 Jul 2022  16:10</div>
        </div>
        <div className="frame183">
          <div className="frame62">
            <div className="rac222">
              <div className="head-table">
                Name
              </div>
              <div className="head-table">
                Class
              </div>
              <div className="head-table">
                Roll No.
              </div>
              <div className="head-table">
                View/Edit/Delete
              </div>
            </div>

            {
              students.map((student) => (

                <div className="rac223">
                  <div className="item-data">
                    {student.firstname} {student.middlename} {student.lastname}
                  </div>
                  <div className="item-data">
                    {student.class}
                  </div>
                  <div className="item-data">
                    {student.rollnumber}
                  </div>
                  <div className="item-data">
                    <button onClick={() => editStudentPopup(false, student.id, student.firstname, student.middlename, student.lastname, student.class, student.division, student.rollnumber, student.addressline1, student.addressline2, student.landmark, student.city, student.pincode)} >View</button>
                    /
                    <button onClick={() => editStudentPopup(true, student.id, student.firstname, student.middlename, student.lastname, student.class, student.division, student.rollnumber, student.addressline1, student.addressline2, student.landmark, student.city, student.pincode)} >Edit</button>
                    /
                    <button onClick={() => deleteStudentpopup(student.id)} >Delete</button>

                  </div>




                </div>
              ))
            }



          </div>

          <br />


        </div>

      </div>

      <EditPopup triger={buttonPopup} setTriger={setButtonPopup}>
        <div>
          <div className="frame183">
            <div className="fram184">


              <input className="input-from-field" value={newFirstName} onChange={(event) => { setNewFirstName(event.target.value) }} />
              <input className="input-from-field" value={newMiddleName} onChange={(event) => { setNewMiddleName(event.target.value) }} />
              <input className="input-from-field" value={newLastName} onChange={(event) => { setNewLastName(event.target.value) }} />
            </div>
            <div className="fram184">




              <input className="input-from-field" type='number' value={newClass} onChange={(event) => { setNewClass(event.target.value) }} />
              <input className="input-from-field" value={newDivision} onChange={(event) => { setNewDivision(event.target.value) }} />
              <input className="input-from-field" type='number' value={newRollNumber} onChange={(event) => { setNewRollNumber(event.target.value) }} />
            </div>
            <br />
            <div className="fram184">

              <input className="fram68" value={newAddressLine1} onChange={(event) => { setNewAddressLine1(event.target.value) }} />
              <input className="fram68" value={newAddressLine2} onChange={(event) => { setNewAddressLine2(event.target.value) }} />
            </div>
            <div className="fram184">


              <input className="input-from-field" value={newLandmark} onChange={(event) => { setNewLandmark(event.target.value) }} />
              <input className="input-from-field" value={newCity} onChange={(event) => { setNewCity(event.target.value) }} />
              <input className="input-from-field" type='number' value={newPincode} onChange={(event) => { setNewPincode(event.target.value) }} />
            </div>
            <div className="frame177">
              <div onClick={updateStudent} className="frame174">Update Value</div>
            </div>
          </div>





        </div>
      </EditPopup>

      <EditPopup triger={viewPopup} setTriger={setViewPopup}>
        <div>
          <div className="frame183">
            <div className="fram184">


              <input disabled className="input-from-field" value={newFirstName} onChange={(event) => { setNewFirstName(event.target.value) }} />
              <input disabled className="input-from-field" value={newMiddleName} onChange={(event) => { setNewMiddleName(event.target.value) }} />
              <input disabled className="input-from-field" value={newLastName} onChange={(event) => { setNewLastName(event.target.value) }} />
            </div>
            <div className="fram184">




              <input disabled className="input-from-field" value={newClass} onChange={(event) => { setNewClass(event.target.value) }} />
              <input disabled className="input-from-field" value={newDivision} onChange={(event) => { setNewDivision(event.target.value) }} />
              <input disabled className="input-from-field" value={newRollNumber} onChange={(event) => { setNewRollNumber(event.target.value) }} />
            </div>
            <br />
            <div className="fram184">

              <input disabled className="fram68" value={newAddressLine1} onChange={(event) => { setNewAddressLine1(event.target.value) }} />
              <input disabled className="fram68" value={newAddressLine2} onChange={(event) => { setNewAddressLine2(event.target.value) }} />
            </div>
            <div className="fram184">


              <input disabled className="input-from-field" value={newLandmark} onChange={(event) => { setNewLandmark(event.target.value) }} />
              <input disabled className="input-from-field" value={newCity} onChange={(event) => { setNewCity(event.target.value) }} />
              <input disabled className="input-from-field" value={newPincode} onChange={(event) => { setNewPincode(event.target.value) }} />
            </div>

          </div>





        </div>
      </EditPopup>


      <Popup triger={deletepopup} setTriger={setDeletePopup}>
        <div>
          <br /><br />
          <p>Do you realy want to delete this students information ?</p>

          <button onClick={()=>{deleteStudent(newId)}}>Delete Information</button>
          <button onClick={()=>{setDeletePopup(false)}}>Cancel</button>
        </div>
      </Popup>
    </div>
  )
}

export default ManageStudents