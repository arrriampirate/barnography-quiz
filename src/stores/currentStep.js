import {writable} from 'svelte/store';
import {lkSet, lkGet, lkRemove} from './../utils/utils';

const initial = lkGet('bg1_step', -1);

export const currentStep = writable(initial);

export const nextStep = () => {
	currentStep.update(n => {
		const step = n + 1;
		lkSet('bg1_step', step);
		return step;
	});
};

export const resetStep = () => {
	lkRemove('bg1_step');
	currentStep.set(-1);
}
