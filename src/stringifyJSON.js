var stringifyJSON = function(value) {

	var stringify = function(value) {
		//Base cases
		if (typeof(value) === "string") {
			var tempValue = '';
			tempValue += escapeString(value);
			return '"' + tempValue + '"';
		} else if (isArray(value)) {
			var returnString = '';
			for (var i = 0; i < value.length; i++) {
				returnString += stringify(value[i]);
				if (i < value.length - 1) {
					returnString += ",";
				}
			}
			return '[' + returnString + ']';
		} else if (isObject(value)) {
			var returnString = '';
				var objProperties = [];
				for (key in value) {
					objProperties.push(key);
				}
				for (var i = 0; i < objProperties.length; i++) {
					if (!isFunction(value[objProperties[i]]) && !isUndefined(value[objProperties[i]])) {
						returnString += '"' + objProperties[i] + '":';
						if (value[objProperties[i]] === "") {
							returnString += '""';
						} else {
							returnString += stringify(value[objProperties[i]]);
						}
						if (i < objProperties.length - 1) {
						returnString += ",";
						}
					}
				}
			return '{' + returnString + '}';
		}
		return value + '';
	};

	var escapeString = function(string) {
		if ((string.indexOf('"') !== -1 ) || (string.indexOf('\\') !== -1 )) {
			string = string.split('\\').join('\\\\');
			string = string.split('"').join('\\"');
		}
		return string;
	};
	var isArray = function(value) {
		return Object.prototype.toString.call(value) === '[object Array]';
	};
	var isObject = function(value) {
		return Object.prototype.toString.call(value) === '[object Object]';
	};
	var isFunction = function(value) {
		return Object.prototype.toString.call(value) === '[object Function]';
	};
	var isUndefined = function(value) {
		return Object.prototype.toString.call(value) === '[object Undefined]';
	}

	return stringify(value);
};
