import './App.css';
import { useEffect, useState } from 'react';
import lupe from './icons/loupe.png'
import defaultUserProfilePic from './icons/user.png'

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [input, setInput] = useState("")
  useEffect(() => {
    fetch("https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json")
    .then(res => res.json())
    .then((data, usersInfo) => usersInfo = data.map(e => [e.last_name.toLowerCase(), e.avatar, e.email, e.first_name.toLowerCase(), e.gender, e.id]))
    .then((data) => setContacts(data.sort()))
  }, [])

  function checkCheckboxFormOutside(event){
    const id = event.target.id

    const checkbox = document.getElementById("checkboxFor" + id)
    if(checkbox.checked === true){
      checkbox.checked = false;
      setSelectedContacts(selectedContacts.filter(e => e !== id))
    } else{
      checkbox.checked = true
      setSelectedContacts([...selectedContacts, id])
    }
  }

  useEffect(() => {
    console.log("IDs of slected contacts: " + [...new Set(selectedContacts)])
  }, [selectedContacts])

  function handleChange(event){
    const DivId = event.target.id
    const checkbox = document.getElementById(DivId)
    const contactID = checkbox.id.toString().replace("checkboxFor", "")
    
    if(checkbox.checked === true){
      setSelectedContacts([...new Set(selectedContacts), contactID])
    } else{
      setSelectedContacts(selectedContacts.filter(e => e !== contactID))
    }
    
  }

  function handleSearchChange(event){
    setInput(event.target.value.toLowerCase())
  }

  function handleSearchInput(event){
    event.preventDefault();
    setFilteredContacts(contacts.filter(e => e[3].includes(input) || e[0].includes(input)))
  }

  return (
    <div className="App">
      <header className="AppHeader">
        <p className="AppHeader__P">Contacts</p>
      </header>
      <section className="mainDiv"> 
        <form onSubmit={handleSearchInput} className="mainDiv__form">
          <div onClick={handleSearchInput} className="form__lupeDiv">
            <img alt="lupe_icon" className="lupeDiv__luppeIcon" src={lupe} />
          </div>
          <input onChange={handleSearchChange} placeholder="Search for contacts..." type="search" className="form__searchInp" />
        </form>
        <form className="mainDiv__contactsListForm">
          {filteredContacts.length < 1 ? contacts.map(e => {return(
          <div key={e[5]} className="contactsListForm__contactsOuterDiv">
            <div onClick={checkCheckboxFormOutside} id={e[5]} className="contactsListForm__contactsInnerDiv">
              <div className="contactsInnerDiv__profilePicDiv">
                <img alt="profile_pic" className="profile__pic" src={e[1] !== null ? e[1]: defaultUserProfilePic}></img>
              </div>
              <div className="contactsInnerDiv__userInfo">
                <div className="userInfo__firstAndLastName">
                  <p className="firstAndLastName__name">{e[3]}</p>
                  <p className="firstAndLastName__lastName">{e[0]}</p>
                </div>
                <p className="userInfo__mail">{e[2]}</p>
              </div>  
            </div>
              <div className="contactsInnerDiv__chechboxHolder">
                <input value={e[5]} onChange={handleChange} id={"checkboxFor" + e[5]} type="checkbox" className="chechboxHolder__checkbox" />
              </div>
          </div>
          )}) : filteredContacts.map(e => {return(
            <div key={e[5]} className="contactsListForm__contactsOuterDiv">
            <div onClick={checkCheckboxFormOutside} id={e[5]} className="contactsListForm__contactsInnerDiv">
              <div className="contactsInnerDiv__profilePicDiv">
                <img alt="profile_pic" className="profile__pic" src={e[1] !== null ? e[1]: defaultUserProfilePic}></img>
              </div>
              <div className="contactsInnerDiv__userInfo">
                <div className="userInfo__firstAndLastName">
                  <p className="firstAndLastName__name">{e[3]}</p>
                  <p className="firstAndLastName__lastName">{e[0]}</p>
                </div>
                <p className="userInfo__mail">{e[2]}</p>
              </div>  
            </div>
              <div className="contactsInnerDiv__chechboxHolder">
                <input value={e[5]} onChange={handleChange} id={"checkboxFor" + e[5]} type="checkbox" className="chechboxHolder__checkbox" />
              </div>
          </div>
          )})}
        </form>
      </section>
    </div>
  );
}

export default App;
