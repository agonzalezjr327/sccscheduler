export const ActionTypes = {
	REGISTRATION: "REGISTRATION",
	AUTH_ERROR: 'AUTH_ERROR',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	LOGIN_FAIL: 'LOGIN_FAIL',
	LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
	REGISTER_SUCCESS: 'REGISTER_SUCCESS',
	REGISTER_FAIL: 'REGISTER_FAIL',
};

export const StateTypes = {
	LOADING: "isLoading",
	EDITING: "isEditing",
	CONFIRMING: "isConfirming",
	JOINING: "isJoining",
};

export const StateActionTypes = {
	START_LOADING: "start_loading",
	END_LOADING: "end_loading",
	START_STATE: "start_state",
	END_STATE: "end_start",
	SET_STATE: "set_state",
	RESET_STATE: "reset_state",
	[StateTypes.JOINING]: {
		REGISTERED: "isRegistered",
		COMPLETED: "isRegistrationComplete"
	},
};

export const ModelTypes = {
	USER: 'person',
	CLASS: 'class'
};

/**
 * Methods available for data types
 */
export const ModelActionTypes = {
	SIGN_IN: 'signin',
	SIGN_OUT: 'signout',
	REGISTER: 'register',
	STUDENTS: 'students',
	CLASSES: 'classes',
	UPDATE_STUDENT: 'updatestudent',
	UPDATE_CLASS: 'updateclass',
	CREATE_STUDENT: 'createstudent',
	CREATE_CLASS: 'createclass',
	REMOVE_RSS: 'removerss',
	REMOVE_CLASS: 'removeclass',
	REMOVE_STUDENT: 'removestudent',
	GRADUATE_CLASS: 'graduateclass',
	ADD_STUDENT: 'addstudent',
	REMOVE_REQUIRED_CLASS: 'removerequiredclass',
	REMOVE_TRADE_CLASS: 'removetradeclass',
	[ModelTypes.USER]: {
		GET: '',
		UPDATE_USER: '',
	},

};
