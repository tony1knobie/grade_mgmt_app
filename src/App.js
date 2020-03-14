import React, { useState, Fragment,useEffect } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'
import axios from "axios";
const convert = require('xml-js');
 


const App = () => {


	let url = "http://192.168.1.55:8080/ReadXML/getJson"

	const sendData=()=>{
		let records ={records: {"record": users}}
		let options = {compact: true, ignoreComment: true, spaces: 4};

		let output = (convert.js2xml(records,options))
		axios.post(url, output)
	}

	async function fetchData() {
		const res = await fetch(url);
		res
		  .json()
		  .then(res=>setUsers(res.records.record))
		  .catch(err=>console.log(err));
	  }
	
	let usersData =  [{ "firstname": "Thomas", "grade": "B", "id": 0 }]
	useEffect(() => {
		if ( users.length < 2)
		fetchData();
	  });
			
	const initialFormState = { id: null, firstname: '', grade: '' }

	// Setting state
	const [ users, setUsers ] = useState(usersData)
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addUser = user => {
		user.id = users.length + 1
		setUsers([ ...users, user ])
	}

	const deleteUser = id => {
		setEditing(false)

		setUsers(users.filter(user => user.id !== id))
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, name: user.name, username: user.username })
	}

	const getAverage =()=>{
		return ((users.map(obj=>"FDCBA".indexOf(obj.grade)).reduce((a,b)=>a+b))/users.length).toFixed(2)
		}
	let avg = getAverage()

	const getHighestGrade=()=>{
		let grades = users.map(obj=>obj.grade)
		return grades.reduce((a,b)=>a>b ? b:a, grades[0])
	
	}

	const getLowestGrade=()=>{
		let grades = users.map(obj=>obj.grade)
		return grades.reduce((a,b)=>a<b ? b:a, grades[0])
	
	}

	let min_grade = getLowestGrade()

	let max_grade = getHighestGrade()

	

	return (
		<div className="container">
			<h1>Grade Management App</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit Grade</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add grade</h2>
							<AddUserForm addUser={addUser} />

						</Fragment>
					)}
				<h5>Average Grade: {avg}</h5>
				<h5>Highest Grade: {max_grade}</h5>
				<h5>Lowest Grade: {min_grade}</h5>
				<h5>Total # of Records: {users.length}</h5>

				</div>
				<div className="flex-large">
				<button onClick={sendData}>Submit Changes To Database</button>

					<h2>View grades</h2>

					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

export default App
