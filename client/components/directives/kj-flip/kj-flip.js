(function(){
  'use strict';
  angular.module('enlighTN')
  .directive('kjFlip', function(){

    function setDim(element, width, height){
      element.style.width = width;
      element.style.height = height;
    }

  return {
    restrict : 'E',
    controller: function($scope, $element, $attrs){

      var self = this;

      //var self.front = null,
      //self.back = null;


      function showFront(){
        self.front.removeClass('flipHideFront');
        self.back.addClass('flipHideBack');
      }

      function showBack(){
        self.back.removeClass('flipHideBack');
        self.front.addClass('flipHideFront');
      }

      self.init = function(){
        self.front.addClass('flipBasic');
        self.back.addClass('flipBasic');

        showFront();
        self.front.on('click', showBack);
        self.back.on('click', showFront);
      };

    },

    link : function(scope,element,attrs, ctrl){

      var width = attrs.flipWidth || '100px',
         height =  attrs.flipHeight || '100px';

      element.addClass('flip');

      if(ctrl.front && ctrl.back){
        [element, ctrl.front, ctrl.back].forEach(function(el){
          setDim(el[0], width, height);
        });
        ctrl.init();
        } else {
          console.error('FLIP: 2 panels required.');
        }
      }
    };

  })
  .directive('flipPanel', function(){
    return {
      restrict : 'E',
      require : '^flip',
      //transclusion : true,
      link: function(scope, element, attrs, flipCtr){
        if(!flipCtr.front) {
          flipCtr.front = element;
        } else if(!flipCtr.back) {
          flipCtr.back = element;
        } else {
          console.error('FLIP: Too many panels.');
        }
      }
    };
  });

})();
