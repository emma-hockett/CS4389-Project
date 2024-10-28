// import { useState } from 'react'
// import userProfile from '../assets/default-avatar.png'
// import editButton from '../assets/editButton.png'
import './Profile.css'

function Profile() {
	
//   const [editing, setEditing] = useState(false)
  const user = "John Doe"
	const address = "420 idk ln."
	const SSN = "123 45 6789"
	const email = "johndoe@gmail.com"
	const phone = "123 456 7890"
	// const queryString = window.location.search;
	// const handleEditing = () => {
	// 	setEditing(true)
	// }
	// const urlParams = new URLSearchParams(queryString)
	// const perms = urlParams.get('perms')
	let viewMode = {}
	// let editMode = {}
	// if (editing){
	// 	viewMode.display = 'none';
	// } else {
	// 	editMode.display = 'none'
	// }
		

  return (
    <>
	  <div className="parent">
      		<div className="childcent">
          		{/* <img src={userProfile} alt="default profile picture" className="profileBig" /> */}
      			<h1>{user}</h1>
      		</div>
	  	<div className="childcent">
	  	<font size="5">
        		<table align="left" cellSpacing="0" cellPadding="0" border="0">
	  			<tr>
                                        <th align="right">Address: &nbsp;</th>
	  <div style={viewMode}>
                                        <td align="left">{address}&nbsp;
	  				{/* <input type="image" src={editButton} onClick={handleEditing} height="20px"/> */}
	  				</td>
	  </div>
	  				{/* <input type="text" value={address} height="20px" style={editMode}/> */}
	  			</tr>
	  			<tr>
                                        <th align="right">SSN: &nbsp;</th>
	  <div style={viewMode}>
                                        <td align="left">{SSN}&nbsp;
	  				{/* <input type="image" src={editButton}  onClick={handleEditing} height="20px"/> */}
	  				</td>
	  </div>
	  				{/* <input type="text" value={SSN} height="20px" style={editMode}/> */}
	  			</tr>
	  			<tr>
                                        <th align="right">Email:&nbsp;</th>
	  <div style={viewMode}>
                                        <td align="left">{email}&nbsp;
	  				{/* <input type="image" src={editButton} onClick={handleEditing} height="20px"/> */}
	  				</td>
	  </div>
	  				{/* <input type="text" value={email} height="20px" style={editMode}/> */}
	  			</tr>
	  			<tr>
                                        <th align="right">Phone:&nbsp;</th>
	  <div style={viewMode}>
                                        <td align="left">{phone}&nbsp;
	  				{/* <input type="image" src={editButton} height="20px"/> */}
	  				</td>
	  </div>
	  				{/* <input type="text" value={phone} height="20px" style={editMode}/> */}
	  			</tr>
	  		</table>
	 	</font> 
	  </div>
	  </div>
    </>
  )
}
export default Profile