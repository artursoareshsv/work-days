import { Typography } from '@mui/material';

type Props = {
	subtitle: string;
	text: number | string | string[];
};

export function Category({ subtitle, text }: Props) {
	return (
		<>
			<Typography variant='subtitle1'>
				<strong>{subtitle}:</strong>
			</Typography>

			{Array.isArray(text) ? text.map((value) => <Typography key={value}>- {value}</Typography>) : <Typography>- {text}</Typography>}
		</>
	);
}
