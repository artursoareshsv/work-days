import { Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../constants/date-format';
import { Loader } from './Loader';
import { Category } from './Category';

type Props = {
	workDays: number;
	officeDays: Date[] | undefined;
};

export function Overview({ workDays, officeDays }: Props) {
	if (!officeDays) {
		return <Loader />;
	}

	const reimbursement = workDays * 3;

	return (
		<Stack spacing={0.5}>
			<Category subtitle='Business days' text={workDays} />
			<Category subtitle='Office days' text={officeDays.map((officeDay) => format(officeDay, DATE_FORMAT))} />
			<Category subtitle='Reimbursement per home working day (tax-free)' text={`€${reimbursement},00`} />
			<Category subtitle='Telephone allowance (untaxed)' text='€ 30,00' />
			<Category
				subtitle='Travel allowance Business (tax-free)'
				text='Should be declared base on the travels (it used to be around €100,00)'
			/>
		</Stack>
	);
}
