describe('calendar directive',function(){
	var scope,
		element,
		compiled,
		html,
		numberOfYearOptions;

	beforeEach(module("calendarDemoApp"));
	beforeEach(module('calendar.html'));

	beforeEach(inject(function($rootScope, $compile){
		html="<calendar start-year='1994' end-year='2034'></calendar>";
		numberOfYearOptions = 2034 - 1994 +1;


		scope = $rootScope.$new();
		compiled = $compile(html)
		element = compiled(scope);
		scope.$digest();

		// console.log(scope.updateCalendar);

	}));


	it('should render the calendar correctly', function(){
		expect(element.find('select').length).toBe(2);
		expect(element.find('#year option').length).toBe(numberOfYearOptions);
		expect(scope.selectedYear).toBe(2014);
		expect(scope.selectedMonth).toBe(7);
		expect(element.find(".day span").length).toBe(scope.range.days.length);
	});

	it('should change the calendar to correctly month/year',function(){
		expect(angular.isFunction(scope.updateCalendar)).toBe(true);
		expect(angular.isFunction(scope.getCalendar)).toBe(true);
		//February 2014, it only has 5 row in the calendar, the number of days is 35, which is different from most of the months.
		scope.getCalendar(2014,1);
		scope.$digest();
		expect(scope.range.days.length).toBe(35);
		expect(element.find(".day span").length).toBe(35);

	});
});

