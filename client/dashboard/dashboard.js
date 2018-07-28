Template.dashboard.onRendered(function(){

    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.19/js/jquery.dataTables.min.js",function(){

        $(".datatable").dataTable({"lengthChange": false,"searching": true});
    });    	
})