import { Outlet, createBrowserRouter } from 'react-router-dom';
import AllModals from '@Components/Common/Modal/AllModals';
import ReactPortal from '@Components/Common/ReactPortal/ReactPortal';
import BackgroundColorStyled from '@Layouts/BackgroundColor/BackgroundColor.styled';
import { FamilyRoom, ForgotPassword, Home, Login, Register, ResetPassword } from '@Pages/index';

export const router = createBrowserRouter([
	{
		element: (
			<>
				<ReactPortal nodeId='modals'>
					<AllModals />
				</ReactPortal>
				<BackgroundColorStyled>
					<Outlet />
				</BackgroundColorStyled>
			</>
		),
		children: [
			{ path: '/', element: <Login /> },
			{ path: 'home', element: <Home /> },
			{ path: 'forgotPassword', element: <ForgotPassword /> },
			{ path: 'resetPassword', element: <ResetPassword /> },
			{ path: 'register', element: <Register /> },
			{ path: 'home/:roomId', element: <FamilyRoom /> },
		],
	},
]);
