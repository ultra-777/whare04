import ActionTypes from './types';

export function noop() {
	return {
		type: ActionTypes.NOOP
	}
}

export default {
	noop
}
