registrationModule.controller('loginController', function($scope, $rootScope, $location, loginRepository, alertFactory, localStorageService) {
    $rootScope.datosUsuario = '';
    $rootScope.menuTimbrado = false;
    $rootScope.menuBusqueda = false;
    $scope.init = function() {
        $rootScope.mostrarMenu = false;
        closeNav();
    }
    $scope.permisos = function(usuario, contrasena) {
        loginRepository.getPermisos(usuario, contrasena).then(function(result) {
            $rootScope.datosUsuario = result.data;
            if ($rootScope.datosUsuario.length > 0) {
                if ($rootScope.datosUsuario[0].idPerfil == 1) {
                    $rootScope.menuTimbrado = true;
                    $rootScope.menuBusqueda = true;
                    $location.url('/timbrado' + $rootScope.datosUsuario[0].idPerfil + '&'+ $rootScope.datosUsuario[0].idUsuario);
                } else if ($rootScope.datosUsuario[0].idPerfil == 2) {
                    $rootScope.menuTimbrado = true;
                    $location.url('/timbrado' + $rootScope.datosUsuario[0].idPerfil+ '&'+ $rootScope.datosUsuario[0].idUsuario );
                } else if ($rootScope.datosUsuario[0].idPerfil == 3) {
                    $rootScope.menuBusqueda = true;
                    $location.url('/busqueda' + $rootScope.datosUsuario[0].idPerfil + '&'+ $rootScope.datosUsuario[0].idUsuario);
                }
            }else{
            	alertFactory.error('El usuario y/o contraseña son incorrecta(s)')
            }
            //$location.url('/busqueda' + $scope.datosUsuario[0].idPerfil);
            // console.log(result)
            // location.href = '/busqueda'
        });
    }
});
