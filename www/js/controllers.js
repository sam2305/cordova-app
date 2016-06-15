angular.module('starter.controllers', ['ngCordova'])


.controller('DialogCtrl', function($cordovaDialogs) {
  var vm= this;

  vm.alert=function(){
    $cordovaDialogs.alert("Wow!","Alert", "Dismiss").then(function(){
      $cordovaDialogs.alert("Alert Closed");
    })
  };


  vm.prompt=function(){
    $cordovaDialogs.prompt("Please Login","Login", ["Login","Cancel"]).then(function(results){
      $cordovaDialogs.alert("Button Selected " + results.buttonIndex + "and entered text is "+ results.input1 )
    })
  };

  vm.confirm=function(){
    $cordovaDialogs.confirm("Are You Sure?","Confirmation", ["Ok","Cancel"]).then(function(buttonIndex){
      $cordovaDialogs.alert("Button Selected " + buttonIndex)
    })
  };

  vm.beep=function(){
    $cordovaDialogs.beep(2);
  };
})

.controller('VibrationCtrl', function($cordovaVibration,$scope) {
  var vm= this
  vm.vibrate=function(){
    document.addEventListener( "deviceready", function() {
    $cordovaVibration.vibrate(1000);
  })
  }
})

.controller('CameraCtrl', function($cordovaCamera) {
  
  var vm= this
  
  vm.takePicture=function(){
    var options = { 
                quality : 100, 
                destinationType : Camera.DestinationType.DATA_URL, 
                sourceType : Camera.PictureSourceType.CAMERA, 
                allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
    $cordovaCamera.getPicture(options).then(function (imageData) {
                vm.imgSrc = "data:image/jpeg;base64," + imageData;
               
                var canvasDom = document.getElementById("picCanvas");
                var canvas = canvasDom.getContext("2d");

                var img = new Image();
                img.src = "data:image/jpeg;base64," + imageData;

            }, function (err) {
                alert("An error occured: " + err);
            });

  }

  vm.selectPicture=function(){
    var options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            };

    $cordovaCamera.getPicture(options).then(function (imageUri) {
                // Success! Image data is here
                vm.imgSrc = imageUri;

            }, function (err) {
                alert("An error occured: " + err);
            });
  }

})

.controller('BarcodeCtrl', function($cordovaBarcodeScanner) {
  var vm= this
  
  vm.scan=function(){
    $cordovaBarcodeScanner.scan().then(function (imageData) {
                // Success! Barcode data is here
                vm.results = imageData;
            }, function (err) {
                // An error occured. Show a message to the user
                alert("Error scanning: " + err);
            });
        };

        vm.lookup = function () {
            window.open("http://www.upcindex.com/" + vm.results.text, "_system");
        };

        vm.reset = function () {
            vm.results = null;
        };
})

.controller('NetworkCtrl', function($cordovaNetwork) {
  var vm= this
  
  vm.isOnline= $cordovaNetwork.isOnline();
})

.controller('DeviceCtrl', function($cordovaDevice) {
  var vm= this
  
        vm.deviceModel = function() {
            vm.results = $cordovaDevice.getModel();
        };

        vm.devicePlatform = function () {
            vm.results = $cordovaDevice.getPlatform();
        };

        vm.deviceUUID = function(){
            vm.results = $cordovaDevice.getUUID();
        };

        vm.deviceVersion = function () {
            vm.results = $cordovaDevice.getVersion();
        };

        vm.cordovaVersion = function () {
            vm.results = $cordovaDevice.getCordova();
        };

        vm.device = function () {
            vm.results = $cordovaDevice.getDevice();
        };
});