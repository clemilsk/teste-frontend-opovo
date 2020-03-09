document.getElementById("btnEnviar").addEventListener("click", function(e){ 
            

var inputNome = document.getElementById('inputNome');                          
var inputEmail = document.getElementById('inputEmail');                          
var inputCep = document.getElementById('inputCep');
var inputEndereco = document.getElementById('inputEndereco');                   
var inputNumero = document.getElementById('inputNumero');                    
var inputBairro = document.getElementById('inputBairro');                
var inputCidade = document.getElementById('inputCidade');
var inputEstado = document.getElementById('inputEstado');
var inputFile = document.getElementById('inputFile');
            
e.preventDefault();

if( inputNome.value == "" || inputNome.value.length < 8)
{
    alert( "Preencha campo NOME corretamente!" );
    inputNome.focus();
    return false;
}
if( inputEmail.value == "" || inputEmail.value.indexOf('@') == -1 || inputEmail.value.indexOf('.') == -1 )
{
alert( "Preencha campo E-MAIL corretamente!" );
inputEmail.focus();
return false;
}      

if( inputCep.value == "" ){
    alert( "Preencha campo CEP corretamente!" );
    inputCep.focus();
    return false;
}

if( inputNumero.value == "" ){
    alert( "Preencha campo NÚMERO corretamente!" );
    inputNumero.focus();
    return false;
}

if( inputFile.value == "" ){
    alert( "Carregue o CURRÍCULO!" );
    inputFile.focus();
    return false;
}

alert( "Currículo ENVIADO!" );
//Limpa valores do formulário
inputNome.value=("");
inputEmail.value=("");
inputCep.value=("");
inputEndereco.value=("");
inputBairro.value=("");
inputCidade.value=("");
inputEstado.value=("");
inputNumero.value=("");
inputFile.value=("");

return true;
});

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('inputEndereco').value=("");
    document.getElementById('inputBairro').value=("");
    document.getElementById('inputCidade').value=("");
    document.getElementById('inputEstado').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('inputEndereco').value=(conteudo.logradouro);
    document.getElementById('inputBairro').value=(conteudo.bairro);
    document.getElementById('inputCidade').value=(conteudo.localidade);
    document.getElementById('inputEstado').value=(conteudo.uf);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var inputCep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (inputCep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(inputCep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('inputEndereco').value="...";
        document.getElementById('inputBairro').value="...";
        document.getElementById('inputCidade').value="...";
        document.getElementById('inputEstado').value="...";
    
        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ inputCep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};