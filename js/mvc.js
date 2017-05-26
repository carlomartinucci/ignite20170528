$(function(){

  var model = {
    data: {
      counters: null,
      counterIndex: null,
      counterChangedAt: null,
      pages: null,
      pageIndex: null,
      pageChangedAt: null,
    },
    init: function(datum, babel){
      model.data.counters = datum.counters.map(babel.convertString);
      model.data.countersOriginal = datum.counters;
      model.data.counterIndex = 0;
      model.data.counterChangedAt = Date.now();
      model.data.pages = datum.pages.map(babel.convert);
      model.data.pageIndex = 0;
      model.data.pageChangedAt = Date.now();
    },
    nextCounter: function(){
      model.data.counterIndex++;
      model.data.counterChangedAt = Date.now();
    },
    nextPage: function(){
      model.data.pageIndex++;
      model.data.pageChangedAt = Date.now();
      model.data.counterIndex = 0;
      model.data.counterChangedAt = Date.now();
    },
  };

  var controller = {
    counter: function(){
      return model.data.counters[model.data.counterIndex]
    },
    counterOriginal: function(){
      return model.data.countersOriginal[model.data.counterIndex]
    },
    page: function(){
      return model.data.pages[model.data.pageIndex]
    },
    initialPage: function(){
      return model.data.pages[0]
    },
    init: function(datum, babel, actions){
      model.init(datum, babel);
      view.init(actions);
      // $(document).on("keypress", function(){
      //   if (controller.start) {
      //     console.log("stop updates");
      //     clearInterval(controller.start);
      //   } else {
      //     console.log("start updates");
          controller.start = setInterval(controller.update, 1000);
      //   }
      // })
    },
    start: null,
    update: function() {
      var dateNow = Date.now();
      if (model.data.counterChangedAt + 900 < dateNow) {
        model.nextCounter();
        view.renderCounter();
      }
      if (model.data.pageChangedAt + 14900 < dateNow ) {
        model.nextPage();
        view.renderPage();
      }

    }
  };

  var view = {
    init: function(actions){
      this.page = $("#page");
      view.actions = actions;

      this.page.html( controller.initialPage() );

      view.render();
    },
    actions: null,
    renderPage: function(){
      var page = controller.page();
      var spans = this.page.find('span');

      // RENDER
      this.page.html( page );

      var lastDelayArray = Array(50).fill("*"); //Math.max(...this.page.find('span').map(function(i,e){return $(e).data("delay")}));

      // view.actions.start(function(times, spans, index){
      //   var filteredSpans = spans.filter(function () {
      //     return $(this).data("delay") == index;
      //   });

      //   // console.log(spans)

      //   filteredSpans.each(function(i,t){
      //     var index = $(spans).index(this);
      //     console.log(index);
      //     $(this).replaceWith($(controller.page()).find('span')[index]);
      //   });
      // }, lastDelayArray, spans);

      



      // COLOR
      view.actions.start(function(times, spans, index){
        spans.filter(function () {
          return $(this).data("delay") == index;
        }).addClass("active");
      }, lastDelayArray, this.page.find('span'));
    },
    renderCounter: function(){
      var counter = $(controller.counter());
      var counterOriginal = controller.counterOriginal();
      var oldCounter = this.page.find('span').slice(-counterOriginal.length);

      // RENDER AND COLOR
      view.actions.start(function(counter, oldCounter, index){
        $(oldCounter[index]).replaceWith($(counter[index]).addClass("active"));
        // $(counter[index]).addClass("active");
      }, counter, oldCounter);

    },
    render: function(){
      view.renderPage();
      view.renderCounter();
    }
  };

  var datum   = Datum();
  var babel   = Babel();
  var actions = Actions();

  controller.init(datum, babel, actions);

});



