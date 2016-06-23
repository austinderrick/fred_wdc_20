/**
 * A system to pull Fred Data into a WDC Tableau Connector.
 */

var presets = [
	{"group":"income","values":[
		{"id":"gdpc96","title":"Real Gross Domestic Product, 3 Decimal"},{"id":"pcecc96","title":"Real Personal Consumption Expenditures"},{"id":"gpdic96","title":"Real Gross Private Domestic Investment, 3 decimal"},{"id":"PNFIC96","title":"Real Private Nonresidential Fixed Investment"},{"id":"prfic96","title":"Real Private Residential Fixed Investment"},{"id":"GCEC96","title":"Real Government Consumption Expenditures and Gross Investment"},{"id":"NETEXC96","title":"Real Net Exports of Goods and Services, 3 Decimal"},{"id":"EXPGSC96","title":"Real Exports of Goods and Services, 3 Decimal"},{"id":"IMPGSC96","title":"Real Imports of Goods and Services, 3 Decimal"},{"id":"GDPPOT","title":"Real Potential Gross Domestic Product"},{"id":"w875rx1","title":"Real personal income excluding current transfer receipts"},{"id":"pcec96","title":"Real Personal Consumption Expenditures"},{"id":"pcedgc96","title":"Real Personal Consumption Expenditures: Durable Goods"},{"id":"pcendc96","title":"Real Personal Consumption Expenditures: Nondurable Goods"},{"id":"pcesc96","title":"Real Personal Consumption Expenditures: Services"},{"id":"PSAVERT","title":"Personal Saving Rate"},{"id":"FYFR","title":"Federal Receipts"},{"id":"FYONET","title":"Federal Net Outlays"},{"id":"FYFSD","title":"Federal Surplus or Deficit [-]"},{"id":"GFDEBTN","title":"Federal Debt: Total Public Debt"}
	]},
	{"group":"labor","values":[
		{"id":"payems","title":"All Employees: Total Nonfarm Payrolls"},{"id":"USPRIV","title":"All Employees: Total Private Industries"},{"id":"USGOOD","title":"All Employees: Goods-Producing Industries"},{"id":"CES0800000001","title":"All Employees: Private Service-Providing"},{"id":"USGOVT","title":"All Employees: Government"},{"id":"unrate","title":"Civilian Unemployment Rate"},{"id":"ICSA","title":"Initial Claims"},{"id":"UEMPMEAN","title":"Average (Mean) Duration of Unemployment"},{"id":"UEMPMEAN","title":"Average (Mean) Duration of Unemployment"},{"id":"JTSJOL","title":"Job Openings: Total Nonfarm"},{"id":"JTSHIL","title":"Hires: Total Nonfarm"},{"id":"JTSTSL","title":"Total Separations: Total Nonfarm"},{"id":"JTSQUL","title":"Quits: Total Nonfarm"},{"id":"JTSLDL","title":"Layoffs and Discharges: Total Nonfarm"},{"id":"AWHMAN","title":"Average Weekly Hours of Production and Nonsupervisory Employees: Manufacturing"},{"id":"AHETPI","title":"Average Hourly Earnings of Production and Nonsupervisory Employees: Total Private"},{"id":"OPHNFB","title":"Nonfarm Business Sector: Real Output Per Hour of All Persons"},{"id":"POP","title":"Total Population: All Ages including Armed Forces Overseas"},{"id":"CLF16OV","title":"Civilian Labor Force"},{"id":"civpart","title":"Civilian Labor Force Participation Rate"}
	]},
	{"group":"business","values":[
		{"id":"INDPRO","title":"Industrial Production Index"},{"id":"TCU","title":"Capacity Utilization: Total Industry"},{"id":"BUSINV","title":"Total Business Inventories"},{"id":"NAPM","title":"ISM Manufacturing: PMI Composite Index\u00a9"},{"id":"RRSFS","title":"Real Retail and Food Services Sales"},{"id":"ALTSALES","title":"Light Weight Vehicle Sales: Autos and Light Trucks"},{"id":"NEWORDER","title":"Manufacturers' New Orders: Nondefense Capital Goods Excluding Aircraft"},{"id":"DGORDER","title":"Manufacturers' New Orders: Durable Goods"},{"id":"BUSLOANS","title":"Commercial and Industrial Loans, All Commercial Banks"},{"id":"TOTALSL","title":"Total Consumer Credit Owned and Securitized, Outstanding"},{"id":"CP","title":"Corporate Profits After Tax (without IVA and CCAdj)"},{"id":"HOUST","title":"Housing Starts: Total: New Privately Owned Housing Units Started"},{"id":"PERMIT","title":"New Private Housing Units Authorized by Building Permits"},{"id":"UNDCONTSA","title":"New Privately-Owned Housing Units Under Construction: Total"}]
	},
	{"group":"prices","values":[
		{"id":"CPIAUCSL","title":"Consumer Price Index for All Urban Consumers: All Items"},{"id":"CPILFESL","title":"Consumer Price Index for All Urban Consumers: All Items Less Food and Energy"},{"id":"CPIUFDSL","title":"Consumer Price Index for All Urban Consumers: Food"},{"id":"CPIENGSL","title":"Consumer Price Index for All Urban Consumers: Energy"},{"id":"PCEPI","title":"Personal Consumption Expenditures: Chain-type Price Index"},{"id":"PCEPILFE","title":"Personal Consumption Expenditures Excluding Food and Energy (Chain-Type Price Index)"},{"id":"GDPDEF","title":"Gross Domestic Product: Implicit Price Deflator"},{"id":"PPIFGS","title":"Producer Price Index by Commodity for Finished Goods (DISCONTINUED)"},{"id":"PPILFE","title":"Producer Price Index by Commodity for Finished Goods Less Food and Energy (DISCONTINUED)"},{"id":"PPIITM","title":"Producer Price Index by Commodity Intermediate Materials: Supplies and Components (DISCONTINUED)"},{"id":"PPICRM","title":"Producer Price Index by Commodity for Crude Materials for Further Processing (DISCONTINUED)"},{"id":"CASTHPI","title":"All-Transactions House Price Index for California"},{"id":"SPCS20RSA","title":"S&P\/Case-Shiller 20-City Composite Home Price Index\u00a9"},{"id":"DCOILWTICO","title":"Crude Oil Prices: West Texas Intermediate (WTI) - Cushing, Oklahoma"},{"id":"GASREGW","title":"US Regular All Formulations Gas Price"},{"id":"GASPRICE","title":"Natural Gas Price: Henry Hub, LA (DISCONTINUED)\u00a9"}
	]},
	{"group":"finance","values":[
		{"id":"BASE","title":"St. Louis Adjusted Monetary Base"},{"id":"WCURCIR","title":"Currency in Circulation"},{"id":"WRESBAL","title":"Reserve Balances with Federal Reserve Banks"},{"id":"M1","title":"M1 Money Stock"},{"id":"M2","title":"M2 Money Stock"},{"id":"SP500","title":"S&P 500\u00a9"},{"id":"DJIA","title":"Dow Jones Industrial Average\u00a9"},{"id":"WILL5000IND","title":"Wilshire 5000 Total Market Index\u00a9"},{"id":"VIXCLS","title":"CBOE Volatility Index: VIX\u00a9"},{"id":"STLFSI","title":"St. Louis Fed Financial Stress Index\u00a9"},{"id":"WSLB20","title":"State and Local Bonds - Bond Buyer Go 20-Bond Municipal Bond Index"},{"id":"BAMLCC0A2AATRIV","title":"BofA Merrill Lynch US Corp AA Total Return Index Value\u00a9"},{"id":"BAMLCC0A4BBBTRIV","title":"BofA Merrill Lynch US Corp BBB Total Return Index Value\u00a9"},{"id":"FF","title":"Effective Federal Funds Rate"},{"id":"DGS3MO","title":"3-Month Treasury Constant Maturity Rate"},{"id":"DGS1","title":"1-Year Treasury Constant Maturity Rate"},{"id":"DGS5","title":"5-Year Treasury Constant Maturity Rate"},{"id":"DGS10","title":"10-Year Treasury Constant Maturity Rate"},{"id":"DFII5","title":"5-Year Treasury Inflation-Indexed Security, Constant Maturity"},{"id":"DFII10","title":"10-Year Treasury Inflation-Indexed Security, Constant Maturity"},{"id":"DAAA","title":"Moody's Seasoned Aaa Corporate Bond Yield\u00a9"},{"id":"DBAA","title":"Moody's Seasoned Baa Corporate Bond Yield\u00a9"},{"id":"DCD6M","title":"6-Month Certificate of Deposit: Secondary Market Rate (DISCONTINUED)"},{"id":"MORTGAGE15US","title":"15-Year Fixed Rate Mortgage Average in the United States\u00a9"},{"id":"MORTGAGE30US","title":"30-Year Fixed Rate Mortgage Average in the United States\u00a9"},{"id":"TWEXM","title":"Trade Weighted U.S. Dollar Index: Major Currencies"},{"id":"DEXUSEU","title":"U.S. \/ Euro Foreign Exchange Rate"},{"id":"DEXUSUK","title":"U.S. \/ U.K. Foreign Exchange Rate"},{"id":"DEXCHUS","title":"China \/ U.S. Foreign Exchange Rate"},{"id":"DEXCAUS","title":"Canada \/ U.S. Foreign Exchange Rate"},{"id":"DEXJPUS","title":"Japan \/ U.S. Foreign Exchange Rate"}
	]}
];


