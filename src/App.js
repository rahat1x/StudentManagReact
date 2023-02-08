import './App.css';
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Popup from "./components/Popup";
import SideBar from "./components/Sidebar";
import { Route, Routes, BrowserRouter } from 'react-router-dom/dist';
import AddStudent from "./pages/AddStudents";
import ManageStudents from "./pages/ManageStudents";
import LogOut from "./pages/LogOut";

function App() {
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
    <div className="App">


      <div className="topRow">

        <div className="App-log">LOGO</div>
        <div className="user-email">
          <div className="person-icon">o(</div>
          <div className="email">username@resoluteai.in</div>
        </div>
      </div>
      <div className="container-all">
        <BrowserRouter>
          <SideBar>
            <Routes>
              <Route path='/' element={<AddStudent />}></Route>
              <Route path='/ManageStudents' element={<ManageStudents />}></Route>
              <Route path='/Logout' element={<LogOut />}></Route>
            </Routes>
          </SideBar>
        </BrowserRouter>


      </div>
      

      


    </div>

  );
}

export default App;
