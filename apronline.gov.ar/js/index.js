$(document).ready(function(){
	var mask;
	var maskOptions = {
		mask: '****-000000'
	};
	
 	$("#my-calendar").zabuto_calendar( {     today: true, data: [] } );

	$('#tipoVencimiento').on('change',function(){
		var valor = $('#tipoVencimiento').val();
		var titulo = $('#tipoVencimiento option:selected').text();
		var eventos;
		$.ajax({
		    url 		: 'data/vencimientos.php?v='+valor,
		    type 		: "GET",
		    crossDomain : true,
       	    dataType 	: "json",
	        async 		: false,
		    success 	: function (data) {
		    	eventos=data;
 				$("#my-calendar").zabuto_calendar( {     today: true,data: [] } );
 				$('div[id^="my-calendar_2018"]').remove();
 				$("#my-calendar").empty(); 
 				$("#my-calendar").zabuto_calendar({
 					today: true,
			      	data: data
			    });		    	
		    }
		});

if (titulo != 'TRIBUTO') {

 $.ajax({
     url 		: 'data/vencimiento.php?tasa='+titulo,
     type 		: "GET",
     crossDomain : true,
     success 	: function (data) {
	$("#proximo").html(data);
     }
 });

}else{

	$("#proximo").html('');

}

	});
    
	$('#generarBoleta').on('click',function(){
		var tipo = $('#tipoBoleta').val();
		var id = $('#valorBoleta').val();
		$.ajax({
		    url: './data/generarfactura.php?'+tipo+'/'+id,
		    type: "GET",
		    crossDomain: true,
       	    dataType: "json",
	        async: false,
		    success: function (data)
		    {
		    	if(data.status!="false"){
		    		var codificacion = 'data:application/pdf;base64,'+data.data;
		    		//window.open(codificacion,'_blank');
		    		download(codificacion,'Ultima_Boleta.pdf','application/pdf'); //armar el nombre del archivo con datos
		    	}else{
		    		//$('#errorGenerar').show();
		    	}
		        console.log(data);
		    }
		});
	})

	$('#tipoBoleta').on('change',function(){
		$('#valorBoleta').val('');
		if($('#tipoBoleta').val()==1){
			if(typeof(mask) !== 'undefined'){
				mask.destroy();
			}
			$('#valorBoleta').prop('maxLength','7');
			$('#valorBoleta').prop('placeholder','Ingrese la patente del rodado');
		}else{
			mask = new IMask(document.getElementById('valorBoleta'), maskOptions);
			$('#valorBoleta').prop('maxLength','11');
			$('#valorBoleta').prop('placeholder','Ingrese la partida y pre-partida')
		}
	});
});