window.cachedTableData;

var fredConnector = tableau.makeConnector();
fredConnector.getSchema = function(schemaCallback) {
	_getOurData(function(data) {
		schemaCallback([{
			id      : "FRED_Data",
			alias   : "U.S. Economic Data - Federal Reserve Bank of St. Louis",
			columns : window.cachedTableData['cols']
		}]);
	});
};

fredConnector.getData = function(table, doneCallback) {
	_getOurData(function(data) {
		table.appendRows(window.cachedTableData['dataToReturn']);
	});
	doneCallback();
};

tableau.registerConnector(fredConnector);

function addWDC(id, title) {
	//remove select text
	$('#select-text').html('');
	
	//check if id already exists. If not, append it at the top.
	if ($('#wdc-list>div[data-id=' + id + ']').length == 0) {
		$("#wdc-list").prepend("<div data-id=" + id + ">" + id + " - " + title + "</div>");
	}
	
	updateWDCList();
}

function addGroup(group) {
	//get list of IDs
	var presetList = $.grep(presets, function (n) {
		return n.group === group;
	});

	//add an item for each ID in the list
	$(presetList[0].values).each(function () {
		addWDC(this.id, this.title);
	});

	updateWDCList();
}

function updateWDCList()
{
	//populate list from data attributes of divs
	list = $("#wdc-list>div").map(function() {
		return {
			id    : $(this).data("id"),
			title : $(this).html()
		};
	}).get();
	
	//add select text if cleared
	if (!list || list == '' || list.length == 0) {
		$('#wdc-list').html('<span id=select-text>Select metrics using the buttons on the left.</span>');
		$('#get-wdc').hide();
		$('#clear-wdc').hide();
		return;
	}
	
	//insert vals into form input and show buttons
	$("#wdc-ids").val(JSON.stringify(list));
	$('#get-wdc').show();
	$('#clear-wdc').show();
}

