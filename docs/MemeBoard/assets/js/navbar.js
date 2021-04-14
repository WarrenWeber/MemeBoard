// $(document).ready(function(){
//   $(".sidenav").sidenav();
//   $('#sidenav-menu').sidenav({ edge: 'right' });
//   $('#sidenav-categories').sidenav({ edge: 'left' });
// });

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);

  var elems_menu = document.querySelectorAll('#sidenav-menu');
  var instances_menu = M.Sidenav.init(elems_menu, { edge: 'right' });

  var elems_categories = document.querySelectorAll('#sidenav-categories');
  var instances_categories = M.Sidenav.init(elems_categories, { edge: 'left' });
});
