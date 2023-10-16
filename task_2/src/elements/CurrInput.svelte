<script>
// @ts-nocheck

    export let label;
    export let value;
    export let onInput;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label>{label}</label>
<input type="text" bind:value on:input={e => onInput(e.target.value)} />