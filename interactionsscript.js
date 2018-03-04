//on click of a node, open a modal
jQuery('.node').on("click", function(){
  openModal();
  console.log('opened');
});

function openModal(){
  d3.selectAll('.myModal').classed('hidden', 'false');
}
