var calendarApp = angular.module('calendarDemoApp', []);
calendarApp.directive('monthSelector', function(){
	return {
		restrict: 'E', 
		templateUrl: './template/selector.html',
		link: function(scope, element, attrs) {
			var startYear = attrs['startYear'], endYear = attrs['endYear'],yearArr=[],
			    date = new Date(), nowMonth = date.getMonth(), nowYear = date.getFullYear();

			init();
			
			scope.updateCalendar = function(){
				nowMonth = scope.selectedMonth;
				getCalendar(scope.selectedYear, scope.selectedMonth);
			};

			function init(){
				//populate the year select box
				for(var i=startYear; i <= endYear; i++){
					yearArr.push(i);
				}
				scope.years = yearArr;
				
				//select exist time 
				scope.selectedMonth = nowMonth;
				scope.selectedYear = nowYear;
				
				//display calendar				
				getCalendar(nowYear,nowMonth);
			}

			function getCalendar(year, month){
				scope.range = CalendarRange.getMonthlyRange(new Date(year, month));
				scope.range.days.forEach(addMonthClass);
			}

			//run through days array and add the class to last and next month
			////nowMonth is the month now in the beginning, or the selected month when it is selected from the dropdown list.
			function addMonthClass(element, index, array){
				if(element.month < nowMonth){
					element.monthClass = 'lastMonth';
				}else if(element.month >nowMonth){
					element.monthClass = 'nextMonth';
				}
			}

		},
		controller: function($scope, $element, $attrs) {
			
		}
	};
});
