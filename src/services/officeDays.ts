import addWeeks from 'date-fns/addWeeks';
import format from 'date-fns/format';
import isThisMonth from 'date-fns/isThisMonth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from './firebase';
import startOfMonth from 'date-fns/startOfMonth';
import setDay from 'date-fns/setDay';
import getDay from 'date-fns/getDay';

const officeDaysDoc = doc(firestore, 'officeDays', 'officeDays');

export async function getOfficeDays(): Promise<Date[] | undefined> {
	const officeDays = await retrieveDates();

	await save(officeDays);

	const firstThursday = getFirstThursday();
	officeDays.unshift(firstThursday);

	return officeDays;
}

async function retrieveDates(): Promise<Date[]> {
	const docs = await getDoc(officeDaysDoc);
	const officeDays: Date[] = docs.data()?.officeDays.map((date: string) => new Date(date));

	if (officeDays.every((date) => isThisMonth(date))) {
		return officeDays;
	}

	return generateOfficeDays(officeDays[officeDays.length - 1]);
}

function generateOfficeDays(lastEntry: Date): Date[] {
	const officeDays = [];
	let keepLooping = true;

	while (keepLooping) {
		const lastOfficeDay = officeDays[officeDays.length - 1] ?? lastEntry;
		const nextOfficeDay = addWeeks(lastOfficeDay, 2);

		if (!isThisMonth(nextOfficeDay)) {
			keepLooping = false;
			break;
		}

		officeDays.push(nextOfficeDay);
	}

	return officeDays;
}

async function save(officeDays: Date[]): Promise<void> {
	await setDoc(officeDaysDoc, {
		officeDays: officeDays.map((date) => format(date, 'yyyy-MM-dd')),
	});
}

function getFirstThursday(): Date {
	const thursday = 4;
	const start = startOfMonth(new Date());

	return setDay(start, thursday, { weekStartsOn: getDay(start) });
}
