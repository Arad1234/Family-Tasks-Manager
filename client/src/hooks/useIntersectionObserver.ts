import { getRoomsSocket } from '@Redux/actions/rooms-actions';
import { useAppDispatch } from '@Redux/hooks';
import { useCallback } from 'react';

const useIntersectionObserver = <T extends number>(payload: T) => {
	const dispatch = useAppDispatch();

	const callBackRef = useCallback(
		(node: HTMLDivElement | null) => {
			const observer = new IntersectionObserver(
				(entries) => {
					const [firstEntry] = entries;
					if (firstEntry.isIntersecting) {
						dispatch(getRoomsSocket({ page: payload, isIntersecting: true }));
					}
				},
				{ threshold: 0.1 }
			);

			if (node !== null) {
				observer.observe(node);
			}
		},
		[payload]
	);

	return callBackRef;
};

export default useIntersectionObserver;