function _getOurData(callback)
{
	if (!window.cachedTableData) {
		$.ajax({
			'url'  : 'wdc.php',
			'data' : {
				'wdc_ids' : tableau.connectionData
			}
		}).done(function (data) {
			window.cachedTableData = data;
			callback(window.cachedTableData);
		});
	} else {
		callback(window.cachedTableData);
	}
}

$(function() {
	$('.fred-search').hide();
	$('.warning-msg').hide();
	$('.back-black').hide();
	
	$('#get-wdc').click(function () {
		tableau.connectionName = 'FRED Data';
		tableau.connectionData = $('#wdc-ids').val();
		tableau.submit();
	});

	$('#clear-wdc').click(function() {
		$("#wdc-ids").val('');
		$('#wdc-list').html('<span id=select-text>Select metrics using the buttons on the left.</span>');
		updateWDCList();
	});

	$('#search-wdc').click(function() {
		$.ajax({
			'url'  : 'search.php',
			'data' : {
				'search' : $('#fred-search').val()
			}
		}).done(function (data) {
			$('#search-results').html(data);
		});
	});
	
	/**
	 * Presets
	 **/
	$('.fred-icon').click(function () {
			var groupName=$(this).data('group');
			if(groupName!="search") {
				addGroup(groupName);
			} else {
				$('.fred-search').show();
				$('.icon-container').hide();
			}
	});
	/**
	 * End Presets
	 **/
	
	$('#search-cancel').click(function() {
		$('.fred-search').hide();
		$('.icon-container').show();
		$('#search-results').html('');
	});
	
	$('form').submit(function(e) {
		$('#search-wdc').click();
		e.preventDefault();
	});
	
	if (typeof tableauVersionBootstrap  == 'undefined' || !tableauVersionBootstrap) {
		$('.warning-msg').show();
	}
});

$(updateWDCList);
