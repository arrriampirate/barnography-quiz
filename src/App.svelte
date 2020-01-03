<script>
	import Intro from './Intro.svelte';
	import Result from './Result.svelte';
	import Step from './Step.svelte';
	
	import {currentStep} from './stores/currentStep';
	import {answers} from './stores/answers';

	export let config = null;
</script>

{#if $currentStep === -1}
	<Intro {...config.intro}/>
{:else if $currentStep < config.data.length}
	<Step data={config.data} total={config.data.length}/>
{:else}
	<Result answers={$answers} data={config.data} {...config.result}/>
{/if}
