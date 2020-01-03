<script>
    import likely from 'ilyabirman-likely';
    import {onMount} from 'svelte';
    import {resetStep} from './stores/currentStep';
    import {resetAnswers} from './stores/answers';
    import {pluralise} from './utils/utils';

    export let data = [];
    export let answers = [];
    export let image = '';
    export let results = [];

    const percent = 100 / data.length * answers.length;
    let description = '';

    for (let i = 0; i < results.length; i++) {
        const percentStep = Math.ceil(100 / results.length * (i + 1));
        if (percent <= percentStep) {
            description = results[i];
            break;
        }
    }

    onMount(() => {
        likely.initiate();
    });

    function handleRestart() {
        resetAnswers();
        resetStep();
    }
</script>

<style>
    .share {
        padding-top: 30px;
    }

    .share__text {
        font-size: 16px;
    }

    button {
        margin: 25px 0 0;
    }

    .likely {
        padding-top: 12px;
    }
</style>

<main class="bg" style={`background-image: url(${image})`}>
    <div class="content-box">
        <h1 class="content-box__title">Результаты</h1>
        <h2 class="content-box__text">
            Вы ответили правильно на {answers.length} {pluralise(answers.length, ['вопрос', 'вопроса', 'вопросов'])} из {data.length}
        </h2>
        <p class="content-box__text">{description}</p>

        <button on:click={handleRestart}>Пройти еще раз</button>

        <div class="share">
            <div class="share__text">Покажи всем своим друзьям, какой ты молодец!</div>
            <div class="likely">
                <div class="vkontakte" data-description="Check this out">Поделиться</div>
                <div class="telegram">Поделиться</div>
                <div class="twitter">Твитнуть</div>
                <div class="facebook">Отправить</div>
            </div>
        </div>
    </div>
</main>