var stringifyJSON = function(value) {

	var stringify = function(value) {
		//Base cases
		if (typeof(value) === "string") {
			var tempValue = '"';
			if ((value.indexOf('"') !== -1 ) || (value.indexOf('\\') !== -1 )) {
				tempValue += escapeQuotes(value);
			} else {
				tempValue += value;
			}
			tempValue += '"';
			return tempValue;
		} else if (typeof(value) === "number") {
			return value.toString();
		} else if (typeof(value) === "boolean") {
				return value.toString();
		} else if (Object.prototype.toString.call(value) === '[object Array]') {
			var returnString = "[";
			for (var i = 0; i < value.length; i++) {
				returnString += stringify(value[i]);  // add recursion here for array elements of type object
				if (i < value.length - 1) {						// add comma
					returnString += ",";
				}
			}
			returnString += "]";
			return returnString;
		} else if (Object.prototype.toString.call(value) === '[object Object]') {
			// debugger;
			var objProperties = [];
			var returnString = "{";
			// objProperties = Object.getOwnPropertyNames(value);
			for (key in value) {
				objProperties.push(key);
			}
			for (var i = 0; i < objProperties.length; i++) {
				returnString += '"' + objProperties[i] + '":';
				if (value[objProperties[i]] === "") {
					returnString += '""';
				} else {
					returnString += stringify(value[objProperties[i]]);
				}
				if (i < objProperties.length - 1) {			// add comma
				returnString += ",";
				}
			}
			returnString += "}";
			return returnString;
		}
		return value;
	};

	var escapeQuotes = function(string) {
		string = string.split('\\').join('\\\\');
		string = string.split('"').join('\\"');
		return string;
	};
	return stringify(value);
};
