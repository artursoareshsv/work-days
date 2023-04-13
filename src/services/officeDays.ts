import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from './firebase';
import { getDate } from 'date-fns';

const officeDaysDoc = doc(firestore, 'officeDays', 'officeDays');

export async function save(workDays: Date[]): Promise<void> {
	await setDoc(officeDaysDoc, {
		workDays: workDays.map((date) => getDate(date)),
	});
}

export async function get(): Promise<Date[] | undefined> {
	const docs = await getDoc(officeDaysDoc);

	return docs.data()?.workDays.map((date: string) => new Date(date));
}
