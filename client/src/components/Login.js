import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

const Login = () => {
	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route

	const [form, setForm] = useState({
		username: "",
		password: ""
	});

	let history = useHistory();

	const handleChange = e => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const submit = e => {
		e.preventDefault();

		axios
			.post(`http://localhost:5000/api/login`, {
				...form
			})
			.then(response => {
				localStorage.setItem("token", response.data.payload);
				history.push("/bubblepage");
				console.log(response);
			})
			.catch(response => {
				console.log(response);
			});
	};

	return (
		<>
			<h1>Welcome to the Bubble App!</h1>
			<br />
			<br />
			<h2>Login</h2>
			<form action="" onSubmit={submit}>
				<TextField
					label="Username"
					name="username"
					value={form.username}
					onChange={handleChange}
					variant="outlined"
				/>
				<br />
				<br />
				<TextField
					label="Password"
					name="password"
					value={form.password}
					onChange={handleChange}
					variant="outlined"
					type="password"
				/>
				<br />
				<br />
				<Button variant="contained" color="secondary" onClick={submit}>
					Submit
				</Button>
			</form>
		</>
	);
};

export default Login;
