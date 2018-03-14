(function(wnd) {
	if (wnd) {
		var config = {
			root: '/middl',
			mode: 'QA',
			chatHost: 'qa.domclick.ru',
			fileStorageUrl: 'https://qa.domclick.ru/fs/',
			useThumbnails: '',
			sentryDsn: 'https://2e88980fafa44fc992a49bc13fbf580e@sentry.domclick.ru/13'
		};
		wnd.middleMikConfiguration = config;
	}
})(window);