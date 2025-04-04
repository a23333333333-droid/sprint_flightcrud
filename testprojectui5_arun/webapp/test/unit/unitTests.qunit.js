/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"testprojectui5arun/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
