import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailAndPassword } from "../../actions/auth";

export const RegisterScreen = () => {
	const dispatch = useDispatch();
	const { msgError } = useSelector((state) => state.ui);

	const [fieldValues, handleInputChange, reset] = useForm({
		name: "Jose Agustin",
		email: "jose@gmail.com",
		password: "123356",
		password2: "123456",
	});

	const { name, email, password, password2 } = fieldValues;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isFormValid()) {
			dispatch(startRegisterWithEmailAndPassword(email, password, name));
		}

		reset();
	};

	const isFormValid = () => {
		if (name.trim().length === 0) {
			dispatch(setError("Name is required"));
			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(setError("Email is not valid"));
			return false;
		} else if (password !== password2 || password.length < 5) {
			dispatch(setError("Password should be at least 6 characters and match"));
			return false;
		}

		dispatch(removeError());
		return true;
	};

	return (
		<>
			<h3 className="auth__title">Register</h3>

			{msgError && <div className="auth__alert-error">{msgError}</div>}

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Name"
					name="name"
					className="auth__input"
					autoComplete="off"
					value={name}
					onChange={handleInputChange}
				/>

				<input
					type="text"
					placeholder="Email"
					name="email"
					className="auth__input"
					autoComplete="off"
					value={email}
					onChange={handleInputChange}
				/>

				<input
					type="password"
					placeholder="Password"
					name="password"
					className="auth__input"
					value={password}
					onChange={handleInputChange}
				/>

				<input
					type="password"
					placeholder="Confirm password"
					name="password2"
					className="auth__input"
					value={password2}
					onChange={handleInputChange}
				/>

				<button type="submit" className="btn btn-primary btn-block mb-5">
					Register
				</button>

				<Link to="/auth/login" className="link">
					Already registered?
				</Link>
			</form>
		</>
	);
};
