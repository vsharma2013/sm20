
export function	onSuccess(res, result, requestId) {		
	
	res.response.status = 200;
	res.type = 'json';
	res.body = {
		result: result,
		id: requestId
	};
};

export function	onError(res, err, requestId) {
	
	res.response.status = 500;
	res.type = 'json';
	res.body = {
		error: err,
		id: requestId
	};
};

export function	onAuthenticationFailure(res, err, requestId) {

    res.response.status = 403;
    res.type = 'json';
    res.body = {
        error: err,
        id: requestId
    };
};
	
