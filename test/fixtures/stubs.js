'use strict';

var AWS = require('aws-sdk');
var sinon = require('sinon');

module.exports = {
	ec2: {
		describeInstances: function () {
			// do nothing
		},
		stopInstances: function () {
			// do nothing
		}
	}
};

sinon.stub(AWS, 'EC2').returns(module.exports.ec2);
