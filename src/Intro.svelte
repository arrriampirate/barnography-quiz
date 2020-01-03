
<script>
    import {nextStep} from './stores/currentStep';

    export let image = '';
    export let title = '';
    export let description = '';
</script>

<style>
    button {
        margin: 25px 0 0;
    }
</style>

<main class="bg" style={`background-image: url(${image})`}>
    <div class="content-box">
        <h1 class="content-box__title">{title}</h1>
        <h2 class="content-box__subtitle">#1: Неповторимые жилые комплексы Барнаула</h2>
        <p class="content-box__text">{description}</p>
        <button on:click={nextStep}>Начать тест</button>
    </div>
</main>