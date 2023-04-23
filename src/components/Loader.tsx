import { Skeleton, Stack } from '@mui/material';

export function Loader() {
	return (
		<Stack spacing={0.9} sx={{ width: 150 }}>
			<Skeleton />
			<Skeleton />
			<Skeleton />
			<Skeleton />
			<Skeleton />
			<Skeleton />
			<Skeleton />
		</Stack>
	);
}
