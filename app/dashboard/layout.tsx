const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col gap-y-4'>
			<nav className='bg-black text-white'>
				This is the dashboard layout. You can put a navbar here.
			</nav>
			<div>{children}</div>
		</div>
	);
};
export default DashboardLayout;
