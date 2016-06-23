/**
 * Overrides the Tableau WDC connection to allow hijacking for tab delimited export.
 * 
 * @author Derrick Austin <derrick.austin@interworks.com>
**/

tableauOutput = {
	fieldNames : new Array(),
	data : new Array(),
	dataCallback : function(data, lastrecord, moreData) {
		for (i = 0; i < data.length; i++) {
			
			output = [];
			for(var key in data[i]) {
				output.push(data[i][key]);
			}
			
			tableauOutput.data.push(output);
		}
		
		tableauOutput.submit();
	},
	headersCallback : function(fieldNames, fieldTypes) {
		tableauOutput.fieldNames = fieldNames;
		window._wdc.getTableData();
	},
	doNothing : function()
	{
		
	},
	appendRows : function (data) {
		for (i = 0; i < data.length; i++) {
			
			output = [];
			for(var key in data[i]) {
				output.push(data[i][key]);
			}
			
			tableauOutput.data.push(output);
		}
		tableauOutput.submit();
	},
	schemaCallback : function(schema) {
		for (i = 0; i < schema[0]['columns'].length; i++) {
			tableauOutput.fieldNames.push(schema[0]['columns'][i]['alias']);
		}
		
		_wdc.getData(tableauOutput, tableauOutput.doNothing);
	},
	submit : function() {
		var iframe = document.createElement('iframe');
		iframe.style.display = "none";
		document.body.appendChild(iframe);
		var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
		
		var form = document.createElement('form');
		form.action = '/text_output.php';
		form.method = 'POST';
		
		var input = document.createElement('input');
		input.type = 'hidden';
		input.name = 'headers';
		input.value = JSON.stringify(tableauOutput.fieldNames);
		form.appendChild(input);
		
		var input = document.createElement('input');
		input.type = 'hidden';
		input.name = 'data';
		input.value = JSON.stringify(tableauOutput.data);
		form.appendChild(input);
		
		var input = document.createElement('input');
		input.type = 'hidden';
		input.name = 'name';
		input.value = tableau.connectionName;
		form.appendChild(input);
		
		(iframeDoc.body || iframeDoc).appendChild(form);
		form.submit();
	}
};


if (tableau.versionNumber == '1.1.1' && typeof tableauVersionBootstrap === 'undefined') {
	tableau.submit = function () {
		tableau.dataCallback    = tableauOutput.dataCallback;
		tableau.headersCallback = tableauOutput.headersCallback;
		tableau.initCallback    = tableauOutput.doNothing;
		
		window._wdc.init();
		window._wdc.getColumnHeaders();
	}
} else if (tableau.versionNumber == '2.0.0' && typeof tableauVersionBootstrap === 'undefined') {
	tableau.submit = function () {
		_tableau._tableDataCallback = tableauOutput.tableDataCallback;
		_tableau._schemaCallback    = tableauOutput.schemaCallback;
		_wdc.getSchema(tableauOutput.schemaCallback);
	}
}