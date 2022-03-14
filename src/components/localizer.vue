<template>

	<div class="localizer">
		<span v-for="locale in $i18n.locales()" :key="'i81n-' + locale"
			@click="changeLocale(locale)" :class="$i18n.locale() !== locale ? '' : 'current'">
			{{icons[locale]}}
		</span>
	</div>
</template>

<script>
	import { icons, setLang } from '@/i18n'
	export default {
		name: 'Localizer',
	  data() {
	    return {
	      icons: icons
	    }
	  },		
		methods: {
			changeLocale(locale) {
				this.$i18n.set(locale)
				setLang(locale)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.localizer {
	    font-size: 12px;
	    cursor: pointer;
	    display: inline-flex;
	    flex: 0 0 auto;
	    align-items: center;
	    color: inherit;
	    justify-content: inherit;
	    line-height: normal;

		span + span {
			margin-left: 12px;
		}

	  span {
		opacity: 0.6;	  	
	    &:last-child {
	      margin-right: 32px;
	    }
	  }
	  span.current {
	  	cursor: auto;
	  	opacity: 1;
	  }
	}
</style>