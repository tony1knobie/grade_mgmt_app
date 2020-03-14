import React, { useState } from 'react'

const AddUserForm = props => {
	const initialFormState = { id: null, firstname: '', grade: '' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!user.grade || !user.firstname) return

				props.addUser(user)
				setUser(initialFormState)
			}}
		>
			<label>Name</label>
			<input type="text" name="firstname" value={user.firstname} onChange={handleInputChange} />
			<label>Grade</label>
			<input type="text" pattern="[A,B,C,D,F]{1}" name="grade" value={user.grade} onChange={handleInputChange} />

			<button>Add new grade</button>
		</form>
	)
}

export default AddUserForm
