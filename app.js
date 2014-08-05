var calendarApp = angular.module('calendarDemoApp', []);
calendarApp.directive('monthSelector', function(){
	return {
		restrict: 'E', 
		templateUrl: './template/selector.html',
		link: function(scope, element, attrs) {
			var startYear = attrs['startYear'], endYear = attrs['endYear'],optionString="",
			    date = new Date(), nowMonth = date.getMonth(), nowYear = date.getFullYear();

			init();
			getCalendar();


			function init(){
				//populate the year select box
				for(var i=startYear; i <= endYear; i++){
					optionString+="<option value='" + i + "' class='" + i + "''>" + i + "</option>"; 
				}
				$("#year").html(optionString);
				
				//select exist time 
				$("#month ."+nowMonth).attr("selected","selected");
				$("#year ."+nowYear).attr("selected","selected");

			}

			function getCalendar(){
				scope.range = CalendarRange.getMonthlyRange(new Date(nowYear, nowMonth));
				scope.range.days.forEach(addMonthClass);
			}

			//run through days array and add the class to last and next month
			function addMonthClass(element, index, array){
				if(element.month < nowMonth){
					element.monthClass = 'lastMonth';
				}else if(element.month >nowMonth){
					element.monthClass = 'nextMonth';
				}
			}


		},
		controller: function($scope, $element, $attrs, $transclude) {
			var selectedMonth, selectedYear;
			$($element.find('select')[0]).on('change',function(e){
				selectedMonth = $(this).val();
			});
			$($element.find('select')[1]).on('change',function(e){
				selectedYear = $(this).val();
			});

			

			// console.log(selectedMonth);
			// console.log(selectedYear);

			// //expose
			// $scope.getSelection = function(){
			// 	return {
			// 		month: selectedMonth,
			// 		year: selectedYear
			// 	};
			// };
		}
	};
});
