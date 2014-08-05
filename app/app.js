var calendarApp = angular.module('calendarDemoApp', []);
calendarApp.directive('monthSelector', function(){
	return {
		restrict: 'E', 
		templateUrl: './template/selector.html',
		link: function(scope, element, attrs) {
			var startYear = attrs['startYear'], endYear = attrs['endYear'],yearArr=[];

			//populate the year select box
			for(var i=startYear; i <= endYear; i++){
				yearArr.push(i);
			}
			scope.years = yearArr;

		},
		controller: function($scope, $element, $attrs) {
			var date = new Date(), nowMonth = date.getMonth(), nowYear = date.getFullYear();

			//select exist time 
			$scope.selectedMonth = nowMonth;
			$scope.selectedYear = nowYear;
			
			//display calendar				
			getCalendar(nowYear,nowMonth);

			//update from drop down
			$scope.updateCalendar = function(){
				nowMonth = $scope.selectedMonth;
				getCalendar($scope.selectedYear, $scope.selectedMonth);
			};

			function getCalendar(year, month){
				$scope.range = CalendarRange.getMonthlyRange(new Date(year, month));
				$scope.range.days.forEach(addMonthClass);
			}

			//run through days array and add the special classes to last and next months
			//nowMonth is the month now in the beginning, or the selected month when it is selected from the select box.
			function addMonthClass(element, index, array){
				if(element.month < nowMonth){
					element.monthClass = 'lastMonth';
				}else if(element.month >nowMonth){
					element.monthClass = 'nextMonth';
				}
			}
		}
	};
});
