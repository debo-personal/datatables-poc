(function( $ ){
	/******************************* Datatable Options ****************************************/
	var options = {
		"ajax" 		  : "mock-data/data.json",
        "colReorder"  : true,
        "colResize"	  : true,
        "responsive"  : true,
        "ellipsis-len": 25,
        "columns"     : [
						    { "data": "name", "title": "t_name", "className": "dt-name" },
						    { "data": "position", "title": "t_position", "className": "dt-position", "sortable" : false },
						    { "data": "office", "title": "t_office", "className": "dt-office" },
						    { "data": "extn", "title": "t_extn", "className": "dt-extn" },
						    { "data": "start_date", "title": "t_start_date", "className": "dt-start-date" },
						    { "data": "salary", "title": "t_salary", "className": "dt-salary", "visible" : false}
						]
	};

	var bootstrapDOM = 	"<'row'<'col-sm-6'l><'col-sm-6'f>>" +
						"<'row'<'col-sm-12'tr>>" +
						"<'row'<'col-sm-5'i><'col-sm-7'p>>";

	var dom =  options.colResize == true ? "Z" + bootstrapDOM : bootstrapDOM; // 'Z' options is required for column resizing

	$(document).ready(function() {

		/***************************** Initialize Datatable ************************************/
	    $('#datatable1').DataTable( {
	        "ajax"		: options.ajax,
	        "colReorder": options.colReorder,
	        "responsive": options.responsive, // by default it is true, you can make it false if required
	        "columns"	: options.columns,
	        "columnDefs": [{
						    targets: getColumnIndexesWithClass( options.columns, "dt-position" ),
						    render: $.fn.dataTable.render.ellipsis( options['ellipsis-len'] || 30, true )
						  },{
						  	targets   : options.columns.length,
						  	"data"    : null,
						  	"visible" : true,
						  	"sortable": false,
						  	"title"   : "Action",
						  	render    : function (data, type, full) {
						  		// console.log("full", full);
						  		// console.log("data", data);
						  		// console.log("type", type);
					            return '<a href="#" onclick="alert(\''+ full['salary'] +'\');">Process</a>';
					        }
						  }],
	        "dom"		: dom,
	        "scrollY" 	: "100vh",
	        "scrollCollapse" : true,
	        "initComplete" : adjustTableHeight
	    } );

	} );

	/* Window Resize Event*/
	$(window).resize(function(){
		adjustTableHeight();
    });

    /******************************** Helper methods **********************************************/
    /*============================================================================================*/
	function getColumnIndexesWithClass( columns, className ) {
	    var indexes = [];
	    
	    $.each( columns, function( index, columnInfo ) {
	        if( columnInfo.className == className ) {
	            indexes.push( index );
	        }
	    } );
	 
	    return indexes;
	}

	function adjustTableHeight() {
		var oTable = $('#datatable1').dataTable();
	    $('div.dataTables_scrollBody').css('height', calculateDatatableHeight());
	    if (oTable != "") {
	        oTable.fnAdjustColumnSizing();
	        oTable.fnDraw(true);
	    }
	}

	function calculateDatatableHeight() {
		var dtTop  		   = $('#datatable1_wrapper .dataTables_scroll').offset().top || 100,
			dtFooterHeight = $('#datatable1_info').closest('.row').outerHeight() || 40,
			dtHeaderHeight = $('#datatable1_wrapper .dataTables_scrollHead').outerHeight() || 40,
			buffer = 10, datatableHeight;

			datatableHeight = $(window).height() - (dtTop + dtFooterHeight + dtHeaderHeight + buffer);
			return datatableHeight + 'px';
	}
	
})( jQuery )