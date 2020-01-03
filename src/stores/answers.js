import {writable} from 'svelte/store';
import {lkSet, lkGet, lkRemove} from './../utils/utils';

const initial = lkGet('bg1_answers', []);

export const answers = writable(initial);

export const addAnswer = (answer) => {
	answers.update(n => {
		const answers = n.concat(answer);
		lkSet('bg1_answers', answers);
		return answers;
	});
};

export const resetAnswers = () => {
	lkRemove('bg1_answers');
	answers.set([]);
}
