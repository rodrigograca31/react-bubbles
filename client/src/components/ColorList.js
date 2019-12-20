import React, { useState } from "react";

import axiosWithAuth from "../helpers/axios";

const initialColor = {
	color: "",
	code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
	console.log(colors);
	const [editing, setEditing] = useState(false);
	const [adding, setAdding] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);
	const [colorToAdd, setColorToAdd] = useState(initialColor);

	const editColor = color => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = e => {
		e.preventDefault();
		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is is saved right now?

		if (colorToEdit.color === "" || colorToEdit.code.hex === "") {
			alert("FILL THE VALUES!");
			return false;
		}
		console.log(colorToEdit);
		axiosWithAuth()
			.put(`/api/colors/${colorToEdit.id}`, colorToEdit)
			.then(response => {
				console.log(response);
				updateColors(prevColors =>
					prevColors.map(prevColor => {
						if (prevColor.id === colorToEdit.id) {
							return colorToEdit;
						} else {
							return prevColor;
						}
					})
				);
			})
			.catch(response => {
				console.log(response);
			});
		setEditing(false);
		setColorToEdit(initialColor);
	};

	const saveAdd = e => {
		e.preventDefault();
		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is is saved right now?

		if (colorToAdd.color === "" || colorToAdd.code.hex === "") {
			alert("FILL THE VALUES!");
			return false;
		}
		console.log(colorToAdd);
		axiosWithAuth()
			.post(`/api/colors`, colorToAdd)
			.then(response => {
				console.log(response);
				updateColors(prevColors => [...prevColors, colorToAdd]);
			})
			.catch(response => {
				console.log(response);
			});
		setAdding(false);
		setColorToAdd(initialColor);
	};

	const deleteColor = color => {
		// make a delete request to delete this color
		axiosWithAuth()
			.delete(`/api/colors/${color.id}`)
			.then(response => {
				console.log(response);
				updateColors(prevColors =>
					prevColors.filter(prevColor => {
						if (prevColor.id !== color.id) {
							return prevColor;
						}
					})
				);
			})
			.catch(response => {
				console.log(response);
			});
		setEditing(false);
		setColorToEdit(initialColor);
	};

	return (
		<div className="colors-wrap">
			<p>
				colors{" "}
				<div
					onClick={e => setAdding(true)}
					style={{ cursor: "pointer" }}
				>
					➕
				</div>
			</p>
			<ul>
				{colors.map(color => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span
								className="delete"
								onClick={e => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>{" "}
							{color.color}
						</span>
						<div
							className="color-box"
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={e =>
								setColorToEdit({
									...colorToEdit,
									color: e.target.value
								})
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={e =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value }
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">save</button>
						<button onClick={() => setEditing(false)}>
							cancel
						</button>
					</div>
				</form>
			)}
			{/* <div className="spacer" /> */}
			{/* {JSON.stringify(adding)} */}
			{adding && (
				<form onSubmit={saveAdd}>
					<legend>add color</legend>
					<label>
						color name:
						<input
							onChange={e =>
								setColorToAdd({
									...colorToAdd,
									color: e.target.value
								})
							}
							value={colorToAdd.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={e =>
								setColorToAdd({
									...colorToAdd,
									code: { hex: e.target.value }
								})
							}
							value={colorToAdd.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">Add</button>
						<button onClick={() => setAdding(false)}>cancel</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default ColorList;
