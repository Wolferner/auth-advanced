const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className=''>
			<nav className='bg-red-500 text-white'>
				This is the auth layout. You can put a navbar here.
			</nav>
			<div>{children}</div>
		</div>
	);
};
