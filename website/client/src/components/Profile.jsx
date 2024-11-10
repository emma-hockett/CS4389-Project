// import { useState } from 'react'
// import userProfile from '../assets/default-avatar.png'
// import editButton from '../assets/editButton.png'
import './Profile.css'

const Profile = async () => {
	function readCookie(name) {
                var nameEQ = name + "=";
                var cookie = document.cookie.split(';');
                for(var i = 0; i < cookie.length; i++){
                        var c = cookie[i];
                        while (c.charAt(0) == ' ') c = c.substring(1,c.length);
                        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null
        }
	try{

		const cookie = readCookie('cubeBusterSession');
		const response = await axios.post('http://localhost:3000/profile', {cookie})
		const address = response.address


		} catch (e) {
			console.log(error)
		}
		

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
