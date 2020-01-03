<script>
    import {onMount} from 'svelte';
    import {nextStep, currentStep} from './stores/currentStep';
    import {addAnswer} from './stores/answers';

    export let data = [];
    export let total = 0;

    let _selected = null;
    let _lastSelected = null;
    let _variants = [];
    let _current = null;
    let _show = true;

    onMount(() => {
        _show = true;
    });

    const unsubscribe = currentStep.subscribe(value => {
        document.body.scrollIntoView({
            behavior: 'smooth',
        });

        const indexes = [value];
        while(indexes.length !== 4) {
            const index = Math.floor(Math.random() * data.length);
            if (!indexes.includes(index)) {
                indexes.push(index);
            }
        }

        _variants = indexes.map(el => data[el]).sort(() => Math.random() - 0.5);
        _current = data[value];
        _selected = null;

        _show = !value;
    });

    function handleSelect(index) {
        if (_selected !== null) {
            if (_current.id === index) {
                addAnswer(index);
            }
            nextStep();
        } else {
            _selected = index;
        }
    }

    function onOutroEnd(index, total) {
        if (index === total - 1) {
            _show = true;
        }
    }

    function animate(node, i) {
		return {
            duration: 300 - i * 40,
            delay: i * 70,
			css: (t, u) => {
                const opacity = getComputedStyle(node).opacity;
                const value = (opacity ? u : t) * 140;
                const translates = [
                    `translate(${value}px, ${value}px)`,
                    `translate(-${value}px, ${value}px)`,
                    `translate(${value}px, -${value}px)`,
                    `translate(-${value}px, -${value}px)`,
                ];
				return `
					transform: ${translates[i]};
					opacity: ${t};`
			}
		};
	}
</script>

<style>
    main {
        box-sizing: border-box;
        background: #052D2D;
    }

    .steps {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        overflow: hidden;
        width: 100%;
    }

    .step {
        position: relative;
        width: 50%;
        cursor: pointer;
        user-select: none;
        transition: all .3s ease;
    }

    @media (max-width: 600px) {
        .step {
            width: 100%;
        }
    }

    .step:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: .1;
        transition: opacity .3s ease;
    }

    @media (hover: hover) {
        .step:hover:before {
            opacity: .2;
        }

        .step:hover .step__select {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }

    .step.active {
        transform: none;
    }

    .step.inactive {
        pointer-events: none
    }

    .step.active .step__select {
        opacity: 0;
        transform: translate(-50%, -50px);
    }

    .step.active .step__selected {
        opacity: 1;
        transform: translate(-50%, -50%);
    }

    .step.active .step__next {
        opacity: 1;
        transform: none;
    }

    .step.active:before {
        opacity: .5
    }

    .step__number {
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 1;
        font-weight: bold;
        font-size: 22px;
        line-height: 1;
        color: #fff;
        text-shadow: 1px 1px 0 rgba(0, 0, 0, .6);
    }

    .step__image {
        width: 100%;
        height: 100%;
        vertical-align: top;
        object-fit: cover;
    }

    .step__select,
    .step__selected {
        position: absolute;
        top: 50%;
        left: 50%;
        color: #fff;
        font: bold 30px/1 Merriweather, Georgia, serif;
        letter-spacing: 1px;
        transform: translate(-50%, 20px);
        transition: all .3s ease;
        opacity: 0;
    }

    .step__next {
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
        color: #fff;
        font-size: 16px;
        text-align: center;
        text-shadow: 1px 1px 0 rgba(0, 0, 0, .6);
        transition: all .3s ease .1s;
        transform: translateY(7px);
        opacity: 0;
    }

    .question {
        width: 100%;
        color: #fff;
        box-sizing: border-box;
    }

    .question__content {
        padding: 24px;
    }

    .question__title {
        font: 32px/1.2 Merriweather, Georgia, serif;
    }

    @media (max-width: 380px) {
        .question__title {
            font-size: 24px;
        }
    }

    .question__text {
        max-width: 600px;
        padding-top: 12px;
        font-size: 16px;
        opacity: .9;
    }

    .question__counter {
        color: rgba(255, 255, 255, .7);
        font-size: 16px;
        letter-spacing: .4px;
        background: #0b1f1f;
    }

    .question__counter-inner {
        padding: 10px 24px;
    }
</style>

{#if $currentStep < total}
<main>
    <div class="question">
        <div class="question__counter">
            <div class="container">
                <div class="question__counter-inner">
                    Вопрос {$currentStep + 1}/{total}
                </div>
            </div>
        </div>
        <div class="container">
            <div class="question__content">
                <h1 class="question__title">{_current.title}</h1>
                <p class="question__text">{_current.text}</p>
            </div>
        </div>
    </div>

    {#if _show}
        <div class="container">
            <div class="steps">
                {#each _variants as item, i}
                    <div
                        in:animate="{i}"
                        out:animate="{i}"
                        on:outroend="{() => onOutroEnd(i, _variants.length)}"
                        class="step" 
                        class:active="{_selected === item.id}"
                        class:inactive="{_selected !== null && _selected !== item.id}"
                        on:click={() => handleSelect(item.id)}>
                        <div class="step__number">{i + 1}</div>
                        <div class="step__select">Выбрать</div>
                        <div class="step__selected">{_current.id === item.id ? 'Правильно' : 'Неверно'}</div>
                        <div class="step__next">Кликни еще раз, чтобы продолжить</div>
                        {#if item.image}
                            <img class="step__image" src={item.image} alt=""/>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</main>
{/if}