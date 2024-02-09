const RegisterPage = () => {
	const handleSubmit = (data: any) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input />
			<input />
			<input type='submit' />
		</form>
	);
};
export default RegisterPage;
