app.controller("JobStatusController", function($scope, $http, $filter, $state, DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder) {

	$scope.waitStatus = undefined;
	$scope.scuessStatus = undefined;
	$scope.failStatus = undefined;
	$scope.listData = [];
	$scope.itemSelected = undefined;
	$scope.itemGroup = undefined;

	$scope.jobNames = [];
$scope.name = undefined;

$scope.start = function(name) {
	$scope.name = name;

}

$scope.persons = [{
    "id": 860,
    "firstName": "Superman",
    "lastName": "Yoda"
}, {
    "id": 870,
    "firstName": "Foo",
    "lastName": "Whateveryournameis"
}, {
    "id": 590,
    "firstName": "Toto",
    "lastName": "Titi"
}, {
    "id": 803,
    "firstName": "Luke",
    "lastName": "Kyle"
}, {
    "id": 474,
    "firstName": "Toto",
    "lastName": "Bar"
}, {
    "id": 476,
    "firstName": "Zed",
    "lastName": "Kyle"
}, {
    "id": 464,
    "firstName": "Cartman",
    "lastName": "Kyle"
}, {
    "id": 505,
    "firstName": "Superman",
    "lastName": "Yoda"
}, {
    "id": 308,
    "firstName": "Louis",
    "lastName": "Kyle"
}, {
    "id": 184,
    "firstName": "Toto",
    "lastName": "Bar"
}, {
    "id": 411,
    "firstName": "Luke",
    "lastName": "Yoda"
}, {
    "id": 154,
    "firstName": "Luke",
    "lastName": "Moliku"
}, {
    "id": 623,
    "firstName": "Someone First Name",
    "lastName": "Moliku"
}, {
    "id": 499,
    "firstName": "Luke",
    "lastName": "Bar"
}, {
    "id": 482,
    "firstName": "Batman",
    "lastName": "Lara"
}, {
    "id": 255,
    "firstName": "Louis",
    "lastName": "Kyle"
}, {
    "id": 772,
    "firstName": "Zed",
    "lastName": "Whateveryournameis"
}, {
    "id": 398,
    "firstName": "Zed",
    "lastName": "Moliku"
}];

$scope.message = '';


$scope.changePersons = function() {
    $scope.message = 'Try to filter or sort data';
    $scope.persons = [{
        "id": 860,
        "firstName": "Superman",
        "lastName": "Yoda"
    }, {
        "id": 870,
        "firstName": "Foo",
        "lastName": "Whateveryournameis"
    }, {
        "id": 590,
        "firstName": "Toto",
        "lastName": "Titi"
    }];
}

$scope.persons = [{
    "id": 860,
    "firstName": "Superman",
    "lastName": "Yoda"
}, {
    "id": 870,
    "firstName": "Foo",
    "lastName": "Whateveryournameis"
}, {
    "id": 590,
    "firstName": "Toto",
    "lastName": "Titi"
}, {
    "id": 803,
    "firstName": "Luke",
    "lastName": "Kyle"
}, {
    "id": 474,
    "firstName": "Toto",
    "lastName": "Bar"
}, {
    "id": 476,
    "firstName": "Zed",
    "lastName": "Kyle"
}, {
    "id": 464,
    "firstName": "Cartman",
    "lastName": "Kyle"
}, {
    "id": 505,
    "firstName": "Superman",
    "lastName": "Yoda"
}, {
    "id": 308,
    "firstName": "Louis",
    "lastName": "Kyle"
}, {
    "id": 184,
    "firstName": "Toto",
    "lastName": "Bar"
}, {
    "id": 411,
    "firstName": "Luke",
    "lastName": "Yoda"
}, {
    "id": 154,
    "firstName": "Luke",
    "lastName": "Moliku"
}, {
    "id": 623,
    "firstName": "Someone First Name",
    "lastName": "Moliku"
}, {
    "id": 499,
    "firstName": "Luke",
    "lastName": "Bar"
}, {
    "id": 482,
    "firstName": "Batman",
    "lastName": "Lara"
}, {
    "id": 255,
    "firstName": "Louis",
    "lastName": "Kyle"
}, {
    "id": 772,
    "firstName": "Zed",
    "lastName": "Whateveryournameis"
}, {
    "id": 398,
    "firstName": "Zed",
    "lastName": "Moliku"
}];

$scope.test = function() {
	
/*	if($scope.table === undefined){
		$scope.table =  $('#example').DataTable( {
	        dom: 'Bfrtip',
	        buttons: [
	            'copy', 'csv', 'excel', 'pdf', 'print'
	        ]
	    } );
	}*/
}
$scope.test();
	$scope.init = function() {
		
		$http.get('http://localhost:8080/getJobs').success(function(data) {
			$scope.data = data;
			for (var key in $scope.data) {
				$scope.jobNames.push(key);
				}
			console.log($scope.data);
			$scope.showlist();
			

		});
		
	};

	$scope.itemSelect = function() {
		$scope.jobslist = [];
		$scope.listData = [];
		$scope.itemSelected = "";
		var values = [];
			angular.forEach($scope.jobNames, function(value, key){
			     var x = value.split("_");
			     values.push(x[0]);
			   });
	  //      $scope.jobslist = $filter('filter')(values, $scope.itemGroup);
			 var str = "Hello world, welcome to the universe.";
			  var n = str.includes("world");
			if(n){
				console.log("includes")
			}
	        
			if($scope.itemGroup !== ""){
			       $scope.jobslist =   $filter('filter')($scope.jobNames, function (item) {
		        		var str = item;       	
		        	  return str.includes($scope.itemGroup);
		        	});
			}
	 

	};
	
	$scope.showlist = function(){
		$scope.listData = $scope.data[$scope.itemSelected];
		 $('#example').DataTable( {
		        dom: 'Bfrtip',
		        buttons: [
		            'copyHtml5',
		            'excelHtml5',
		            'csvHtml5',
		            'pdfHtml5'
		        ]
		    } );
	}
	$scope.showTable = function (selectedItem){
		$state.go('statusView', { 'data':$scope.waitStatus});

		$scope.st = $scope.waitStatus;
		console.log($scope.name);
		console.log(selectedItem);
	}
	$scope.init();
	$scope.statusChart = undefined;

	$scope.prepareChartData = function (){
		$http.get('data/stausChartData.json').success(function(data) {
			data.data.rows[0].c[1].v = $scope.scuessStatus.length;
			data.data.rows[0].c[3].v = $scope.scuessStatus.length.toString();
			data.data.rows[1].c[1].v = $scope.waitStatus.length;
			data.data.rows[1].c[3].v = $scope.waitStatus.length.toString();
			data.data.rows[2].c[1].v = $scope.failStatus.length;
			data.data.rows[2].c[3].v = $scope.failStatus.length.toString();
			$scope.statusChart = data;

		});
	}
	
	$scope.today = function() {
	    $scope.dt = new Date();
	  };
	  $scope.today();

	  $scope.clear = function() {
	    $scope.dt = null;
	  };

	  $scope.inlineOptions = {
	    customClass: getDayClass,
	    minDate: new Date(),
	    showWeeks: true
	  };

	  $scope.dateOptions = {
	    dateDisabled: disabled,
	    formatYear: 'yy',
	    maxDate: new Date(2020, 5, 22),
	    minDate: new Date(),
	    startingDay: 1
	  };

	  // Disable weekend selection
	  function disabled(data) {
	    var date = data.date,
	      mode = data.mode;
	    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	  }

	  $scope.toggleMin = function() {
	    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
	    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
	  };

	  $scope.toggleMin();

	  $scope.open1 = function() {
	    $scope.popup1.opened = true;
	  };

	  $scope.open2 = function() {
	    $scope.popup2.opened = true;
	  };

	  $scope.setDate = function(year, month, day) {
	    $scope.dt = new Date(year, month, day);
	  };

	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  $scope.format = $scope.formats[0];
	  $scope.altInputFormats = ['M!/d!/yyyy'];

	  $scope.popup1 = {
	    opened: false
	  };

	  $scope.popup2 = {
	    opened: false
	  };

	  var tomorrow = new Date();
	  tomorrow.setDate(tomorrow.getDate() + 1);
	  var afterTomorrow = new Date();
	  afterTomorrow.setDate(tomorrow.getDate() + 1);
	  $scope.events = [
	    {
	      date: tomorrow,
	      status: 'full'
	    },
	    {
	      date: afterTomorrow,
	      status: 'partially'
	    }
	  ];

	  function getDayClass(data) {
	    var date = data.date,
	      mode = data.mode;
	    if (mode === 'day') {
	      var dayToCheck = new Date(date).setHours(0,0,0,0);

	      for (var i = 0; i < $scope.events.length; i++) {
	        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

	        if (dayToCheck === currentDay) {
	          return $scope.events[i].status;
	        }
	      }
	    }

	    return '';
	  }
	  
	  //for table 
		$scope.vm = {};
		$scope.vm.dtInstance = {};   
		$scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
		$scope.vm.dtOptions = DTOptionsBuilder.newOptions()
						  .withOption('paging', true)
						  .withOption('searching', true)
						  .withOption('info', true)
						  .withButtons([
	                                          {
	                                              extend:    'copy',
	                                              text:      '<i class="fa fa-files-o"></i> Copy',
	                                              titleAttr: 'Copy'
	                                          },
	                                          {
	                                              extend:    'print',
	                                              text:      '<i class="fa fa-print" aria-hidden="true"></i> Print',
	                                              titleAttr: 'Print'
	                                          },
	                                          {
	                                        	  extend:    'csv',
	                                              text:      '<i class="fa fa-print" aria-hidden="true"></i> Excel',
	                                              titleAttr: 'csv'
	                                          }
	                                      ]
	                                    ) ;
});
